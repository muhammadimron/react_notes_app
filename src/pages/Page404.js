import React from "react";
import { TbError404 } from "react-icons/tb";
import LocaleContext from "../contexts/LocaleContext";

function Page404(){
    const { language } = React.useContext(LocaleContext);

    return (
        <div className="page__404">
            <h1>{language === "en" ? "Page Not Found :(" : "Halaman Tidak Ditemukan :("}</h1>
            <h1 className="icon404"><TbError404/></h1>
        </div>
    );
}

export default Page404;