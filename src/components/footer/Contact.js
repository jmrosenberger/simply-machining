import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import "./Contact.css"


export const Contact = () => {
    return (
        <>
            <div className="card__container">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="machine_shop_head.png" />
                    <Card.Body>
                        <Card.Title>Simply Machining®</Card.Title>
                        <div className="text__container">

                            <Card.Text>
                                Phone: 555-555-5555
                            </Card.Text>
                            <Card.Text>
                                Email: contact@machineshop.com
                            </Card.Text>
                        </div>
                        <Button variant="primary" className="button__contact">
                            <Link to="/">
                                Return Home
                            </Link>
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}