import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from '../API'
import {useAlert} from 'react-alert'
import {AuthContext} from "../context/AuthContext";


export const EditItemPage = () => {
    const history = useHistory()
    const alert = useAlert()
    const {userId} = useContext(AuthContext)
    const id = useParams().id
    const [item, setItem] = useState(null)
    const [data, setData] = useState({item_name: "", price: 0, size: 0, city: ""})

    const getData = useCallback(async () => {
        const data = await axios.get(`/api/item/${id}`)
        setItem(data.data.item)
        setData(data.data.item)
    },[id])

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const editItem = useCallback(async () => {
        console.log(data)
        const message = await axios.put(`/api/item/${id}`, {...data})
        alert.success(message.data.message)
        history.push(`/item/${id}`)
    }, [alert, history, id, data])

    useEffect(() => {
        getData()
    }, [getData])

    if (!item) return <div>loading...</div>

    if (userId !== item.userid) {
        return (<div>You are not owner of this product</div>)
    }

    return (
        <div>
            <h3>Edit item</h3>
            <div>
                Item name:
                <input
                    type="text"
                    name='item_name'
                    defaultValue={item.item_name}
                    onChange={changeHandler}
                />
            </div>
            <div>
                Item price:
                <input
                    type="number"
                    name='price'
                    defaultValue={item.price}
                    onChange={changeHandler}
                />
            </div>
            <div>
                Item size:
                <input
                    type="number"
                    name='size'
                    defaultValue={item.size}
                    onChange={changeHandler}
                />
            </div>
            <div>
                City:
                <input
                    type="text"
                    name='city'
                    defaultValue={item.city}
                    onChange={changeHandler}
                />
            </div>
            <button onClick={editItem}>Edit</button>
        </div>
    )
}