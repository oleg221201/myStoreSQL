import React, {useEffect, useState} from 'react'
import {useCart} from "../hooks/cart.hook";
import {Item} from "../components/cart/Item";
import {Button} from "react-bootstrap";


export const CartPage = () => {
    const {items, clearCart} = useCart()
    const [itemsList, setItemsList] = useState(null)

    useEffect(() => {
        setItemsList(items)
    }, [items])

    const checkCart = () => {
        if (items && items.length === 0) {
            return (<h5>There are no items</h5>)
        }
    }

    if (!items || !itemsList) return <div>loading...</div>

    return (
        <div>

            <h3>Your cart:</h3>

            {checkCart()}

            {itemsList.map(item => {
                return <Item id={item} setItems={setItemsList}/>
            })}
            <Button
                style={{'backgroundColor': '#f19d31', 'color': 'white'}}
                onClick={clearCart}
            >Clear cart</Button>
        </div>
    )
}