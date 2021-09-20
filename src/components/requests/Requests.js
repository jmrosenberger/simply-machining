import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { useHistory, useParams } from "react-router-dom"
import "./Requests.css"


Modal.setAppElement("#root")

export const Requests = () => {
    const [requests, updateRequests] = useState([])
    const [priceQuote, updatePriceQuote] = useState(0)
    const [quote, updateQuote] = useState({})



    const [isOpen, setIsOpen] = useState(false)                 // ---- || Do I need to change 'useState(false)' to 'useState(true)' ?? || ---- //

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    const getRequestByUser = () => {
        return fetch("http://localhost:3719/requests?_expand=user")
            .then(res => res.json())
            .then(
                (requestsArray) => {
                    updateRequests(requestsArray)
                }
            )
    }
    useEffect(
        () => {
            getRequestByUser()
        },
        []
    )
    const history = useHistory()

    const submitQuotePrice = (event, requestObj) => {
        event.preventDefault()

        const newQuotePrice = {
            userId: parseInt(localStorage.getItem("machining_user")),
            requestId: requestObj.id,
            priceQuoted: priceQuote,
            isAccepted: false,
            isCompleted: false,
            dateQuoted: Date()
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuotePrice)
        }
        return fetch(`http://localhost:3719/quotes?_expand=request`, fetchOption)
            .then(() => getRequestByUser())


    }

    const deleteRequest = (id) => {
        fetch(`http://localhost:3719/requests/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                return fetch("http://localhost:3719/requests?_expand=user")
                    .then(response => response.json())
                    .then((requests) => {
                        updateRequests(requests)
                    })
            })
    }



    const getQuoteObject = () => {
        return fetch("http://localhost:3719/quotes?_expand=request&_expand=user")
            .then(res => res.json())
            .then(
                (quotesArray) => {
                    updateQuote(quotesArray)
                }
            )
    }

    useEffect(
        () => {
            getQuoteObject()
        },
        []
    )


    console.log(priceQuote)
    return (
        <>
            <h3 className="requests__header">Current Requests</h3>
            {
                requests.map(
                    (request) => {
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={request.id} className="requests__list">
                                <hr className={`dotted`}></hr>
                                <section>
                                    <h4 key={request.id}>Request Id# {request.id}</h4>
                                    <div className="item__requestList"><b>Requested By:</b> {request.user.name}</div>
                                    <div className="item__requestList"><b>Material:</b>  {request.material}</div>
                                    <div className="item__requestList"><b>Description: </b> {request.description}</div>
                                    <div className="item__requestList"><b>Date Requested: </b> {request.dateRequested}</div>
                                </section>
                                <button className="delete__request"
                                    onClick={toggleModal}>Review Request
                                </button>
                                <button className="delete__request"
                                    onClick={() => {
                                        deleteRequest(request.id)
                                    }}>
                                    Delete Request
                                </button>
                                <div className="app">
                                    <Modal
                                        isOpen={isOpen}
                                        onRequestClose={toggleModal}
                                        contentLabel="Review Request"
                                        className="mymodal"
                                        overlayClassName="myoverlay"
                                    >
                                        <div className="heading__modal">Input Quote Price</div>
                                        <form>
                                            <fieldset>
                                                <label htmlFor="Price">Quote Price: $</label>
                                                <input
                                                    onChange={
                                                        (event) => {
                                                            updatePriceQuote(parseInt(event.target.value))
                                                        }
                                                    }
                                                    className="input__modal"
                                                    type="number"
                                                    value={requests.priceQuoted}
                                                    placeholder="Enter quote price here" />
                                            </fieldset>
                                        </form>
                                        <button
                                            className="submit__quote"
                                            id={request.id}
                                            onClick={(event) => submitQuotePrice(event, request)}
                                        >Submit Quote</button>
                                        <button className="cancel__quote" onClick={toggleModal}>Cancel</button>
                                    </Modal>
                                </div>
                                <hr className={`dotted`}></hr>
                            </div>
                        } else if (request.user.id === parseInt(localStorage.getItem("machining_user"))) {
                            return <div key={request.id} className="requests__list">
                                <hr className={`dotted`}></hr>
                                <section>
                                    <h4 key={request.id}>Request Id# {request.id}</h4>
                                    <div className="item__requestList"><b>Requested By:</b> {request.user.name}</div>
                                    <div className="item__requestList"><b>Material:</b>  {request.material}</div>
                                    <div className="item__requestList"><b>Description: </b> {request.description}</div>
                                    <div className="item__requestList"><b>Date Requested: </b> {request.dateRequested}</div>
                                </section>
                                <button className="delete__request"

                                    onClick={() => {
                                        deleteRequest(request.id)
                                    }}>Delete Request</button>
                                <hr className={`dotted`}></hr>
                            </div>
                        }
                    }
                )
            }
        </>
    )
}
