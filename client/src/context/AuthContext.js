import {createContext} from 'react'

export const AuthContext = createContext({
    token: null,
    userId: null,
    type: null,
    login: () => {},
    logout: () => {},
    isAuth: false
})