import { createContext, useEffect, useState } from "react";
import axios from "axios";




export const CartContext = createContext()

const CartContextProvider = (props) => {

    const deliveryFee = '10'
    const currency = '₹'
    const [subTotal, setSubTotal] = useState(0)
    const [cartItems, setCartItems] = useState([])

    // to calculate subtotal  
    useEffect(() => {

        if (!cartItems?.items) {
            setSubTotal(0)
            return
        }

        const subtotal = cartItems?.items?.reduce((acc, item) => {
            const price = Number(item.product.productPrice) || 0
            const quantity = Number(item.quantity) || 0
            return acc + price * quantity
        }, 0)
        setSubTotal(subtotal)

    }, [cartItems])


    const BASE_URL = import.meta.env.VITE_API_URL


    async function fetchUsersCart() {
        try {
            const response = await axios({
                method: "get",
                url: `${BASE_URL}/api/fetch`,
                withCredentials: true
            })

            const { userCart, success, error, message } = response.data
            if (success) {
                setCartItems(userCart)
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }

    }

    useEffect(() => {
        fetchUsersCart()
    }, [])


    const value = { fetchUsersCart, cartItems, setCartItems, deliveryFee, currency, subTotal, setSubTotal }
    return (
        < CartContext.Provider value={value} >
            {props.children}
        </CartContext.Provider >
    )
}



export default CartContextProvider