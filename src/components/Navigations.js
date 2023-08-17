import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdAddCircleOutline } from "react-icons/md";
import { FiLogOut } from 'react-icons/fi';
import TranslateButton from "./TranslateButton";
import ThemeButton from "./ThemeButton";

function Navigations({ logout }){
    return (
        <nav>
            <ul>
                <ThemeButton />   
                <TranslateButton />
                <li><Link to="/add" className="link" ><MdAddCircleOutline /></Link></li>
                <li><button onClick={() => logout()} ><FiLogOut /></button></li>
            </ul>
        </nav>
    );
}

Navigations.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default Navigations;