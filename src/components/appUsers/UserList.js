import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Users.css"

export const UserList = () => {
    const [users, assignUsers] = useState([])

    useEffect(
        () => {
            fetch("https://machining-api-e3mht.ondigitalocean.app/users")
                .then(res => res.json())
                .then(
                    (users) => {
                        assignUsers(users)
                    }
                )
        },
        []
    )

    return (
        <>
            <div className="profile__container">
                <h4><u>My Profile</u></h4>
                {
                    users.map(
                        (user) => {
                            if (user.id === parseInt(localStorage.getItem("machining_user"))) {
                                return <div key={user.id}>
                                    <div><b>Name: </b> {user.name}</div><br />
                                    <div><b>User Id#: </b> {user.id}</div><br />
                                    <div><b>Email: </b> {user.email}</div><br />
                                    <div><b>Address: </b> {user.address}</div><br />
                                    <div><b>Phone: </b> {user.phone}</div><br />
                                    <button className="button__profileBack">
                                        <Link to="/">Return Home</Link>
                                    </button>
                                </div>
                            }
                        }
                    )
                }
            </div>
        </>
    )
}
