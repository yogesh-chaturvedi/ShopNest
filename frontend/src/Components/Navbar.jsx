import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router";
import { CartContext } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';

function Navbar() {
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    const email = JSON.parse(localStorage.getItem("userEmail"))
    const name = JSON.parse(localStorage.getItem("userName"))
    const [showProfile, setShowProfile] = useState(false)
    const { cartItems, setCartItems } = useContext(CartContext)
    const [cartVisibility, setCartVisibility] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [clear, setClear] = useState(false)
    const [searchedText, setSearchedText] = useState('')
    const inputRef = useRef()
    const location = useLocation()
    const { allProducts, setAllProducts } = useContext(ProductContext)
    const [sidebar, setSidebar] = useState(false)

    function handleLogin() {
        navigate('/login')
    }
    function handleLogOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        localStorage.removeItem("role")
        localStorage.removeItem("userEmail")
        setCartVisibility(false)
        setShowProfile(false)
        navigate('/')
        toast('LogOut Successfull', {
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
    function usersProfile() {
        // setShow(false)
        if (showProfile === false) {
            setShowProfile(true)
        }
        else {
            setShowProfile(false)
        }
    }
    function handleSearch() {
        if (location.pathname.includes("collection")) {
            if (showSearch === false) {
                setShowSearch(true)
            }
            else {
                setShowSearch(false)
            }
        }
        else {
            navigate('/collection', { state: { showTost: true } })
        }
    }
    function handleClear() {
        setSearchedText('')
        setClear(false)
    }
    function handelChange(e) {
        setSearchedText(e.target.value)
        if (showSearch === true && e.target.value.trim().length > 0) {
            setClear(true)
        }
        else if (showSearch === true && e.target.value.trim().length === 0) {
            setClear(false)
        }
    }

    const BASE_URL = import.meta.env.VITE_API_URL

    // to filter acc to the search text
    useEffect(() => {
        if (location.pathname.includes("collection")) {
            async function getSerchedItem() {
                try {
                    const response = await axios({
                        method: 'get',
                        url: `${BASE_URL}/search/products/?query=${searchedText}`,
                    })
                    const { message, success, searchedProduct, error } = response.data
                    if (success) {
                        setAllProducts(searchedProduct)
                    }
                    console.log(response.data)
                }
                catch (error) {
                    console.log("there is an error", error)
                }
            }
            getSerchedItem()
        }
    }, [searchedText], location.pathname)

    useEffect(() => {
        token ? setCartVisibility(true) : setCartVisibility(false)
    }, [])

    useEffect(() => {
        function handleVisibility() {
            if (cartItems.length >= 1) {
                setCartVisibility(true)
            }
            else {
                setCartVisibility(false)
            }
        }

        handleVisibility()

    }, [cartItems])

    function handleSideBar() {
        if (sidebar === false) {
            setSidebar(true)
        }
        else {
            setSidebar(false)
        }
    }
    console.log(sidebar)

    return (
        <div className='w-full relative'>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            {/* desktop */}
            <nav className='flex justify-between mx-auto w-full lg:w-[90%] py-4 '>
                {/* logo */}
                <div className="logo font-extrabold mr-2 lg:mr-10 text-lg sm:text-2xl lg:w-32">ShopNest</div>

                {/* tabs */}
                <ul className='hidden lg:flex px-5 gap-10 font-semibold items-center'>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                    <li><NavLink to="/collection" className={({ isActive }) => isActive ? "active" : ""}>Collection</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink></li>
                </ul>

                {/* buttons */}
                <div className='flex justify-evenly gap-3 lg:gap-5 items-center'>
                    {/* search feature */}
                    <span className='searchBtn relative w-full sm:w-[60%] lg:w-[20vw] flex gap-2 items-center'>
                        {/* inputField */}

                        <input ref={inputRef} onChange={handelChange} className={`searchInput outline-none h-7 w-full border-2 border-black font-semibold px-2 py-1 rounded-3xl ${showSearch ? 'opacity-100 visible' : 'opacity-0 invisible'} sm:w-[90%] lg:w-[19vw]`} type="text" value={searchedText} placeholder='Search Here' />

                        {/* cross icon */}
                        <span className={`clearField absolute right-10 ${clear ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => { handleClear() }}><i className='fa-solid fa-xmark cursor-pointer'></i></span>

                        {/* serach icon */}
                        <span onClick={() => { handleSearch() }}><i className='fa-solid fa-magnifying-glass text-xl cursor-pointer'></i></span>
                    </span>

                    {token ? (<span className='relative'>
                        <i onClick={() => { usersProfile() }} className="fa-solid fa-user text-xl cursor-pointer"></i>
                        {showProfile && (<div className="userProfile absolute right-1 bg-[#1e1e2f] z-50 text-white p-4 rounded-xl shadow-lg w-72">
                            <div className='flex justify-between items-center'>
                                <p className="text-lg font-bold">{name}</p>
                                <span onClick={() => { setShowProfile(false) }}><i className="fa-solid fa-xmark cursor-pointer"></i></span>
                            </div>
                            <p className="text-sm text-gray-400">{email}</p>
                            <p className="text-xs text-green-400 font-semibold">Online</p>
                            <button onClick={() => { navigate('/orders') }} className='font-semibold px-2 mt-2 bg-red-500 hover:bg-red-600 rounded-md cursor-pointer'>My Order</button>
                            <button onClick={() => { handleLogOut() }} className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 rounded-md">Logout</button>
                        </div>)}
                    </span>) : (<div onClick={() => { handleLogin() }} className='font-semibold cursor-pointer py-0.5 px-2 rounded-md bg-blue-600 text-white '>Login</div>)}

                    <span className='bag relative'>
                        <Link to='/cart'><i className="fa-solid fa-bag-shopping cursor-pointer text-xl"></i></Link>
                        {cartVisibility && (<span className='itemCount min-h-5 min-w-5 flex items-center justify-center bg-red-600 text-sm text-white font-semibold rounded-full absolute left-2 top-3 d'>{cartItems.length}</span>)}
                    </span>

                    {/* for mobile screen */}
                    <span className='hamburger lg:hidden flex mr-1  '>
                        <i onClick={handleSideBar} className="fa-solid fa-bars text-2xl ml-1"></i>
                    </span>

                </div>
            </nav>

            {/* for mobile */}
            {sidebar && (<div className={`menu h-[100vh] absolute right-0 top-0 bg-slate-300 w-[150px] lg:w-[200px] z-50 border-l border-black `}>
                <div className='flex gap-3 items-center'>
                    <span><i onClick={() => setSidebar(false)} className="fa-solid fa-xmark text-2xl pt-1 ml-1"></i></span>
                    <p className='font-bold text-2xl'>Menu</p>
                </div>
                <p className='line w-full h-0.5 border bg-black rounded-2xl border-black'></p>

                <div className='navigators font-bold flex flex-col gap-2 mt-2 px-4'>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'underline' : ""}>Home</NavLink>
                    <NavLink to='/collection' className={({ isActive }) => isActive ? 'underline' : ""}>Collection</NavLink>
                    <NavLink to='/about' className={({ isActive }) => isActive ? 'underline' : ""}>About</NavLink>
                    <NavLink to='/contact' className={({ isActive }) => isActive ? 'underline' : ""}>Contact</NavLink>
                </div>
            </div>)}
        </div>

    )
}
export default Navbar
