import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const naviagte = useNavigate()

    // function to handle changes of input fields 
    function handleChange(e) {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const BASE_URL = import.meta.env.VITE_API_URL


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios({
                method: "post",
                url: `${BASE_URL}/auth/login`,
                data: loginData
            })

            const { success, message, key, userName, userId, userRole, userEmail } = response.data

            localStorage.setItem("userName", JSON.stringify(userName))
            localStorage.setItem("userId", JSON.stringify(userId))
            localStorage.setItem("token", JSON.stringify(key))
            localStorage.setItem("role", JSON.stringify(userRole))
            localStorage.setItem("userEmail", JSON.stringify(userEmail))

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
                    naviagte('/')
                }, 2000);
            }
        }
        catch (error) {
            console.log("there is an error", error)
            const message = error.response.data.message;
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

            if (message.endsWith("signUp first")) {
                setTimeout(() => {
                    naviagte('/signup')
                }, 2000);
            }
        }
    }


    return (
        <div className='min-h-screen flex justify-center items-center'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <div className="login border-2 border-black w-[40vw] flex flex-col gap-5 py-5 justify-center items-center">
                <h1 className='font-bold text-2xl'>LogIn</h1>


                <form className='flex gap-3 flex-col w-[80%]' onSubmit={handleSubmit}>

                    <div className='w-full '>
                        <label className='font-bold text-2xl' htmlFor="email">Email</label>
                        <input value={loginData.email} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='email' type="text" placeholder='Enter your email' />
                    </div>

                    <div className='w-full'>
                        <label className='font-bold text-2xl' htmlFor="password">Password</label>
                        <input value={loginData.password} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='password' type="password" placeholder='Enter your password' />

                        <p className='text-blue-800 text-sm cursor-pointer' >
                            <Link to='/passwordReset'>Foget Password?</Link>
                        </p>
                    </div>

                    <div className='text-center '>
                        <button type='submit' className='px-4 text-lg  font-bold bg-blue-600 text-white rounded-2xl cursor-pointer'>Save</button>
                        <div className='mt-2'>If You are new, Then you can
                            <Link to='/signup' className='text-blue-800'>SignUp</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Login
