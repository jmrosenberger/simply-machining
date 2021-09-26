import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Quotes.css"

export const QuoteList = () => {
    const [quotes, updateQuotes] = useState([])

    useEffect(
        () => {
            fetch("https://machining-api-e3mht.ondigitalocean.app/quotes?_expand=user&_expand=request&_sort=status&_order=asc")
                .then(res => res.json())
                .then(
                    (quotesArray) => {
                        updateQuotes(quotesArray)
                    }
                )
        },
        []
    )

    return (
        <>
            <h3 className="heading__quoteList">Quote List</h3>
            {
                quotes.map(
                    (quote) => {
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={`quote--${quote.id}`} className="quotes__list">
                                <section className={`${quote.status === "COMPLETED JOB" ? "quote__completed" : "quote__incomplete"}
                                ${quote.status === "APPROVED QUOTED PRICE" ? "quote__accepted" : "quote__notAaccepted"}
                                ${quote.status === "BEGINNING WORK / IN PROGRESS" ? "quote__started" : "quote__notStarted"}
                                `}>
                                    <h4 key={quote.id} className={`${quote.status === "COMPLETED JOB" ? "quote__completedHeading" : "quote__incompleteHeading"}
                                ${quote.status === "APPROVED QUOTED PRICE" ? "quote__acceptedHeading" : "quote__notAaccepted"}
                                ${quote.status === "BEGINNING WORK / IN PROGRESS" ? "quote__startedHeading" : "quote__notStarted"}
                                `}>Quote For Request# {quote.requestId}</h4>
                                    <div className="item__quoteList"><b>Requested By: </b> Customer Id# {quote.request.userId}</div>
                                    <div className="item__quoteList"><b> Price Quoted: </b> ${quote.priceQuoted}</div>
                                    <div className="item__quoteList"><b>Quote Status: </b> {quote.status}</div>
                                </section>
                                <button className="btn__quoteList"
                                    id={quote.id}
                                >
                                    <Link to={`/quotes/${quote.id}`}>Check Status</Link>
                                </button>
                                <hr className={`dotted`}></hr>
                            </div>

                        } else if (quote.request.userId === parseInt(localStorage.getItem("machining_user"))) {
                            return <div key={quote.id} className="quotes__list">
                                <section className={`${quote.status === "COMPLETED JOB" ? "quote__completed" : "quote__incomplete"}
                                ${quote.status === "CUSTOMER HAS APPROVED QUOTED PRICE" ? "quote__accepted" : "quote__notAaccepted"}
                                ${quote.status === "BEGINNING WORK / IN PROGRESS" ? "quote__started" : "quote__notStarted"}
                                `}>
                                    <h4 key={quote.id} className={`${quote.status === "COMPLETED JOB" ? "quote__completedHeading" : "quote__incompleteHeading"}
                                ${quote.status === "CUSTOMER HAS APPROVED QUOTED PRICE" ? "quote__acceptedHeading" : "quote__notAaccepted"}
                                ${quote.status === "BEGINNING WORK / IN PROGRESS" ? "quote__startedHeading" : "quote__notStarted"}
                                `}>Quote For Request# {quote.requestId}</h4>
                                    <div className="item__quoteList"><b>Requested By: </b> Customer Id# {quote.request.userId}</div>
                                    <div className="item__quoteList"><b> Price Quoted: </b> ${quote.priceQuoted}</div>
                                    <div className="item__quoteList"><b>Quote Status: </b> {quote.status}</div>
                                </section>
                                <button className="btn__quoteList"
                                    id={quote.id}
                                >
                                    <Link to={`/quotes/${quote.id}`}>Quote Details</Link>
                                </button>
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
