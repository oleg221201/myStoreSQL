import React from "react";
import {useHistory} from 'react-router-dom'
import {useAlert} from "react-alert";
import {useCart} from "../../hooks/cart.hook";


export const OrderButtons = ({itemId}) => {
    const history = useHistory()
    const alert = useAlert()
    const {items, addItem} = useCart()


    const btnBuy =  () => {
        history.push(`/order/${itemId}`)
    }

    const addToCart = () => {
        if (items && items.includes(Number.parseInt(itemId))) {
            alert.info('This product is in the cart ')
        } else {
            addItem(Number.parseInt(itemId))
            alert.success('Product has been added to cart successfully')
        }
    }

    return (
        <div>
            <button
                style={{'backgroundColor': '#f19d31', 'color': 'white'}}
                onClick={addToCart}
            >Add to cart</button>
            <button
                style={{'backgroundColor': '#275501', 'color': 'white'}}
                onClick={btnBuy}
            >Buy now</button>
        </div>
    )
}