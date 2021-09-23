import React from "react"
import { useHistory } from "react-router-dom"
import "./Home.css"


export const HomePage = () => {
    const history = useHistory()

    const conditionalButton = () => {
        if (parseInt(localStorage.getItem("machining_user")) === 1) {
            return <button className="request__inputForm"
                hidden
                id="request__inputForm"
                onClick={
                    () => history.push("/RequestForm")}
            >Request A Quote</button>
        } else {
            return <button className="request__inputForm"
                id="request__inputForm"
                onClick={
                    () => history.push("/RequestForm")}
            >Request A Quote</button>
        }
    }

    return (
        <>
            <div className="container__home">
                <h1 className="home__heading">Welcome To... </h1>
                <p className="glow">Simply Machining</p>
                <div className="button_requestForm">{conditionalButton()}</div>
            </div>
        </>
    )
}