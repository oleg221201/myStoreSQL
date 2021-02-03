import React from 'react'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {Menu} from "./components/navbar/Navbar";


function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!ready) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
            <BrowserRouter>
                <div>
                    <Menu />
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
