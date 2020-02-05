import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light " style={{ "backgroundColor": "#e3f2fd"}}>
            <Link className="navbar-brand" to="/">
                <i className="fas fa-graduation-cap"></i>
                NTNU
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">
                            <i className="fas fa-search"></i>
                            Search
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/like">
                            <i className="fas fa-heart"></i>
                            Like
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        // <nav className="navbar navbar-dark bg-dark mb-5">
        //     <span className="navbar-brand mb-0 h1 mx-auto">LyricFinder</span>
        // </nav>
    )
};

export default Navbar;