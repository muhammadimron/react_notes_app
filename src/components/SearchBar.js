import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
 
function SearchBar({ keyword, keywordChange }) {
    const { language } = React.useContext(LocaleContext);

    return (
        <input
            className="search-bar"
            type="text"
            placeholder={language === "en" ? "Search By Name..." : "Cari Berdasarkan Nama..."}
            value={keyword}
            onChange={(event) => keywordChange(event.target.value)} />
    )
}
 
SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
}
 
export default SearchBar;