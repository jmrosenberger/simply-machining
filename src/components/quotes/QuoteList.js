import React, { useEffect, useState } from "react"
import "./Quotes.css"

export const Quotes = () => {
    const [quotes, updateQuotes] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:3719/quotes?_expand=user&_expand=request")
                .then(res => res.json())
                .then(
                    (quotesArray) => {
                        updateQuotes(quotesArray)
                    }
                )
        },
        []
    )

    // parseInt(localStorage.getItem("machining_user")) === 1)
    // quote.request.userId === parseInt(localStorage.getItem("machining_user"))

    return (
        <>
            <h3>Quote List</h3>
            {
                quotes.map(
                    (quote) => {
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={quote.id} className="quotes__list">
                            <ul>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                Quoted By: Approver Id# {quote.userId}<br/>                { /* admin name */ }
                                Requested By: Customer Id# {quote.request.userId}<br/>        { /* customer name */ }
                                Price Quoted: ${quote.priceQuoted}<br/>
                                Date Quoted: {quote.dateQuoted}<br/>
                                Is Accepted: {quote.isAccepted}<br/>             { /* accepted by customer */ }
                                Is Completed: {quote.isCompleted}<br/>             { /* completed by admin */ }
                                Date Completed: {quote.dateCompleted}
                            </ul>
                            <button className="complete__button">
                                Job Completed
                            </button>
                            <hr className={`dotted`}></hr>
                        </div>

                        } else if (quote.request.userId === parseInt(localStorage.getItem("machining_user"))) {
                            return <div key={quote.id} className="quotes__list">
                            <ul>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                Quoted By: Approver Id# {quote.userId}<br/>                { /* admin name */ }
                                Requested By: Customer Id# {quote.request.userId}<br/>        { /* customer name */ }
                                Price Quoted: ${quote.priceQuoted}<br/>
                                Date Quoted: {quote.dateQuoted}<br/>
                                Is Accepted: {quote.isAccepted}<br/>             { /* accepted by customer */ }
                                Is Completed: {quote.isCompleted}<br/>             { /* completed by admin */ }
                                Date Completed: {quote.dateCompleted}
                            </ul>
                            <button className="accept__button">
                                Accept Quote
                            </button>
                            <hr className={`dotted`}></hr>
                        </div>
                        }
                        
                    }
                )
            }
        </>
    )
}
