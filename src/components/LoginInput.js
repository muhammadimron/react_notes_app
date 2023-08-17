import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from "../hooks/useInput";
import LocaleContext from '../contexts/LocaleContext';

function LoginInput({ login }){
    const [ email, onEmailChangeHandler ] = useInput('');
    const [ password, onPasswordChangeHandler ] = useInput('');
    const { language } = React.useContext(LocaleContext);

    function onSubmitEventHandler(event){
        event.preventDefault();
        login({ email, password });
    }

    return (
        <form onSubmit={onSubmitEventHandler} className='login__input'>
            <input type="email" placeholder="Email" value={email} onChange={onEmailChangeHandler} />
            <input type="password" placeholder="Password" value={password} onChange={onPasswordChangeHandler} />
            <button>{ language === "en" ? "Login" : "Masuk" }</button>
        </form>
    )
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
};
   
export default LoginInput;