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

    return (
        <>
            <h3>Quote List</h3>
            {
                quotes.map(
                    (quote) => {
                        if (quote.request.userId === parseInt(localStorage.getItem("machining_user")) 
                        || parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={quote.id} className="quotes__list">
                            <ul>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                Quoted By: {quote.userId}<br/>                { /* admin name */ }
                                Requested By: User Id#{quote.request.userId}<br/>        { /* customer name */ }
                                Price Quoted: ${quote.priceQuoted}<br/>
                                Date Quoted: {quote.dateQuoted}<br/>
                                Is Accepted: {quote.isAccepted}<br/>             { /* accepted by customer */ }
                                Is Completed: {quote.isCompleted}<br/>             { /* completed by admin */ }
                                Date Completed: {quote.dateCompleted}
                            </ul>
                        </div>

                        }
                        
                    }
                )
            }
        </>
    )
}
