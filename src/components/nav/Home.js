import React from "react"
import { RequestForm } from "../requests/RequestForm"
import "./NavBar.css"


export const HomePage = () => {
    return (
        <>
        <h1>Welcome To... </h1>
        <p className="glow">Simply Machining</p>
        <RequestForm />
        </>
    )
}