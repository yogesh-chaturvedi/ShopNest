import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const DeliveryAndPayment = () => {
    const paymentMethods = ['Stripe', 'Cash On Delivery']
    const { cartItems, setCartItems, deliveryFee, currency, subTotal, setSubTotal } = useContext(CartContext)
    const navigate = useNavigate()
    // console.log(cartItems._id, cartItems.selectedSize)
    const [payment, setPayment] = useState(null)

    const [totalPrice, setTotalPrice] = useState(0)

const BASE_URL = import.meta.env.VITE_API_URL

    // adding the delivery fee and subtotal 
    useEffect(() => {
        setTotalPrice(subTotal + parseInt(deliveryFee))
    }, [subTotal, deliveryFee])
    console.log(totalPrice)

    const [userDetails, setUserDetails] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: ''
        }
    )

    function handleChange(e) {
        setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // to remove the cart item when order is placed
    async function removeCartItem() {
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/api/remove-allItem`,
                headers: {
                    Authorization: token
                },
            })
            const { userCart, message, error, success } = response.data

            if (success) {
                setCartItems(userCart)
            }

            console.log(response.data)
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    // to submit order and its details 
    async function handleSubmit(e) {
        e.preventDefault();

        if (!payment) {
            alert("please select payment method")
            return
        }

        const { firstName, lastName, email, street, city, state, zipCode, country, phone } = userDetails;

        if (!firstName || !lastName || !email || !street || !city || !state || !zipCode || !country || !phone) {
            alert("Please fill in all delivery details");
            return; // Stop execution if any field is empty
        }

        const orderDetails = { userDetails, cartItems, payment, totalPrice }
        const token = JSON.parse(localStorage.getItem("token"))
        // it runs when user select cash on delivery
        if (payment === 'Cash On Delivery') {
            try {
                const resopnse = await axios({
                    method: 'post',
                    url: `${BASE_URL}/orders/save`,
                    headers: {
                        Authorization: token
                    },
                    data: orderDetails
                })
                const { success, error, message } = resopnse.data
                if (success) {
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
                    setPayment(null)
                    removeCartItem()
                    setSubTotal(0)

                    // it iterates on each key of userdetails state and makes it key value an empty string again
                    Object.keys(userDetails).forEach(key => {
                        userDetails[key] = ''
                    })

                }
                // if (success) {
                //     navigate('/orders')
                // }
                // // console.log(resopnse.data)
            }
            catch (error) {
                console.log("there is an error", error)
            }
        }

        // for stripe
        if (payment === "Stripe") {
            try {

                // storing data in localstorage so that if payment is done success i can send it to backend's order route...
                localStorage.setItem("userDetails", JSON.stringify(userDetails));
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                localStorage.setItem("payment", JSON.stringify(payment));

                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}/payment/create-checkout-session`,
                    data: { cartItems }
                })
                console.log(response.data)
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
                await stripe.redirectToCheckout({ sessionId: response.data.id });
            }
            catch (error) {
                console.log("there is an error", error)
            }
            return;
        }
    }


    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Navbar />
            <div className='dilivery&Payment w-full lg:w-[90%] px-1 py-5 my-10 mx-auto flex flex-col items-center gap-5 md:flex-row md:justify-evenly lg:justify-between'>
                {/* left */}
                <div className="leftForm w-full px-2 lg:px-0 md:w-[48%]">
                    <h2 className='font-bold text-2xl'>DELIVERY INFORMATION</h2>
                    <form className='flex flex-col gap-5 w-full py-5'>
                        {/* name */}
                        <div className='flex justify-between'>
                            <input value={userDetails.firstName} onChange={handleChange} className='border-2 border-black w-[47%] py-1 px-2' type="text" name="firstName" placeholder='First Name' />
                            <input value={userDetails.lastName} onChange={handleChange} className='border-2 border-black w-[47%] py-1 px-2' type="text" name="lastName" placeholder='Last Name' />
                        </div>
                        {/* email */}
                        <input value={userDetails.email} onChange={handleChange} className='border-2 border-black w-full py-1 px-2' type="email" name="email" placeholder='Email' />
                        {/* street */}
                        <input value={userDetails.street} onChange={handleChange} className='border-2 border-black w-full py-1 px-2' type="text" name="street" placeholder='Street' />
                        {/* city&state */}
                        <div className='flex justify-between'>
                            <input value={userDetails.city} onChange={handleChange} className='border-2 border-black w-[47%] py-1 px-2' type="text" name="city" placeholder='City' />
                            <input value={userDetails.state} onChange={handleChange} className='border-2 border-black w-[47%] py-1 px-2' type="text" name="state" placeholder='State' />
                        </div>
                        {/* zipCode&country */}
                        <div className='flex justify-between'>
                            <input value={userDetails.zipCode} onChange={handleChange} className='border-2 border-black w-[47%] py-1 px-2' type="text" name="zipCode" placeholder='Zip Code' />
                            <input value={userDetails.country} onChange={handleChange} className='border-2 border-black w-[47%] py-1 px-2' type="text" name="country" placeholder='Country' />
                        </div>
                        {/* phone */}
                        <input value={userDetails.phone} onChange={handleChange} className='border-2 border-black w-full py-1 px-2' type="text" name="phone" placeholder='Phone' />
                    </form>
                </div>
                {/* right */}
                <div className="rightPayment px-2 lg:px-0 w-full sm:[80%] md:w-[48%]">
                    <h1 className='font-bold text-2xl'>CART TOTALS</h1>
                    <div>
                        <div className='mt-4 pb-2 border-b-2 border-black'>
                            <div className='flex justify-between'><p className='font-bold'>Subtotal</p><span><b>{currency}</b>{subTotal}</span></div>
                        </div>
                        <div className='mt-4 pb-2 border-b-2 border-black'>
                            <div className='flex justify-between'><p className='font-bold'>Shipping Fee</p><span><b>{currency}</b>{deliveryFee}</span></div>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex justify-between'><p className='font-bold'>Total</p><span><b>{currency}</b>{totalPrice}</span></div>
                        </div>
                    </div>

                    {/* payent gateway */}
                    <div className='mt-16'>
                        <h1 className='font-bold text-2xl'>PAYMENT METHOD</h1>
                        <div className='boxes flex mt-5 justify-evenly'>
                            {paymentMethods.map((method, index) => {
                                return (<span key={index} onClick={() => { setPayment(`${method}`) }} className='border-2 border-black h-10 w-[160px] sm:w-[170px] flex gap-2 justify-center items-center p-2'>
                                    <span className={`border-2 border-black h-3 w-3 rounded-full ${payment === method ? 'bg-blue-600' : ''}`}></span>
                                    <span className=' font-bold text-sm sm:text-base text-blue-600'>{method}</span>
                                </span>)
                            })}
                        </div>

                        <div className='flex justify-end'>
                            <button onClick={handleSubmit} type='submit' className='font-bold bg-black mt-10 text-white px-4 py-2 w-[170px]'>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default DeliveryAndPayment

