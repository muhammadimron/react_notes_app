import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AiFillHome } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useInput } from "../hooks/useInput";

function NoteInput({ pTitle, pBody, action }){
    const [title, onTitleChangeEventHandler] = useInput(pTitle || '');
    const [body, setBody] = React.useState(pBody || '');
    const onBodyChangeHandler = (event) => {
        setBody(event.target.innerHTML)
    };

    function onSubmitEventHandler(event) {
        event.preventDefault();
        action({ title, body });
    }

    return (
        <form className='note_input' onSubmit={onSubmitEventHandler}>
            <input type="text" placeholder="Title" value={title} onChange={onTitleChangeEventHandler} />
            <p data-placeholder="Today i am ......"
               contentEditable
               className="input__body"
               onInput={onBodyChangeHandler}/>
            <div className="note_input__button_group">
                <button type="submit"><TiTick /></button>
                <button><Link to="/"><AiFillHome /></Link></button>
            </div>
        </form>
    );
}

NoteInput.propTypes = {
    action: PropTypes.func.isRequired,
    pTitle: PropTypes.string,
    pBody: PropTypes.string
}

export default NoteInput;