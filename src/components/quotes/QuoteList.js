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

            {
                quotes.map(
                    (quote) => {
                        return <div key={quote.id} className="quotes__list">
                            <ul>
                                <h4 key={quote.id}>Quote# {quote.id}</h4>
                                Quoted By: {quote.user.name}<br/>                { /* admin name */ }
                                Requested By: {quote.request.userId}<br/>        { /* customer name */ }
                                Price Quoted: ${quote.price}<br/>
                                Date Quoted: {quote.dateQuoted}<br/>
                                Is Accepted: {quote.isAccepted}<br/>             { /* accepted by customer */ }
                                Is Complete: {quote.isComplete}<br/>             { /* completed by admin */ }
                                Date Completed: {quote.dateCompleted}
                            </ul>
                        </div>
                    }
                )
            }
        </>
    )
}
