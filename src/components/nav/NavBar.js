import React, { useState } from "react"
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import "./NavBar.css"




export const NavBar = () => {

    
    return (
        <Navbar expand="md lg xl xxl" bg="secondary" fixed="top" className="navbar_container">
            <Container>
                <Navbar.Brand href="/"><img rel="logo" src="LogoMakr-3rgu1m.png" alt="logo" className="navbar__logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/requests">Requests</Nav.Link>
                        <Nav.Link href="/quotes">Quotes</Nav.Link>
                        <NavDropdown title="Welcome" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/requests">My Requests</NavDropdown.Item>
                            <NavDropdown.Item href="/quotes">My Quotes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#" onClick={
                                () => {
                                    localStorage.removeItem("machining_user")
                                }
                            } >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

