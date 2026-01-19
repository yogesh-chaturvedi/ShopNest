import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';

const Success = () => {

    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const navigate = useNavigate()
    const hasVerified = useRef(false)

    const BASE_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (!sessionId || hasVerified.current) return
        hasVerified.current = true

        async function verifyPayment() {
            try {
                const res = await axios.post(
                    `${BASE_URL}/orders/verify-payment`,
                    { sessionId },
                    { withCredentials: true }
                )

                if (res.data.success) {
                    toast.success('Order placed successfully!')
                } else {
                    toast.error('Payment verification failed')
                }
            } catch (err) {
                console.error("VERIFY PAYMENT ERROR:", err.response?.data || err.message)
                toast.error('Something went wrong')
            }
        }

        verifyPayment()
    }, [sessionId])


    return (
        <div className='flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 min-h-screen'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

            <div className="box border border-green-400 bg-white text-center p-6 rounded-2xl shadow-xl h-[200px] w-[320px]">
                <h1 className='font-bold text-2xl text-green-700'>Payment Successful!</h1>
                <p className="mt-4 text-gray-700 text-lg">Thank you for your order.</p>
                <button onClick={() => navigate('/')} className='text-white text-lg font-semibold px-4 py-2 mt-6 bg-green-600 hover:bg-green-700 transition-colors duration-200 rounded-xl'>
                    Go To Home
                </button>
            </div>
        </div>

    )
}

export default Success
