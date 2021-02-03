import {useCallback, useEffect, useState} from "react";

export const useCart = () => {
    const [items, setItems] = useState(null)

    const addItem = useCallback((itemId) => {
        let cart = sessionStorage.getItem('cart')
        cart = JSON.parse(cart)

        if (!cart) cart.items = [itemId]
        cart.items.unshift(itemId)

        setItems(cart.items)
        sessionStorage.clear()
        sessionStorage.setItem('cart', JSON.stringify(cart))
    }, [])

    const getItems = useCallback(() => {
        let cart = sessionStorage.getItem('cart')
        cart = JSON.parse(cart)

        if (!cart) {
            setItems([])
            const data = {items: []}
            sessionStorage.setItem('cart', JSON.stringify(data))
        }
        else {
            setItems(cart.items)
        }
    }, [])

    const deleteItem = useCallback((itemId) => {
        let cart = sessionStorage.getItem('cart')
        cart = JSON.parse(cart)

        const index = cart.items.indexOf(Number.parseInt(itemId))
        if (index > -1) cart.items.splice(index, 1)

        setItems(cart.items)

        sessionStorage.clear()
        sessionStorage.setItem('cart', JSON.stringify(cart))
        return cart
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
        sessionStorage.removeItem('cart')
    }, [])

    useEffect(() => {
        getItems()
    }, [getItems])

    return {items, addItem, getItems, deleteItem, clearCart}
}