import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../api/UserService';
import { TOAST_PROP } from '../App';

const Context = createContext();

export const CustomContext = () => useContext(Context);

export default function AuthContext({ children }) {

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        onPageRefresh();
    }, [])

    function onPageRefresh() {
        if (!localStorage.getItem("user")) {
            setIsAuthenticated(false)
            setUser(null);
        } else {
            setIsAuthenticated(true);
            setUser(JSON.parse(localStorage.getItem("user")))
            navigate(pathname)
        }
    }

    function login(userData) {

        toast.promise(loginUser(userData), {
            pending: "Logging in...",
            success: "Logged In Successfully!!",
        }, TOAST_PROP)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data))
                setIsAuthenticated(true);
                setUser(JSON.parse(localStorage.getItem("user")))
                navigate("/");
            }).catch(err => {
                console.log(err)
                toast.error(err.response.data.message, TOAST_PROP)
            })
    }

    function logout() {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        navigate("/")
        toast.success("Logged out Successfully!!", { position: "top-center" })
    }

    return (
        <Context.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </Context.Provider>
    )
}