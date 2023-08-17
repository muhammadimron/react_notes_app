import React from "react";
import PropTypes from "prop-types";
import NoteList from "./NoteList";
import LocaleContext from "../contexts/LocaleContext";

function NoteListBody({ statusNotes, notes, onDeleteHandler, onChangeStatusNotes }){
    const { language } = React.useContext(LocaleContext);
    const status = language === "en" ? statusNotes : (statusNotes === "Active" ? "Aktif" : "Arsip");

    return (
        <div className="notes__content">   
            <div className="notes_list__header">
                <h2>{language === "en" ? `${status} Notes` : `Catatan ${status}`}</h2>
            </div>
            <div className="notes_list__content">
                <NoteList notes={notes}
                          onDelete={onDeleteHandler}
                          onStatus={onChangeStatusNotes} />
            </div>
        </div>
    );
}

NoteListBody.propTypes = {
    statusNotes: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteHandler: PropTypes.func.isRequired,
    onChangeStatusNotes: PropTypes.func.isRequired
}

export default NoteListBody;