import React, {useCallback, useContext, useEffect, useState} from "react";
import axios from '../../API'
import {AuthContext} from "../../context/AuthContext";


export const OrderView = ({data, setOrders}) => {
    const [itemName, setName] = useState(null)
    const {token} = useContext(AuthContext)

    const getData = useCallback(async () => {
        const item = await axios.get(`/api/item/${data.itemid}`)
        setName(item.data.item.item_name)
    }, [data.itemid])

    useEffect(() => {
        getData()
    }, [getData])

    const deleteOrder = useCallback(async () => {
        const newOrders = await axios.delete(`/api/item/order/${data.id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        setOrders(newOrders.data.ordersList)
    }, [data.id, token,setOrders])

    if (!itemName) return (<div>loading...</div>)

    return (
        <div>
            <h5>- {data.clientName} ({data.clientEmail}, {data.clientCity}), item: {itemName}, count: {data.count}</h5>
            <button
                style={{'backgroundColor': '#ff2222', 'color': 'white'}}
                onClick={deleteOrder}
            >Delete
            </button>
        </div>
    )
}