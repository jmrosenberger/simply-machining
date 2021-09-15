import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import "./Requests.css"

Modal.setAppElement("#root")

export const Requests = () => {
    const [requests, updateRequests] = useState([])
    const [quote, updateQuote] = useState([])
    const [isOpen, setIsOpen] = useState(false)                 // ---- || Do I need to change 'useState(false)' to 'useState(true)' ?? || ---- //

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(
        () => {
            fetch("http://localhost:3719/requests?_expand=user")
                .then(res => res.json())
                .then(
                    (requestsArray) => {
                        updateRequests(requestsArray)
                    }
                )
        },
        []
    )
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
    return (
        <>
            <h3>Current Requests</h3>
            {
                requests.map(
                    (request) => {
                        console.log(request)
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={request.id} className="requests__list">
                                <hr className={`dotted`}></hr>
                                <ul>
                                    <h4 key={request.id}>Request Id# {request.id}</h4>
                                    Requested By: {request.user.name}<br />
                                    Material: {request.material}<br />
                                    Description: {request.description}<br />
                                    Date Requested: {request.dateRequested}</ul>
                                <button className="delete__request"
                                    onClick={() => {
                                        deleteRequest(request.id)
                                    }}>Delete Request</button>
                                <div className="app">
                                    <button className="delete__request"
                                        onClick={toggleModal}>Review Request</button>

                                    <Modal
                                        isOpen={isOpen}
                                        onRequestClose={toggleModal}
                                        contentLabel="Review Request"
                                        className="mymodal"
                                        overlayClassName="myoverlay"
                                    >
                                        <div>Input Quote Price</div>
                                        <form>
                                            <fieldset>
                                                <label htmlFor="Price">Quote Price: $</label>
                                                <input 
                                                onChange={
                                                    (event) => {
                                                        const copy = {...quote}
                                                        copy.price = event.target.value
                                                        updateQuote(copy)
                                                    }
                                                }
                                                type="number" 
                                                value="currency" 
                                                min="0.00" 
                                                max="100000.00"
                                                step="0.01"
                                                placeholder="Enter quote price here"/>
                                            </fieldset>
                                        </form>
                                        <button onClick={toggleModal}>Close Modal</button>
                                        <button>Submit Quote</button>
                                    </Modal>
                                </div>
                                <hr className={`dotted`}></hr>
                            </div>
                        } else if (request.user.id === parseInt(localStorage.getItem("machining_user"))) {
                            return <div key={request.id} className="requests__list">
                                <hr className={`dotted`}></hr>
                                <ul>
                                    <h4 key={request.id}>Request Id# {request.id}</h4>
                                    Requested By: {request.user.name}<br />
                                    Material: {request.material}<br />
                                    Description: {request.description}<br />
                                    Date Requested: {request.dateRequested}</ul>
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
