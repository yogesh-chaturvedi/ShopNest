import React, { useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductContext';
import DashboardAdd from './DashboardAdd';
import DashboardOrders from './DashboardOrders';
import { useNavigate } from 'react-router-dom';
import DashboardItems from './DashboardItems';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DashboardHome = () => {

    const [current, setCurrent] = useState('Add Items')
    const value = useContext(ProductContext)

    const naviagte = useNavigate()
    // function functionChange(arg) {
    //     setCurrent(arg)
    // }

    async function handleLogout() {
        try {
            const response = await axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_URL}/auth/logout`,
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                toast(message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    naviagte('/')
                }, 1000);
            }
        }
        catch (error) {
            console.error('admin logout error', error)
        }
    }

    const [showHamburger, setShowHamburger] = useState(false)
    function handleHamburger() {
        if (showHamburger === false) {
            setShowHamburger(true)
        }
        else {
            setShowHamburger(false)
        }
    }

    function handleCurrent(value) {
        setCurrent(value)
        setShowHamburger(false)
    }

    const sidebarValues = ['Add Items', 'Listed Items', 'View Orders']

    return (
        <div className='bg-black text-white'>

            <h1 className='font-bold border-b-2 border-white text-3xl h-[10vh] py-5 text-center'>Admin Pannel</h1>

            <div className=' h-[90vh] flex'>
                {/* left */}
                <div className={`left transform transition-transform duration-300 ease-out ${showHamburger === true ? ' flex' : 'hidden'} bg-black h-[90vh] md:flex fixed z-20 md:relative border-r border-white w-[190px] flex-col gap-2 `}>
                    <div className=' flex items-center justify-evenly border-b-2 border-white'>
                        <h3 className='font-bold text-2xl text-center py-2'>Overwiew</h3>
                        <span className='md:hidden px-1.5 rounded-full hover:bg-gray-800 cursor-pointer' onClick={() => { setShowHamburger(false) }}><i className="fa-solid fa-xmark text-xl"></i></span>
                    </div>
                    <ul className=' flex flex-col items-center gap-2 '>
                        {sidebarValues.map((value, index) => {
                            return (<li key={index} onClick={() => { handleCurrent(value) }} className='font-semibold cursor-pointer text-lg w-[80%] text-center py-1 rounded-xl hover:bg-gray-800'>{value}</li>)
                        })}
                    </ul>
                    <div className='logout absolute bottom-6 left-14 md:left-13 lg:left-12'>
                        <span onClick={() => handleLogout()} className='rounded-lg px-2 py-1 pb-2 cursor-pointer font-bold bg-red-700 hover:bg-red-800 '>Logout</span>
                    </div>
                </div>

                {/* right */}
                <div className="right w-full">
                    {/* addProduct  */}
                    <div className='flex gap-3 items-center'>
                        <span onClick={() => { handleHamburger() }} className='ml-2 md:hidden'> <i className="fa-solid fa-bars text-2xl cursor-pointer"></i></span>
                        <h1 className='font-bold text-2xl py-2 w-[90%] mx-auto'>{current}</h1>
                    </div>
                    {/* <span className=' md:hidden block mb-4 ml-2'></span> */}
                    {current === 'Add Items' && (<DashboardAdd />)}

                    {/* deleteProduct */}
                    {current === 'Listed Items' && (<DashboardItems />)}

                    {/* viewOrder */}
                    {current === 'View Orders' && (<DashboardOrders />)}

                </div>
            </div>

        </div >
    )
}
export default DashboardHome

