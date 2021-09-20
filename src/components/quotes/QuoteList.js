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
            <h3 className="heading__quoteList">Quote List</h3>
            {
                quotes.map(
                    (quote) => {
                        if (parseInt(localStorage.getItem("machining_user")) === 1) {
                            return <div key={`quote--${quote.id}`} className="quotes__list">
                                <hr className={`dotted`}></hr>
                                <section className={`quote ${quote.isCompleted ? "quote__completed" : "quote__incomplete"}`}>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                <div className="item__quoteList"><b>Quoted By:</b> Approver Id# {quote.userId}</div>               
                                <div className="item__quoteList"><b>Requested By:</b> Customer Id# {quote.request.userId}</div>     
                                <div className="item__quoteList"><b> Price Quoted:</b> ${quote.priceQuoted}</div>
                                <div className="item__quoteList"><b>Date Quoted:</b> {quote.dateQuoted}</div>
                                <div className="item__quoteList"><b>Is Accepted:</b> {quote.isAccepted}</div>             
                                <div className="item__quoteList"><b>Is Completed:</b> {quote.isCompleted}</div>           
                                <div className="item__quoteList"><b>Date Completed:</b> {quote.dateCompleted}</div>
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
                                <hr className={`dotted`}></hr>
                            <section className={`quote ${quote.isCompleted ? "quote__completed" : "quote__incomplete"}`}>
                                <h4 key={quote.id}>Quote For Request# {quote.requestId}</h4>
                                <div className="item__quoteList"><b>Quoted By:</b> Approver Id# {quote.userId}</div>               
                                <div className="item__quoteList"><b>Requested By:</b> Customer Id# {quote.request.userId}</div>     
                                <div className="item__quoteList"><b> Price Quoted:</b> ${quote.priceQuoted}</div>
                                <div className="item__quoteList"><b>Date Quoted:</b> {quote.dateQuoted}</div>
                                <div className="item__quoteList"><b>Is Accepted:</b> {quote.isAccepted}</div>             
                                <div className="item__quoteList"><b>Is Completed:</b> {quote.isCompleted}</div>           
                                <div className="item__quoteList"><b>Date Completed:</b> {quote.dateCompleted}</div>
                            </section>
                            <button className="btn__quoteList"
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
