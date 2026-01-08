import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/Assets'
import { ProductContext } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const value = useContext(ProductContext)
    // console.log(value.allProducts)
    const naviagte = useNavigate()

    function handleProduct(product) {
        naviagte(`/product/${product.productName}`, { state: product })
    }


    useEffect(() => {
        const section = document.getElementById('latestScroll');
        const autoScroll = () => {
            if (!section) return;
            if (section.scrollLeft + section.clientWidth >= section.scrollWidth - 5) {
                section.scrollTo({ left: 0, behavior: 'smooth' }); // go back to start
            } else {
                section.scrollBy({ left: 200, behavior: 'smooth' }); // scroll right
            }
        };
        const interval = setInterval(autoScroll, 3000);
        return () => clearInterval(interval); // cleanup
    }, []);

    // bestseller
    useEffect(() => {
        const section = document.getElementById('bestSeller')
        const autoScroll = () => {
            if (!section) return;
            if (section.scrollLeft + section.clientWidth >= section.scrollWidth - 5) {
                section.scrollTo({ left: 0, behavior: 'smooth' })
            }
            else {
                section.scrollBy({ left: 200, behavior: 'smooth' })
            }
        }
        const interval = setInterval(autoScroll, 3000);
        return () => clearInterval(interval)
    }, [])



    return (
        <div className='w-full'>
            {/* banner */}
            {/* object-cover aspect-[2/1] object-center sm:aspect-auto */}
            <div className=' mx-auto w-[full] lg:w-[90%] '>
                <img className='w-full object-cover aspect-[2/1] object-center sm:aspect-auto' src={assets.banner} alt="bannerImg" />
            </div>

            {/* latest collection */}
            <div className="relative latestColl mx-auto py-10 w-[full] lg:w-[90%] ">
                <h1 className='font-bold text-2xl text-center'>Latest Collection</h1>

                {/* gap-4 whitespace-nowrap overflow-x-auto */}
                <div id='latestScroll' className='p-1 collection mt-5 flex overflow-x-scroll gap-5 justify-evenly gap-y-5 scroll-smooth snap-x snap-mandatory scrollbar-hide '>
                    {value.allProducts.filter((collection, index) => collection.latestCollection === true)
                        .map((data, index) => {
                            return <div key={index} className='rounded-xl h-[250px] min-w-[170px] sm:h-[300px] sm:min-w-[230px] shadow-md cursor-pointer snap-start '>
                                <img onClick={() => handleProduct(data)} className='sm:h-[85%] h-[82%] w-full rounded-t-xl' src={data.image} alt="tshirt" />
                                <div className='ml-1'>
                                    <p className='ProductName truncate overflow-hidden whitespace-nowrap w-full '>{data.productName}</p>
                                    <p className='Productprice font-semibold'>{value.currency}{data.productPrice}</p>
                                </div>
                            </div>
                        })}

                </div>

            </div>

            {/* best seller */}
            <div className="bestSeller mx-auto py-10 w-[full] lg:w-[90%] ">
                <h1 className='font-bold text-2xl text-center'>Best Seller</h1>
                {/* scroll-smooth snap-x snap-mandatory  */}
                <div id='bestSeller' className='collection p-1 mt-5 flex overflow-x-scroll gap-5 justify-evenly gap-y-5 scrollbar-hide scroll-smooth snap-x snap-mandatory'>
                    {value.allProducts.filter((collection, index) => collection.bestSeller === true)
                        .map((data, index) => {
                            return <div key={index} className='rounded-xl h-[250px] min-w-[170px] sm:h-[300px] sm:min-w-[230px] shadow-md cursor-pointer snap-start'>
                                <img onClick={() => handleProduct(data)} className=' h-[82%] sm:h-[85%] w-full rounded-t-xl ' src={data.image} alt="itemImage" />
                                <div className='ml-1'>
                                    <p className='ProductName truncate overflow-hidden whitespace-nowrap w-full '>{data.productName}</p>
                                    <p className='Productprice font-semibold'>{value.currency}{data.productPrice}</p>
                                </div>
                            </div>
                        })}

                </div>

            </div>

            {/* policy */}
            {/* flex flex-col items-center gap-5 */}
            <div className='w-[full] lg:w-[90%]  mx-auto flex gap-5 px-2 flex-wrap justify-evenly py-10 '>

                <div className='[300px] p-5 bg-slate-200 rounded-xl text-center'>
                    <p><i className="fa-solid fa-arrow-right-arrow-left text-2xl"></i></p>
                    <p className='font-bold'>Easy Exchange Policy</p>
                    <p>We offer hassle free  exchange policy</p>
                </div>

                <div className='[300px] p-5 bg-slate-200 rounded-xl text-center'>
                    <p><i className="fa-solid fa-circle-check text-2xl"></i></p>
                    <p className='font-bold'>7 Days Return Policy</p>
                    <p>We provide 7 days free return policy </p>
                </div>

                <div className=' [300px] p-5 bg-slate-200 rounded-xl text-center'>
                    <p><i className="fa-solid fa-headphones text-2xl"></i></p>
                    <p className='font-bold'>Best Customer Support</p>
                    <p>We provide 24/7 customer support</p>
                </div>

            </div>
        </div>
    )
}

export default Hero
