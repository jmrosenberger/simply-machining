import React from "react"
import { UserList } from "./appUsers/UserList"
import { Quotes } from "./quotes/QuoteList"
import { Requests } from "./requests/Requests"

export const SimplyMachining = () => {


    return (
        <>
        <h1>Simply Machining</h1>
        <h2>User List</h2>
        <UserList />
        <h2>Requests</h2>
        <Requests />
        <h2>Quotes</h2>
        <Quotes />

        </>
    )
}
