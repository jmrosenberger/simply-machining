import React from "react"
import { Route } from "react-router-dom"
import { UserList } from "./appUsers/UserList"
import { Quotes } from "./quotes/QuoteList"
import { Requests } from "./requests/Requests"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/users">
                <UserList />
            </Route>
            <Route exact path="/requests">
                <Requests />
            </Route>
            <Route exact path="/quotes">
                <Quotes />
            </Route>

        </>
    )
}
