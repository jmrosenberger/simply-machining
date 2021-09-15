import React, { useEffect, useState } from "react"
import "./Requests.css"



export const Requests = () => {
    const [requests, updateRequests] = useState([])

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
                        if  (parseInt(localStorage.getItem("machining_user")) === 1) {
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
                                <button className="delete__request"
                                onClick={() => {
                                    deleteRequest(request.id)
                                }}>Review Request</button>
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
