import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllQuotes, getSortQuotesByDateNewer, getSortQuotesByDateOlder } from "../ApiManager"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "./Quotes.css"

export const QuoteList = () => {
    const [quotes, updateQuotes] = useState([])
    const [sortedQuotes, setSortedQuotes] = useState([])

    useEffect(
        () => {
            getAllQuotes()
                .then(
                    (quotesArray) => {
                        updateQuotes(quotesArray)
                    }
                )
        },
        []
    )

    const newerQuotes = () => {

        getSortQuotesByDateNewer()
            .then(
                (sortedQuotes) => {
                    setSortedQuotes(sortedQuotes)
                }
            )
        return sortedQuotes
    }
    const olderQuotes = () => {

        getSortQuotesByDateOlder()
            .then(
                (sortedQuotes) => {
                    setSortedQuotes(sortedQuotes)
                }
            )
        return sortedQuotes
    }




    return (
        <>
            <h3 className="heading__quoteList">Quote List</h3>
            <DropdownButton id="dropdown-basic-button" title="Sort Quotes By...">
                <Dropdown.Item onClick={() => {
                    olderQuotes(sortedQuotes)
                }}>Older</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    newerQuotes(sortedQuotes)
                }}>Newer</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Status</Dropdown.Item>
            </DropdownButton>
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
                                    <Link to={`/quotes/${quote.id}`}>Quote Details</Link>
                                </button>
                                <hr className={`dotted`}></hr>
                            </div>
                        }
                    }
                )
            }
            <div className="button__returnHome">

                <button className="button__profileBack">
                    <Link to="/">Return Home</Link>
                </button>
            </div>
        </>
    )
}
