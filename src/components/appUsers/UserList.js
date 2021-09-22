import React, { useEffect, useState } from "react"
import "./Admin.css"

export const UserList = () => {
    const [users, assignUsers] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:3719/users")
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
                                    <div><b>Name: </b> {user.name}</div><br/>
                                    <div><b>User Id#: </b> {user.id}</div><br/>
                                    <div><b>Email: </b> {user.email}</div><br/>
                                    <div><b>Address: </b> {user.address}</div><br/>
                                    <div><b>Phone: </b> {user.phone}</div><br/>
                                   </div>

                            }
                        }
                    )
                }
            </div>
        </>
    )
}
