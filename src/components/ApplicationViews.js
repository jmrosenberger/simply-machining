import React from "react"
import { Route } from "react-router-dom"
import { UserList } from "./appUsers/UserList"
import { About } from "./footer/About"
import { Contact } from "./footer/Contact"
import { HomePage } from "./nav/Home"
import { Quotes } from "./quotes/QuoteList"
import { RequestForm } from "./requests/RequestForm"
import { Requests } from "./requests/Requests"




export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/RequestForm">
                <RequestForm />
            </Route>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/users">
                <UserList />
            </Route>
            <Route exact path="/requests">
                <Requests />
            </Route>
            <Route exact path="/quotes">
                <Quotes />
            </Route>
            <Route exact path="/About">
                <About />
            </Route>
            <Route exact path="/Contact">
                <Contact />
            </Route>

        </>
    )
}
