import React from "react";
import { FaMoon, FaSun } from 'react-icons/fa';
import LocaleContext from "../contexts/LocaleContext";

function ThemeButton(){
    const { theme, toggleTheme } = React.useContext(LocaleContext);

    return <li><button onClick={() => toggleTheme()} >{theme === "light" ? (<FaMoon />) : (<FaSun />)}</button></li>;
}

export default ThemeButton;