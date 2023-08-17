import React from "react";
import ThemeButton from "./ThemeButton";
import TranslateButton from "./TranslateButton";

function NavigationsLogin(){
    return (
        <nav className="nav__login">
            <ul>
                <ThemeButton/>
                <TranslateButton/>
            </ul>
        </nav>
    );
}

export default NavigationsLogin;