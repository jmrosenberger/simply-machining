import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { useHistory, useParams } from "react-router-dom"
import "./Requests.css"

Modal.setAppElement("#root")

export const Requests = () => {
    const [requests, updateRequests] = useState({
        userId: "",
        material: "",
        description: "",
        dateRequested: "",
        priceQuoted: ""
    })
    
    // const [ requestId ] = useParams()
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
    const history = useHistory()
        
    const submitQuotePrice = (event) => {
        event.preventDefault()
        const newQuotePrice = {
            userId: requests.userId,
            material: requests.material,
            description: requests.description,
            dateRequested: requests.dateRequested,
            priceQuoted: parseInt(event.target.value)
        }
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuotePrice)
        }
        return fetch("http://localhost:3719/requests/", fetchOption)
        .then(() => {
            history.push("/requests")
        })
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
                                                        const copy = {...requests}
                                                        copy.priceQuoted = event.target.value
                                                        updateRequests(copy)
                                                    }
                                                }
                                                type="number" 
                                                value={requests.priceQuoted} 
                                                placeholder="Enter quote price here"/>
                                            </fieldset>
                                        </form>
                                        <button onClick={toggleModal}>Close Modal</button>
                                        <button
                                        className="submit__quote"
                                        onClick={submitQuotePrice}>Submit Quote</button>
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
