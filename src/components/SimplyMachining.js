import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Footer } from "./footer/Footer"
import { NavBar } from "./nav/NavBar"
import "./SimplyMachining.css"
import 'bootstrap'



export const SimplyMachining = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("machining_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
              <Footer />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
