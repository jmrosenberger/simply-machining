import React, { useEffect, useState } from "react"

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
                                <ul>
                                <h4 key={user.id}>Name: {user.name}</h4>

                                    <li><b>User Id#</b>: {user.id}</li><br/>
                                    <li><b>Email</b>: {user.email}</li><br/>
                                    <li><b>Address</b>: {user.address}</li><br/>
                                    <li><b>Phone</b>: {user.phone}</li><br/>
                                   </ul>
                                   </div>

                            }
                        }
                    )
                }
            </div>
        </>
    )
}
