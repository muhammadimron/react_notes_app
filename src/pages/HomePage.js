import PropTypes from "prop-types";
import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteListBody from "../components/NoteListBody";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";
import { deleteNote, 
         getActiveNotes, 
         getArchivedNotes,
         archiveNote, 
         unarchiveNote } from "../utils/api";

function HomePage({ isArchived }){
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ keyword, setKeyword ] = React.useState(() => searchParams.get("keyword") || '');
    const [ notes, setNotes ] = React.useState([]);
    const [ initializing, setInitializing ] = React.useState(true);
    const { language } = React.useContext(LocaleContext);

    function changeSearchParams(keyword){
        if(isArchived) {
            setSearchParams({ 
                keyword,
                archive: "1"
            });
        } else {
            setSearchParams({ keyword });
        }
    }
    
    async function onChangeStatusNotes(isArchived, id){
        if (isArchived){
            await unarchiveNote(id);
            const { data } = await getArchivedNotes();
            setNotes(data);
        } else {
            await archiveNote(id);
            const { data } = await getActiveNotes();
            setNotes(data);
        }
    }

    async function onDeleteHandler(id){
        await deleteNote(id);
        const { data } = isArchived ? await getArchivedNotes() : await getActiveNotes();
        setNotes(data);
    }

    async function fetchActiveNotes(keyword){
        const { data } = await getActiveNotes();
        return data.filter((note) => {
            return note.title.toLowerCase().includes(
                keyword.toLowerCase()
            );
        });
    }

    async function fetchArchivedNotes(keyword){
        const { data } = await getArchivedNotes();
        return data.filter((note) => {
            return note.title.toLowerCase().includes(
                keyword.toLowerCase()
            );
        });
    }

    async function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        const filteredNotes = isArchived ? await fetchArchivedNotes(keyword) : await fetchActiveNotes(keyword);
        setNotes(filteredNotes)
        changeSearchParams(keyword);
    }

    React.useEffect(() => {
        async function fetchNotes(){
            const { data } = isArchived ? await getArchivedNotes() : await getActiveNotes();
            setNotes(data);
            setInitializing(false);
        }

        fetchNotes();
    }, [isArchived]);

    if(initializing){
        return <p className="loading">{ language === "en" ? "Loading..." : "Memuat..." }</p>;
    }

    return (
        <div className="notes">
            <div className="notes__header">
                <h1>{language === "en" ? "Notes App" : "Aplikasi Catatan"}</h1>
                <SearchBar defaultKeyword={keyword} 
                           keywordChange={onKeywordChangeHandler}/>
            </div>
            <>
                {notes.length === 0 && <h1>{language === "en" ? "You dont have any note !!!" : "Kamu tidak punya catatan sama sekali!!!"}</h1>}
                {notes.length !== 0 && <NoteListBody statusNotes={isArchived ? "Archived" : "Active"}
                                                     notes={notes}
                                                     onDeleteHandler={onDeleteHandler}
                                                     onChangeStatusNotes={onChangeStatusNotes}/>}
            </>
        </div>
    );
}

HomePage.propTypes = {
    isArchived: PropTypes.bool.isRequired
}

export default HomePage;