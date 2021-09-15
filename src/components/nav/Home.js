import React from "react"
import { useHistory } from "react-router-dom"
import "./Home.css"


export const HomePage = () => {
    const history = useHistory()
    return (
        <>
            <div className="container__home">
                <h1 className="home__heading">Welcome To... </h1>
                <p className="glow">Simply Machining</p>
                <button className="request__inputForm"
                    id="request__inputForm"
                    onClick={
                        () => history.push("/RequestForm")}
                >Request A Quote</button>
            </div>
        </>
    )
}