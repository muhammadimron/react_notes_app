import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Navigations from "./Navigations";
import LocaleContext from "../contexts/LocaleContext";

function Header({ logout, isArchived }){
    const { language } = React.useContext(LocaleContext);

    return (
        <header>
            <div className="header__status">
                { isArchived && (<Link to="/">
                                        <button>
                                            { language === "en" ? "Active Notes" : "Catatan Aktif" }
                                        </button>
                                </Link>)}
                { !isArchived && (<Link to="/?archive=1">
                                    <button>
                                        { language === "en" ? "Archived Notes" : "Catatan Arsip" }
                                    </button>
                                </Link>)}  
            </div>
            <Navigations logout={logout} isArchived={isArchived} />
        </header>
    );
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isArchived: PropTypes.bool.isRequired
}

export default Header;