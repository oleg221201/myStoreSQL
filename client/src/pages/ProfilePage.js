import React, {useCallback, useContext, useEffect, useState} from 'react'
import axios from '../API'
import {AuthContext} from "../context/AuthContext";
import {Item} from "../components/profile/Item";
import {CreateItem} from "../components/profile/CreateItem";
import {OrderView} from "../components/profile/OrederView";


export const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [itemsList, setItems] = useState(null)
    const [ordersList, setOrders] = useState(null)

    const getData = useCallback(async () => {
        const result = await axios.get('/api/profile', {
            headers: {'Authorization': `Bearer ${token}`}
        })
        setUser(result.data.user)
        setItems(result.data.itemsList)
        setOrders(result.data.ordersList)
    }, [token])

    useEffect(() => {
        getData()
    }, [getData])

    const ordersCheck = () => {
        if (ordersList.length === 0){
            return (
                <h5>There are no orders here yet</h5>
            )
        }
    }

    if (!user || !itemsList || !ordersList) return (<div>loading ...</div>)

    return (
        <div
            style={{'margin': '20px 50px'}}
        >
            <br/>
            <div className="row">
                <div className="col-4 ml-3">
                    <h3>{user.username}</h3>
                    <h5>e-mail: {user.email}</h5>
                </div>
                <div className="col-7">
                    <h4>Create item:</h4>
                    <CreateItem />
                </div>
            </div>
            <br/>
            <div className='row'>
                <div className="col-4 ml-3">
                    <h4>Items:</h4>
                    {itemsList.map(item => {
                        return <Item data={item}/>
                    })}
                </div>
                <div className="col-7">
                    <h4>Orders:</h4>
                    {ordersCheck()}
                    {ordersList.map(order => {
                        return (
                            <div>
                                <OrderView data={order} setOrders={setOrders}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}