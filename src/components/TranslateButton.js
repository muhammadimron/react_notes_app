import React from "react";
import { BsTranslate } from 'react-icons/bs';
import LocaleContext from "../contexts/LocaleContext";

function TranslateButton(){
    const { toggleLanguage } = React.useContext(LocaleContext);

    return <li><button onClick={() => toggleLanguage()} ><BsTranslate /></button></li>;
}

export default TranslateButton;
