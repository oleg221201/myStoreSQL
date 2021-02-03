import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from '../API'
import {AuthContext} from "../context/AuthContext";
import {ProfilePage} from "./ProfilePage";
import {Item} from "../components/profile/Item";


export const ProfileViewPage = () => {
    const {userId} = useContext(AuthContext)
    const id = useParams().id
    const [data, setData] = useState(null)

    const getData = useCallback(async () => {
        const result = await axios.get(`/api/profile/${id}`)
        setData(result.data)
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    if (id.toString() === userId.toString()) return <ProfilePage />

    if (!data) return <div>loading...</div>

    if (data.message) {
        return <h3>Error: <h5>{data.message}</h5></h3>
    }

    return (
        <div>
            <hr/>
            <h3>{data.user.username}</h3>
            <h5>{data.user.email}</h5>
            <hr/>
            <h4>Items:</h4>
            {data.itemsList.map(item => {
                return <Item data={item}/>
            })}
        </div>
    )
}