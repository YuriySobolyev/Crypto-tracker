import React from 'react';
import '../styles/Header.scss';
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div className="header">
            <Link to="/">
            <div className="logo"></div>
            </Link>
            <h3>Crypto page</h3>
        </div>
    );
};

export default Header;