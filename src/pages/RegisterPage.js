import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/api';
 
function RegisterPage() {
    const navigate = useNavigate();
    const { language } = React.useContext(LocaleContext);

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/');
        }
    }
  
    return (
        <section className='register__page'>
            <h2>{language === "en" ? "Register your Account" : "Daftarkan Akun Kamu"}</h2>
            <RegisterInput register={onRegisterHandler} />
            <p>
                {language === "en" ? "Already have an account? " : "Sudah punya akun? "} 
                <Link to="/"> {language === "en" ? "back to login" : "kembali ke masuk"}</Link>
            </p>
        </section>
    )
}
 
export default RegisterPage;