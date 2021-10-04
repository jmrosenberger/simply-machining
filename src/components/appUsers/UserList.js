import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { getAllUsers } from "../ApiManager"
import "./Users.css"

export const UserList = () => {
    const [users, assignUsers] = useState([])
    // const [removeUser, updateUsers] = useState({})


    useEffect(
        () => {
            getAllUsers()
                .then(
                    (users) => {
                        assignUsers(users)
                    }
                )
        },
        []
    )


    const deleteUser = (id) => {
        return fetch(`https://machining-api-e3mht.ondigitalocean.app/users/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllUsers()
                    .then((user) => {
                        assignUsers(user)
                    })


            })
    }


    const confirmRemove = (id) => {
        confirmAlert({
            message: 'Are you sure you want to REMOVE this profile?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteUser(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        })

    };



    console.log(users)
    return (
        <>
            <div className="profile__container">
                {
                    users.map(
                        (user) => {
                            if (parseInt(localStorage.getItem("machining_user")) === 3) {
                                return <div key={user.id} className="container__user" >
                                    <h4><u>User Profile</u></h4>
                                    <div><b>Name: </b> {user.name}</div><br />
                                    <div><b>User Id#: </b> {user.id}</div><br />
                                    <div><b>Email: </b> {user.email}</div><br />
                                    <div><b>Address: </b> {user.address}</div><br />
                                    <div><b>Phone: </b> {user.phone}</div><br />
                                    <button className="button__profileBack">
                                        <Link to="/">Return Home</Link>
                                    </button>
                                    <button className="button__profileDelete"
                                        onClick={() => {
                                            confirmRemove(user.id)
                                        }}>
                                        Delete User Profile
                                    </button>
                                </div>
                            }
                            else if (user.id === parseInt(localStorage.getItem("machining_user"))) {
                                return <div key={user.id} className="container__user" >
                                    <h4><u>User Profile</u></h4>
                                    <div><b>Name: </b> {user.name}</div><br />
                                    <div><b>User Id#: </b> {user.id}</div><br />
                                    <div><b>Email: </b> {user.email}</div><br />
                                    <div><b>Address: </b> {user.address}</div><br />
                                    <div><b>Phone: </b> {user.phone}</div><br />
                                    <button className="button__profileBack">
                                        <Link to="/">Return Home</Link>
                                    </button>
                                    <button className="button__profileDelete"
                                        onClick={() => {
                                            {confirmRemove(user.id)} {localStorage.removeItem("machining_user")}
                                        }}>
                                       
                                         Delete User Profile 
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
