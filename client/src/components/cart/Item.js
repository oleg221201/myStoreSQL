import React, {useCallback, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "../../API";
import {useCart} from "../../hooks/cart.hook";


export const Item = ({id, setItems}) => {
    const history = useHistory()
    const [item, setItem] = useState(null)
    const {deleteItem} = useCart()

    const getData = useCallback(async () => {
        const response = await axios.get(`/api/item/${id}`)
        setItem(response.data.item)
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    const del = () => {
        const res = deleteItem(id)
        setItems(res.items)
    }

    const btnBuy =  () => {
        history.push(`/order/${id}`)
    }

    if (!item) return (<div>loading...</div>)

    return (
        <div className='row'>
            <div className="col-2"
                 style={{'marginLeft': '30px'}}
            >
                <Link
                    to={`/item/${id}`}
                    style={{'fontSize': '25pt'}}
                >{item.item_name}</Link>
            </div>
            <div className='col-3'>
                <div className="row">
                    <div className="col-5">
                        <button
                            style={{'backgroundColor': '#275501', 'color': 'white'}}
                            onClick={btnBuy}
                        >Buy now</button>
                    </div>
                    <div className="col-6">
                        <button
                            style={{'backgroundColor': '#ff2222', 'color': 'white'}}
                            onClick={del}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}