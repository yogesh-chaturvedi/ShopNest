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
        const subtotal = cartItems.reduce((acc, item) => {
            return acc + (item.productPrice * item.quantity)
        }, 0)
        setSubTotal(subtotal)
    }, [cartItems])


    const BASE_URL = import.meta.env.VITE_API_URL

    // to add cart items in usestate 
    useEffect(() => {
        async function getCartData() {
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await axios({
                    method: "get",
                    url: `${BASE_URL}/api/cart`,
                    withCredentials:true
                })

                const { userCart, success, error, message } = response.data
                if (success) {
                    setCartItems(userCart)
                }
                else {
                    console.log(message)
                }
                // console.log(response.data)
            }
            catch (error) {
                console.log("there is an error", error)
            }

        }

        getCartData()

    }, [])


    const value = { cartItems, setCartItems, deliveryFee, currency, subTotal, setSubTotal }
    return (
        < CartContext.Provider value={value} >
            {props.children}
        </CartContext.Provider >
    )
}



export default CartContextProvider