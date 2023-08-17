import React from "react";
import { useNavigate } from 'react-router-dom';
import NoteInput from "../components/NoteInput";
import LocaleContext from "../contexts/LocaleContext";
import { addNote } from "../utils/api";
 
function AddPage() {
    const navigate = useNavigate();
    const { language } = React.useContext(LocaleContext);

    async function onAddNoteHandler(note) {
        await addNote(note);
        navigate('/');
    }
    
    return (
        <section>
            <h2>{ language === "en" ? "Add Note" : "Tambah Catatan" }</h2>
            <NoteInput action={onAddNoteHandler} />
        </section>
    )
}
 
export default AddPage;