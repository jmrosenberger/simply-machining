import React from "react"
import { Link } from "react-router-dom"
import "./Footer.css"


export const Footer = () => {
    const date = new Date()
    const currentYear = date.getFullYear()
    return (
        <>
            <footer className="footer__container">
                <p className="about">
                    <Link className="footer__link" to="/About">About</Link>
                </p>
                <p className="contact">
                    <Link className="footer__link" to="/Contact">Contact</Link>
                </p>
                <p className="copyright footer__link">
                     Copyright © {currentYear} JMRosenberger All Rights Reserved
                </p>
                <p className="github__link">
                    <a href="https://github.com/jmrosenberger" className="footer__link">
                        <img src="GitHub-Mark-32px.png" alt="github_logo" width="15" height="15"/> 
                        GitHub</a>
                </p>
                <p className="footer__logo">Created my logo at <a href="https://logomakr.com"> LogoMakr.com</a></p>
            </footer>
        </>
    )
}