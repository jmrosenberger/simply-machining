import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { getAllQuotes, getAllRequests } from "../ApiManager"
import "../ReactConfirmAlert.css"
import "./Requests.css"


Modal.setAppElement("#root")

export const Requests = () => {
    const [requests, updateRequests] = useState([])
    const [priceQuote, updatePriceQuote] = useState(0)
    const [quote, updateQuote] = useState({})
    const [requestId, setRequestId] = useState(0)
    const [isOpen, setIsOpen] = useState(false)                 

    const toggleModal = (id) => {
        setRequestId(id)
        setIsOpen(!isOpen)
    }

    const getRequestByUser = () => {
            getAllRequests()
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

    const submitQuotePrice = () => {
        const newQuotePrice = {
            userId: parseInt(localStorage.getItem("machining_user")),
            requestId: requestId,
            priceQuoted: priceQuote,
            isAccepted: false,
            inProgress: false,
            isCompleted: false,
            status: "ACCEPTED REQUEST FOR QUOTE",
            date: Date()
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuotePrice)
        }
        return fetch(`https://machining-api-e3mht.ondigitalocean.app/quotes?_sort=status&_order=asc&_expand=request`, fetchOption)
            .then(() => getRequestByUser())


    }

    const confirmSubmitQuote = () => {
        confirmAlert({
            message: 'Are you sure you want to SUBMIT quote price?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {{ submitQuotePrice() } {toggleModal()}}
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                },
            ]
        })

    };

    const deleteRequest = (id) => {
        fetch(`https://machining-api-e3mht.ondigitalocean.app/requests/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllRequests()
                    .then((requests) => {
                        updateRequests(requests)
                    })
            })
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this request?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteRequest(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        })

    };

    const getQuoteObject = () => {
        getAllQuotes()
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

    return (
        <>
            <h3 className="requests__header">Current Requests</h3>
            {
                requests.map(
                    (request) => {
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={request.id} className="requests__list">
                                <section>
                                    <h4 key={request.id}>Request Id# {request.id}</h4>
                                    <div className="item__requestList"><b>Requested By:</b> {request.user.name}</div>
                                    <div className="item__requestList"><b>Material:</b>  {request.material}</div>
                                    <div className="item__requestList"><b>Description: </b> {request.description}</div>
                                    <div className="item__requestList"><b>Date Requested: </b> {request.dateRequested}</div>
                                </section>
                                <button className="delete__request"
                                    onClick={() => toggleModal(request.id)}>Review Request
                                </button>
                                <button className="delete__request"
                                    onClick={() => {
                                        confirmDelete(request.id)
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
                                                    autoFocus
                                                    className="input__modal"
                                                    type="number"
                                                    value={requests.priceQuoted}
                                                    placeholder="Enter quote price here" />
                                            </fieldset>
                                        </form>
                                        <div className="buttons__modal">
                                        <button
                                            className="submit__quote"
                                            id={request.id}
                                            onClick={() => confirmSubmitQuote()}
                                        >Submit Quote</button>
                                        <button className="cancel__quote" onClick={toggleModal}>Close</button>
                                        </div>
                                    </Modal>
                                </div>
                                <hr className={`dotted`}></hr>
                            </div>
                        } else if (request.user.id === parseInt(localStorage.getItem("machining_user"))) {
                            return <div key={request.id} className="requests__list">
                                <section>
                                    <h4 key={request.id}>Request Id# {request.id}</h4>
                                    <div className="item__requestList"><b>Requested By:</b> {request.user.name}</div>
                                    <div className="item__requestList"><b>Material:</b>  {request.material}</div>
                                    <div className="item__requestList"><b>Description: </b> {request.description}</div>
                                    <div className="item__requestList"><b>Date Requested: </b> {request.dateRequested}</div>
                                </section>
                                <button className="delete__request"

                                    onClick={() => {
                                        confirmDelete(request.id)
                                    }}>Delete Request</button>
                                <hr className={`dotted`}></hr>
                            </div>
                        }
                    }
                )
            }
            <button className="button__profileBack">
                <Link to="/">Return Home</Link>
            </button>
        </>
    )
}
