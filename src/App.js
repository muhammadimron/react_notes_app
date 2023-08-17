import React from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import Page404 from "./pages/Page404";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from './utils/api';
import LocaleContext from "./contexts/LocaleContext";
import NavigationsLogin from "./components/NavigationsLogin";

function App(){
    const [ searchParams ] = useSearchParams();
    const [ isChangedURL, setIsChangedURL ] = React.useState(false);
    const [ authedUser, setAuthedUser ] = React.useState(null);
    const [ initializing, setInitializing ] = React.useState(true);
    const [ language, setLanguage ] = React.useState("en");
    const [ theme, setTheme ] = React.useState(() => localStorage.getItem("theme") || "light");
    const navigate = useNavigate();
    const archived = searchParams.get("archive");
    const isArchived = archived === "1" ? true : false;
    const onChangedURL = (input) => setIsChangedURL(input);

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => {
            return prevLanguage === "en" ? "id" : "en";
        });
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };
    
    function onLogout(){
        setAuthedUser(null);
        putAccessToken("");
        navigate("/");
    }

    async function onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    }

    React.useEffect(() => {
        async function fetchAuthedUser(){
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        }

        fetchAuthedUser();
    }, []);

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])

    const localeContextValue = React.useMemo(() => {
        return {
          language,
          theme,
          toggleLanguage,
          toggleTheme
        };
    }, [language, theme]);

    if (initializing) {
        return <p className="loading">{ language === "en" ? "Loading..." : "Memuat..." }</p>;
    }

    if (authedUser === null) {
        return (
            <LocaleContext.Provider value={localeContextValue}>
                <header className="header__login">
                    <NavigationsLogin/>
                </header>
                <div className='app-container'>
                    <main>
                        <Routes>
                            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </main>
                </div>
            </LocaleContext.Provider>
        )
    }

    if(authedUser !== null){
        return (
            <LocaleContext.Provider value={localeContextValue}>
                <div className="app-container">
                    <Header logout={onLogout} onChangedURL={onChangedURL} isArchived={isArchived}/>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage isChangedURL={isChangedURL} 
                                                            onChangedURL={onChangedURL}
                                                            isArchived={isArchived} />} />
                            <Route path="/note/:id" element={<DetailPage />} />
                            <Route path="/add" element={<AddPage />} />
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </main>
                </div>
            </LocaleContext.Provider>
        );
    }
}

export default App;
