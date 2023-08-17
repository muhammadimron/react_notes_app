import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import { AiFillHome } from "react-icons/ai";
import NoteDetail from "../components/NoteDetail";
import DeleteButton from "../components/DeleteButton";
import ChangeStatusButton from "../components/ChangeStatusButton";
import LocaleContext from "../contexts/LocaleContext";

function DetailPage(){
    const init_value = {
        id: "",
        title: "",
        body: "",
        createdAt: "",
        archived: false,
        owner: ""
    }

    const { id } = useParams();
    const [ note, setNote ] = React.useState(init_value);
    const [ initializing, setInitializing ] = React.useState(true);
    const { language } = React.useContext(LocaleContext);
    const navigate = useNavigate();

    async function onDeleteHandler(id) {
        await deleteNote(id);
        if(note.archived) navigate('/?archive=1'); 
        else navigate("/");
    }

    async function onChangeStatus(isArchived, id){
        if(isArchived){
            await unarchiveNote(id);
            navigate("/")
        } else {
            await archiveNote(id);
            navigate("/?archive=1")
        }
    }

    React.useEffect(() => {
        async function fetchNote(){
            const { data } = await getNote(id);
            setNote(data);
            setInitializing(false);
        }

        fetchNote();
    }, [id]);

    if(initializing){
        return <p className="loading">{ language === "en" ? "Loading..." : "Memuat..." }</p>;
    }

    return (
        <div className="detail_note">
            <div className="detail_note__header">
                <h1>{ language === "en" ? "Note Details" : "Detail Catatan" }</h1>
            </div>
            <div className="detail_note__content">
                <NoteDetail note={note}/>
            </div>
            <div className="detail_note__footer">
                <ChangeStatusButton id={id} 
                                    archived={note.archived} 
                                    changeStatus={onChangeStatus} />                  
                <DeleteButton id={id} deleteNote={onDeleteHandler} />
                <Link to={note.archived ? "/?archive=1" : "/"} ><button><AiFillHome /></button></Link>
            </div>
        </div>
    );
}

export default DetailPage;