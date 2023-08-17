import React from "react";
import PropTypes from "prop-types";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";

function ChangeStatusButton({ id, archived, changeStatus }){
    return (
        <button onClick={() => changeStatus(archived, id)}>
            {archived ? (<BiArchiveOut/>) : (<BiArchiveIn/>)}
        </button>
    );
}

ChangeStatusButton.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired, 
    changeStatus: PropTypes.func.isRequired
} 

export default ChangeStatusButton;