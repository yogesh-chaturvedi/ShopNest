import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import Footer from '../Components/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';

const Product = () => {

    const navigate = useNavigate()
    const value = useContext(ProductContext)
    const { cartItems, setCartItems } = useContext(CartContext)

    const [selectedSize, setSelectedSize] = useState(null)

    // console.log(selectedSize)


    const BASE_URL = import.meta.env.VITE_API_URL

    // to add items in cart 
    async function addToCart(itemToAdd) {

        try {
            const token = JSON.parse(localStorage.getItem("token"))
            // to ensure that user do not add product without selecting its size;
            if (selectedSize === null) {
                toast('Please Select Size', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }

            const newItem = { ...itemToAdd, selectedSize, quantity: 1 }
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/api/cart`,
                headers: {
                    Authorization: token
                },
                data: newItem
            })
            const { message, success, userCart, error } = response.data
            setCartItems(userCart)
            // if (success) {
            //     toast(message, {
            //         position: "top-center",
            //         autoClose: 2000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "dark",
            //     });
            // }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    // for related products
    function handleProduct(product) {
        navigate(`/product/${product.productName}`, { state: product })
    }

    const location = useLocation()
    const { productName, size, image, _id, subImage1, subImage2, subImage3, subImage4, productPrice, category, description } = location.state || {}

    const [mainImg, setMainImg] = useState(location.state.image)

    useEffect(() => {
        if (image) {
            setMainImg(image)
        }
    }, [image])

    function handleChangeImg(newImg) {
        setMainImg(newImg)
    }

    // to scroll at top every re-render
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.state])

    if (!location.state) {
        return "there is no product to show you"
    }

    // console.log(_id)
    return (
        <div className='w-full'>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Navbar />

            <div className="productPage py-5 px-1 w-full lg:w-[90%] mx-auto">
                {/* product */}
                <div className='flex flex-col sm:flex-row gap-5 p-1'>
                    {/* left */}
                    <div className="left  w-full lg:w-[500px] sm:w-[40%] flex flex-col-reverse lg:flex-row gap-4 lg:gap-3">

                        {/* subImages */}
                        <span className='flex flex-row flex-wrap justify-center lg:justify-start lg:flex-col gap-2'>
                            <img onClick={() => handleChangeImg(subImage1)} className='block h-[100px] w-[80px] lg:w-[110px] ' src={subImage1} alt="tshirt" />
                            <img onClick={() => handleChangeImg(subImage2)} className='block h-[100px] w-[80px] lg:w-[110px] ' src={subImage2} alt="tshirt" />
                            <img onClick={() => handleChangeImg(subImage3)} className='block h-[100px] w-[80px] lg:w-[110px] ' src={subImage3} alt="tshirt" />
                            <img onClick={() => handleChangeImg(subImage4)} className='block h-[100px] w-[80px] lg:w-[110px] ' src={subImage4} alt="tshirt" />
                        </span>
                        <img className=' w-full lg:w-[80%] h-[300px] lg:h-[426px] object-contain ' src={mainImg} alt="tshirt" />
                    </div>

                    {/*right*/}
                    <div className="right w-full sm:w-[60%] lg:w-[50%] flex flex-col gap-4 p-4">

                        <div className='flex flex-col gap-2'>
                            <h1 className='font-bold text-2xl'>{productName}</h1>
                            <div className="stars flex gap-1 text-yellow-500 text-lg">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                            </div>
                        </div>

                        {/* price */}
                        <div className="productPrice font-bold text-2xl">{value.currency}{productPrice}</div>

                        {/* DESCRIPTION */}
                        <div className="description truncate overflow-x-hidden text-gray-700">{description}</div>

                        {/* size  */}
                        <div className="size flex flex-col gap-3">
                            <h3 className='font-bold'>Select Size</h3>
                            <div className='flex flex-wrap gap-3'>
                                {Object.entries(size)
                                    .filter(([sizeKey, isAvailable]) => isAvailable)
                                    .map(([sizeKey]) => (
                                        <span key={sizeKey} onClick={() => setSelectedSize(sizeKey)} className={`px-1.5 flex items-center justify-center rounded-lg bg-gray-200 cursor-pointer font-semibold
                ${selectedSize === sizeKey ? 'border-2 border-blue-600' : 'border border-gray-300'}`}>{sizeKey.toUpperCase()}</span>))}
                            </div>
                        </div>

                        {/*  add to cart btn */}
                        <button type='submit' onClick={() => addToCart(location.state)} className='mt-2 w-[150px] bg-black text-white font-bold p-2 rounded hover:bg-gray-900 transition'>ADD TO CART</button>

                        {/*policies */}
                        <div className='flex flex-col gap-3 mt-4 text-sm text-gray-600'>
                            <div className="line w-[70%] border-t-2 border-black"></div>
                            <div>
                                <p>✔ 100% Original product</p>
                                <p>✔ Cash on delivery available</p>
                                <p>✔ Easy return & exchange within 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* related products */}
                <div className="relatedProducts mx-auto mt-10 py-10 w-full lg:w-[90%] ">
                    <h1 className='font-bold text-2xl text-center'>Related Products</h1>
                    <div className='collection mt-5 flex overflow-x-scroll scrollbar-hide gap-4 justify-evenly gap-y-5'>
                        {value.allProducts.filter((collection) => collection.category === category)
                            .map((data, index) => {
                                return <div key={index} className='min-h-[300px] min-w-[200px] sm:h-[300px] sm:min-w-[230px] shadow-xl cursor-pointer '>
                                    <img onClick={() => handleProduct(data)} className='h-[85%] w-full rounded-t-xl ' src={data.image} alt="tshirt" />
                                    <div className='pl-1'>
                                        <p className='ProductName truncate overflow-hidden whitespace-nowrap w-full '>{data.productName}</p>
                                        <p className='Productprice font-semibold'>{value.currency}{data.productPrice}</p>
                                    </div>
                                </div>
                            })}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Product
