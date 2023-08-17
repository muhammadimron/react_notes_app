import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from "../hooks/useInput";
import LocaleContext from '../contexts/LocaleContext';

function RegisterInput({ register }){
    const [ name, onNameChangeHandler ] = useInput('');
    const [ email, onEmailChangeHandler ] = useInput('');
    const [ password, onPasswordChangeHandler ] = useInput('');
    const { language } = React.useContext(LocaleContext);

    function onSubmitEventHandler(event){
        event.preventDefault();
        register({ name, email, password });
    }

    return (
        <form onSubmit={onSubmitEventHandler} className='register__input'>
            <input type="text" 
                   placeholder={language === "en" ? "Name" : "Nama"} 
                   value={name} 
                   onChange={onNameChangeHandler} />
            <input type="email" 
                   placeholder="Email" 
                   value={email} 
                   onChange={onEmailChangeHandler} />
            <input type="password" 
                   placeholder="Password" 
                   autoComplete='current__password' 
                   value={password} 
                   onChange={onPasswordChangeHandler} />
            <button>{language === "en" ? "Register" : "Daftar"}</button>
        </form>
    )
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};
   
export default RegisterInput;