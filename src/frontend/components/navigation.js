import React from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";


const Nav = () => {
    return (
        <Router>
            <nav className="pgg-nav">
                <ul>
                    <li><NavLink to="/albums">Albums</NavLink></li>
                    <li><NavLink to="/mypage">My Page</NavLink></li>
                </ul>
            </nav>
        </Router>

    );


}

export default Nav;