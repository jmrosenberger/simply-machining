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

        {
            users.map(
                (user) => { 
                  return  <h4 key={user.id}> {user.name}</h4>
                }
            )
        }
        </>
    )
}
