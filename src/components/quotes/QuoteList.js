import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import "./Quotes.css"

export const QuoteList = () => {
    const [quotes, updateQuotes] = useState([])
    const history = useHistory()

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
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={quote.id} className="quotes__list">
                            <ul>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                Quoted By: Approver Id# {quote.userId}<br/>                
                                Requested By: Customer Id# {quote.request.userId}<br/>        
                                Price Quoted: ${quote.priceQuoted}<br/>
                                Date Quoted: {quote.dateQuoted}<br/>
                                Is Accepted: {quote.isAccepted}<br/>             
                                Is Completed: {quote.isCompleted}<br/>           
                                Date Completed: {quote.dateCompleted}
                            </ul>
                            <button className="quote__status"
                            id={quote.id}
                            >
                                <Link to={`/quotes/${quote.id}`}>Check Status</Link>
                            </button>
                            <hr className={`dotted`}></hr>
                        </div>

                        } else if (quote.request.userId === parseInt(localStorage.getItem("machining_user"))) {
                            return <div key={quote.id} className="quotes__list">
                            <ul>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                Quoted By: Approver Id# {quote.userId}<br/>                
                                Requested By: Customer Id# {quote.request.userId}<br/>      
                                Price Quoted: ${quote.priceQuoted}<br/>
                                Date Quoted: {quote.dateQuoted}<br/>
                                Is Accepted: {quote.isAccepted}<br/>             
                                Is Completed: {quote.isCompleted}<br/>           
                                Date Completed: {quote.dateCompleted}
                            </ul>
                            <button className="quote__status"
                            id={quote.id}
                            >
                                <Link to={`/quotes/${quote.id}`}>Check Status</Link>
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
