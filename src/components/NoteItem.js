import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils/index";
import ChangeStatusButton from "./ChangeStatusButton";
import DeleteButton from "./DeleteButton";

function NoteItem({ id, title, body, createdAt, archived, deleteNote, changeStatus }){
    return (
        <div className="note_item__container">
            <div className="title__wrapper">
                <Link to={`/note/${id}`} ><h3>{title}</h3></Link>
            </div>
            <div className="body__wrapper">
                <p>{parser(body)}</p>
            </div>
            <div className="footer__wrapper">
                <p>{showFormattedDate(createdAt)}</p>
                <div className="button_group">
                    <ChangeStatusButton id={id} archived={archived} 
                                        changeStatus={changeStatus}/>
                    <DeleteButton id={id} deleteNote={deleteNote}/>
                </div>
            </div>
        </div>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    deleteNote: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired
}

export default NoteItem;