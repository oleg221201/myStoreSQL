import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from '../API'
import {AuthContext} from "../context/AuthContext";
import {ReductionButtons} from "../components/item/ReductionButtons";
import {OrderButtons} from "../components/item/OrderButtons";


export const ItemViewPage = () => {
    const {userId} = useContext(AuthContext)
    const id = useParams().id
    const [item, setItem] = useState(null)

    const getData = useCallback(async () => {
        const data = await axios.get(`/api/item/${id}`)
        setItem(data.data.item)
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    const checkBtn = () => {
        if (userId === item.userid) {
            return (<ReductionButtons itemId={id}/>)
        }
        else {
            return (<OrderButtons itemId={id}/>)
        }
    }

    if (!item) return (<div>loading...</div>)

    return (
        <div>
            <hr/>
            <h3>{item.item_name}</h3>
            <Link to={`/profile/${item.userid}`}>seller profile</Link>
            <hr/>
            <h4>Product data:</h4>
            <h5>Price: {item.price} <span>&#8372;</span></h5>
            <h5>Size: {item.size}</h5>
            <h5>City where is the product: {item.city}</h5>
            <p>{item.updatedAt.substring(11, 16)} {item.updatedAt.substring(0, 10)}</p>
            <hr/>
            {checkBtn()}
        </div>
    )
}