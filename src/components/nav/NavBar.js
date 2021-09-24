import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    return (
        <div className="navbar__container">

            <ul className="navbar">
                <a href="/"> <img rel="logo" src="LogoMakr-3rgu1m.png" alt="logo" className="navbar__logo" width="41" height="45" /></a><br />
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/requests">Requests</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/quotes">Quotes</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/users">Profile</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="#"
                        onClick={
                            () => {
                                localStorage.removeItem("machining_user")
                            }
                        }>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}


