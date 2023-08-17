import React from "react";
import PropTypes from "prop-types";
import { AiTwotoneDelete } from "react-icons/ai";

function DeleteButton({ id, deleteNote }){
    return (
        <button onClick={() => deleteNote(id)}><AiTwotoneDelete/></button>
    );
}

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    deleteNote: PropTypes.func.isRequired,
}

export default DeleteButton;