import React, { useEffect, useState } from "react"

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

    return (
        <>
            <h3>Current Requests</h3>
            {
                requests.map(
                    (request) => {
                        if (request.user.id === parseInt(localStorage.getItem("machining_user")) 
                        || parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={request.id} className="requests__list">
                            <ul>
                                <h4 key={request.id}>Request Id# {request.id}</h4>
                                Requested By: {request.user.name}<br />
                                Material: {request.material}<br />
                                Description: {request.description}<br />
                                Date Requested: {request.dateRequested}</ul>
                        </div>

                        }
                        
                    }
                )
            }
        </>
    )
}
