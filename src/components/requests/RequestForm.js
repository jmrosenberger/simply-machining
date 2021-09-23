import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import "../ReactConfirmAlert.css"
import "./Requests.css"



export const RequestForm = () => {
    const [request, updateRequest] = useState({
        material: "",
        description: ""
    })

    const history = useHistory()

    const submitRequest = () => {

        const newRequest = {
            userId: parseInt(localStorage.getItem("machining_user")),
            material: request.material,
            description: request.description,
            dateRequested: Date(),
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }
        return fetch("http://localhost:3719/requests", fetchOption)
            .then(() => {
                history.push("/requests")
            })
    }

    const options = (event) => {
        event.preventDefault()
        confirmAlert({
            message: 'Are you sure you want to submit request?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { submitRequest() }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        })

    };

    return (
        <form className="requestForm">

            <div className="requestQuoteForm">
                <h2>Input Data To Receive Quote</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="material">Material:</label>
                        <input
                            onChange={
                                (event) => {
                                    const copy = { ...request }
                                    copy.material = event.target.value
                                    updateRequest(copy)
                                }
                            }
                            id="material"
                            name="material"
                            required autoFocus
                            type="text"
                            className="form-control form__material"
                            placeholder="Enter requested material type here"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description of Request:</label>
                        <textarea
                            onChange={
                                (event) => {
                                    const copy = { ...request }
                                    copy.description = event.target.value
                                    updateRequest(copy)
                                }
                            }
                            id="description"
                            name="description"
                            required
                            type="text"
                            className="form-control form__request"
                            placeholder="Brief but detailed description of job needing quoted"
                        ></textarea>
                    </div>
                </fieldset>

                <button className="btn btn-primary" onClick={options}>
                    Submit Request
                </button>
            </div>
        </form>
    )
}

