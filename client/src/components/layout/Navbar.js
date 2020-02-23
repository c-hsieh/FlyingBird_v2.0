import React, { useState, useContext } from "react";
import { NavLink } from 'react-router-dom';
import Login from '../../components/auth/Login'
import Logout from "../../components/auth/Logout";
import { Context } from "../../flux/store";

const Navbar = (prop) => {
    const { dispatch, auth, error } = useContext(Context);
    
    return (
      <nav
        className="navbar navbar-expand-md navbar-light "
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <NavLink className="navbar-brand" to="/">
          <i className="fas fa-graduation-cap"></i>
          NTNU
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                <i className="fas fa-search"></i>
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                // to="/like"
                to={{
                  pathname: "/like",
                  state: { prevPath: window.location.pathname }
                }}
                prevPath={prop.prevPath}
              >
                <i className="fas fa-heart"></i>
                Like
              </NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right ml-auto">
            <li className="nav-item">
              {auth.isAuthenticated
              ?<Logout />
              :<Login />}
              
            </li>
          </ul>
        </div>
      </nav>
      // <nav className="navbar navbar-dark bg-dark mb-5">
      //     <span className="navbar-brand mb-0 h1 mx-auto">LyricFinder</span>
      // </nav>
    );
};

export default Navbar;