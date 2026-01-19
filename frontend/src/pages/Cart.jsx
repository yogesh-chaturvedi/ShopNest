import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {

    const { fetchUsersCart, cartItems, deliveryFee, currency, subTotal } = useContext(CartContext)
    const navigate = useNavigate()

    const BASE_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetchUsersCart()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // function to delete items from cart 
    async function handleDelete(itemId, itemSize) {
        try {
            console.log(itemId, itemSize)
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/api/removeItem`,
                data: { itemId, itemSize },
                withCredentials: true,
            })
            const { userCart, success, message, error } = response.data

            if (success) {
                fetchUsersCart()
                toast(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    // function to change the quantity of an item 
    async function changeQuantity(itemsId, itemsSize, action) {
        try {
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}/api/changeQuantity`,
                data: { itemsId, itemsSize, action },
                withCredentials: true,
            })
            const { success, message, error, userCart } = response.data
            if (success) {
                fetchUsersCart()
            }
        }
        catch (error) {
            console.log("changeQuantity error", error)
            const message = error.response.data.message
            if (error) {
                toast(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }

    }

    // function confirm 
    function handleConfirm() {
        if (cartItems?.items?.length < 1) {
            toast('Add Some Items', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            navigate('/delivery&payment')
        }
    }

    return (
        <div>

            <Navbar />
            <div className="cart w-full px-1 lg:w-[90%] mx-auto py-5">
                <div>
                    <h1 className='font-bold text-3xl'>Your Cart</h1>
                    <div className="line mt-3 border-y-2 border-black"></div>
                </div>

                {cartItems?.items?.length > 0 ? (
                    <div>
                        {/* listing items in cart */}
                        {cartItems?.items?.map((item, index) => {
                            return (<div key={index} className="item flex relative items-center justify-between gap-4 border-b-2 border-black py-3 ">
                                <div className='flex gap-4'>
                                    <img className='w-[100px] rounded-xl' src={item.product.image} alt="tshirt" />
                                    <div className='flex flex-col gap-4'>
                                        <p className="productName w-[40vw] sm:w-[40vw] md:w-[30vw] font-bold truncate">{item.product.productName}</p>
                                        <div className='flex gap-5 items-center'>
                                            <span className='productName font-semibold'><b>{currency}</b>{item.product.productPrice}</span>
                                            <span className='boxes h-6 w-6 flex items-center justify-center p-4  rounded-md bg-blue-600 text-white'>{item.selectedSize}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* increment decrement  */}
                                <div className="flex items-center gap-2 absolute bottom-2 left-28 md:static border border-gray-400 rounded-md w-fit px-2 py-1">

                                    <button onClick={() => { changeQuantity(item.product._id, item.selectedSize, 'increment') }} className=" w-6 h-6 lg:w-8 lg:h-8 text-lg font-bold flex items-center justify-center border border-gray-500 rounded hover:bg-gray-200 transition" type="button">+</button>

                                    <span className="w-6 h-6 lg:w-8 lg:h-8 text-center flex items-center justify-center font-semibold">{item.quantity}</span>

                                    <button onClick={() => { changeQuantity(item.product._id, item.selectedSize, 'decrement') }} className="w-6 h-6 lg:w-8 lg:h-8 text-lg font-bold flex items-center justify-center border border-gray-500 rounded hover:bg-gray-200 transition" type="button">-</button>

                                </div>
                                {/* delete-btn */}
                                <div><i onClick={() => handleDelete(item.product._id, item.selectedSize)} className="fa-solid fa-trash text-2xl hover:bg-gray-200 py-1 px-4 rounded-full cursor-pointer"></i></div>
                            </div>
                            )
                        })}</div>) : (<div className="text-center font-bold text-3xl py-5 mt-5">Add Some Items</div>)}



                {/* cart total */}
                <div className='flex my-16 justify-end'>
                    <div className="cart w-[500px]">
                        <h3 className='font-bold text-2xl'>CART TOTAL</h3>
                        <div className='mt-4 relative  pb-2 border-b-2 border-black'>
                            <div className='flex justify-between'>
                                <p className='font-bold'>Subtotal</p>
                                <span>{subTotal}</span>
                            </div>
                            <div className="items text-xs absolute bottom-8 right-0 font-bold ">items({cartItems?.items?.length})</div>
                        </div>
                        <div className='mt-4 pb-2 border-b-2 border-black'>
                            <div className='flex justify-between'><p className='font-bold'>Shipping Fee</p><span><b>{currency}</b>{deliveryFee}</span></div>
                        </div>
                        <div className='mt-4 pb-2 border-b-2 border-black'>
                            <div className='flex justify-between'><p className='font-bold'>Total</p><span><b>{currency}</b>{subTotal + parseInt(deliveryFee)}</span></div>
                        </div>
                        <button onClick={() => handleConfirm()} className='mt-2 h-10 rounded-xl w-[150px] bg-black text-white font-bold p-2'>Confirm</button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Cart
