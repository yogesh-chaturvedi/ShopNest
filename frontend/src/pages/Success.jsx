import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';

const Success = () => {
    const { cartItems, setCartItems } = useContext(CartContext)

    const naviagte = useNavigate()
    const hasPlacedOrder = useRef(false)

    const BASE_URL = import.meta.env.VITE_API_URL

    async function deleteCartItem() {
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/api/remove-allItem`,
                headers: {
                    Authorization: token
                }
            })
            const { userCart, message, error, success } = response.data

            if (success) {
                setCartItems(userCart)
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }


    useEffect(() => {
        async function placeOrderAfterPayment() {
            if (hasPlacedOrder.current) return;
            hasPlacedOrder.current = true;

            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const userDetails = JSON.parse(localStorage.getItem('userDetails'))
                const cartItems = JSON.parse(localStorage.getItem('cartItems'))
                const totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
                const payment = JSON.parse(localStorage.getItem('payment'))
                // it checks if all these present or not
                if (!userDetails || !cartItems || !totalPrice || !payment || !token) {
                    console.log("Missing data for order placement");
                    return;
                }

                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}/orders/save`,
                    headers: {
                        Authorization: token
                    },
                    data: { userDetails, cartItems, totalPrice, payment }
                })
                console.log(response.data)
                // "Payment successful! Order placed."
                const { success, error, message } = response.data

                if (success) {
                    toast.success(message, {
                        position: "top-center",
                        autoClose: 1500,
                        theme: "dark"
                    });

                    localStorage.removeItem("userDetails");
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("totalPrice");
                    localStorage.removeItem("payment");

                    deleteCartItem()
                    setSubTotal(0);
                }
            }
            catch (error) {
                console.log("there is an error", error)
            }
        }
        placeOrderAfterPayment()
    }, [])


    function handleNavigation() {
        naviagte('/')
    }


    return (
        <div className='flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 min-h-screen'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

            <div className="box border border-green-400 bg-white text-center p-6 rounded-2xl shadow-xl h-[200px] w-[320px]">
                <h1 className='font-bold text-2xl text-green-700'>Payment Successful!</h1>
                <p className="mt-4 text-gray-700 text-lg">Thank you for your order.</p>
                <button onClick={() => { handleNavigation() }} className='text-white text-lg font-semibold px-4 py-2 mt-6 bg-green-600 hover:bg-green-700 transition-colors duration-200 rounded-xl'>
                    Go To Home
                </button>
            </div>
        </div>

    )
}

export default Success
