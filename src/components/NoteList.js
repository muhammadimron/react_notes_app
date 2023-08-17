import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onStatus }){
    return (
        <div className="notes_list">
            {
                notes.map((note) => (
                    <NoteItem 
                    key={note.id}
                    id={note.id}
                    deleteNote={onDelete}
                    changeStatus={onStatus}
                    {...note} />
                ))
            }
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onStatus: PropTypes.func.isRequired
}

export default NoteList;