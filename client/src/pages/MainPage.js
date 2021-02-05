import React, {useCallback, useEffect, useState} from 'react'
import axios from  '../API'
import {Item} from "../components/mainPage/Item";
import {Search} from "../components/mainPage/Search";
import {Filter} from "../components/mainPage/Filter";


export const MainPage = () => {
    const [items, setItems] = useState(null)

    const getData = useCallback(async () => {
        const data = await axios.get('/api/item/all')
        setItems(data.data.items)
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    const getItems = () => {
        return items
    }

    const ifEmpty = () => {
        if (items.length === 0)
            return <h3>Sorry, but now there are no items here. You can add first item in your profile</h3>
    }

    if (!items) return <div>loading...</div>

    return (
        <div
            style={{'margin': '20px 50px'}}
        >
            <div className="row">
                <div className="col-6"
                     style={{'borderRight': '1px solid black', 'padding': '10px'}}
                >
                    <Search setItems={setItems}/>
                </div>
                <div className="col-6">
                    <Filter setItems={setItems} getItems={getItems}/>
                </div>
            </div>
            <br/>
            {ifEmpty()}
            {items.map(item => {
                return <Item data={item}/>
            })}
        </div>
    )
}