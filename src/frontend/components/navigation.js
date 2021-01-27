import React from "react";
import { NavLink } from "react-router-dom";


const Nav = () => {
    return (
        <nav className="pgg-nav">
            <ul>
                <li><NavLink to="/">Albums</NavLink></li>
                <li><NavLink to="/mypage">My Page</NavLink></li>
                <li><NavLink to="/search">Add New Album</NavLink></li>
            </ul>
        </nav>

    );


}

export default Nav;