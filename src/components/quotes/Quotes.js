import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import "./Quotes.css"

export const Quotes = () => {
    const [quote, updateQuote] = useState({})  // State variable for current quote object
    const [requests, syncRequests] = useState([])  // State variable for array of requests
    const { quoteId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    console.log(quoteId)
    // Fetch the individual quote when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:3719/quotes/${quoteId}?_expand=user&_expand=request`)
                .then(response => response.json())
                .then((data) => {
                    updateQuote(data)
                })

        },
        [quoteId]  // Above function runs when the value of quoteId changes
    )

    // Fetch all Requests
    useEffect(
        () => {
            fetch(`http://localhost:3719/requests`)
                .then(res => res.json())
                .then(syncRequests)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )




    // ---- || Function to invoke when an quote price is accepted by customer as a result of clicking button || ---- \\

    const acceptQuote = () => {

        // Construct a new object to replace the existing one in the API
        const modifyQuote = {
            userId: quote.userId,
            requestId: quote.requestId,
            priceQuoted: quote.priceQuoted,
            isAccepted: true,
            inProgress: false,
            isCompleted: false,
            status: "APPROVED QUOTED PRICE",
            date: Date()
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:3719/quotes/${quoteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifyQuote)
        })

            .then(() => {
                history.push("/quotes")
            })
    }


    const beginQuote = () => {

        // Construct a new object to replace the existing one in the API
        const modifyQuote = {
            userId: quote.userId,
            requestId: quote.requestId,
            priceQuoted: quote.priceQuoted,
            isAccepted: true,
            inProgress: true,
            isCompleted: false,
            status: "BEGINNING WORK / IN PROGRESS",
            date: Date()
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:3719/quotes/${quoteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifyQuote)
        })
            .then(() => {
                history.push("/quotes")
            })
    }

    const completeQuote = () => {

        // Construct a new object to replace the existing one in the API
        const modifyQuote = {
            userId: quote.userId,
            requestId: quote.requestId,
            priceQuoted: quote.priceQuoted,
            isAccepted: true,
            inProgress: false,
            isCompleted: true,
            status: "COMPLETED JOB",
            date: Date()
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:3719/quotes/${quoteId}?_expand=user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifyQuote)
        })
            .then(() => {
                history.push("/quotes")
            })
    }
    console.log(quote)



    // ---- || This function conditionally renders 2 different buttons depending on whether an admin or customer is logged in || ---- \\

    const QuoteButton = () => {
        if (parseInt(localStorage.getItem("machining_user")) === 1) {
            return <div className="buttons__jobStatus">
                <button className="quote__status button__begin"
                    id={quote.id}
                    hidden={quote.isAccepted !== true || quote.isCompleted === true || quote.inProgress === true}
                    onClick={() => {
                        beginQuote(quote.id)
                    }}>Begin Job</button>
                <button className="quote__status button__complete"
                    id={quote.id}
                    hidden={quote.inProgress !== true || quote.isCompleted === true}
                    onClick={() => {
                        completeQuote(quote.id)
                    }}>Job Completed</button>
            </div>
        } else if (quote.request?.userId === parseInt(localStorage.getItem("machining_user"))) {
            return <button className="quote__status"
                id={quote.id}
                hidden={quote.isCompleted === "YES" || quote.isAccepted === "YES"}
                onClick={() => {
                    acceptQuote(quote.id)
                }}>Accept Quote
            </button>
        } else {
            return "have a nice day"
        }
    }


    return (
        <>
            <h1 className="quote__header">Quote Details</h1>



            <section className="quote__details">
                <h3 className="quote__heading">Quote for Request# {quote.requestId}</h3>
                <div className="quote__item"><b>Service Needed: </b> {quote.request?.description} made out of {quote.request?.material}</div>
                <div className="quote__item"><b>Requested by Customer Id# </b> {quote.request?.userId}</div>
                <div className="quote__item"><b>Price Quoted: </b>  ${quote.priceQuoted}</div>
                <div className="quote__item"><b>Quoted By: </b> {quote.user?.name}</div>
                <div className="quote__item"><b>Quote Status: </b> {quote.status}</div>
                <div className="quote__item"><b>Date Of Last Status Update: </b> {quote.date}</div>
                <QuoteButton />

            </section>
        </>
    )
}