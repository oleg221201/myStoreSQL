import {useCallback, useEffect, useState} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(null)

    const login = useCallback((token, userId) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem('currentUser', JSON.stringify({token: token, userId: userId}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('currentUser')
    }, [])

    useEffect(() => {
        let data = localStorage.getItem('currentUser')
        data = JSON.parse(data)

        if (data && data.token){
            login(data.token, data.userId)
        }

        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}