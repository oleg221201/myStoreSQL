import {useCallback, useEffect, useState} from "react";

export const useUserInfo = () => {
    const [info, setInfo] = useState({name: '', email: '', city: ''})

    const addInfo = useCallback((name, email, city) => {
        let userInfo = localStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)
        if (userInfo) {
            localStorage.removeItem('userInfo')
        }
        userInfo = {name, email, city}
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }, [])

    const getInfo = useCallback(() => {
        let userInfo = localStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)

        if (userInfo) setInfo(userInfo)
    }, [])

    const deleteInfo = useCallback(() => {
        localStorage.removeItem('userInfo')
        setInfo({name: '', email: '', city: ''})
    }, [])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    return {info, addInfo, getInfo, deleteInfo}
}