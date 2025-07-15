import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const PasswordReset = () => {

    const navigate = useNavigate();
    const [restData, setRestData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        setRestData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    // console.log(restData)

    const BASE_URL = import.meta.env.VITE_API_URL
    
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/password/reset`,
                data: restData
            })
            const { message, error, success } = response.data
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
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        }
        catch (error) {
            console.log("there is an error", error)

            const message = error.response.data.message
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

    return (
        <div className='min-h-screen flex justify-center bg-slate-200 items-center'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <div className="login border-2 border-slate-300 rounded-xl shadow-xl bg-slate-100 w-[90vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] flex flex-col gap-5 py-5 justify-center items-center">
                <h1 className='font-bold text-2xl underline'>Reset Password</h1>


                <form className='flex gap-3 flex-col w-[80%]' onSubmit={handleSubmit}>
                    {/* email */}
                    <div className='w-full '>
                        <label className='font-bold text-2xl' htmlFor="email">Email</label>
                        <input value={restData.email} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='email' type="text" placeholder='Enter your email' />
                    </div>
                    {/* password */}
                    <div className='w-full'>
                        <label className='font-bold text-2xl' htmlFor="password">New Password</label>
                        <input value={restData.password} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='password' type="password" placeholder='Enter your password' />
                        {/* <p className='text-blue-800 text-sm cursor-pointer'>Foget Password?</p> */}
                    </div>

                    <div className='text-center '>
                        <button type='submit' className='px-4 text-lg  font-bold bg-blue-600 text-white rounded-2xl cursor-pointer'>Save</button>
                        <div className='mt-2'>Want to <Link to='/login' className='text-blue-800'>Login</Link></div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default PasswordReset
