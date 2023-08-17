import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';
 
function LoginPage({ loginSuccess }) {
    const { language } = React.useContext(LocaleContext);

    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });
    
        if (!error) {
            loginSuccess(data);
        }
    }
  
    return (
        <section className='login__page'>
            <h2>{language === "en" ? "Notes App Login Page" : "Halaman Login Aplikasi Catatan"}</h2>
            <LoginInput login={onLogin} />
            <p>
                {language === "en" ? "Don't have an account yet?" : "Belum punya akun?"} 
                <Link to="/register"> {language === "en" ? "Register here." : "Daftar di sini."}</Link>
            </p>
        </section>
    );
}
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}
 
export default LoginPage;