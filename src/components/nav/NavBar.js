import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css" 


export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/users">Users</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/requests">Requests</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/quotes">Quotes</Link>
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
    )
}