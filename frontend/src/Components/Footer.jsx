import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full '>
      <div className='footer mx-auto w-full px-1 lg:w-[90%] py-10 flex flex-col lg:flex-row lg:justify-between '>

        <div className="left w-full lg:w-[40%] flex flex-col gap-5">
          {/* logo */}
          <div className="logo font-extrabold text-2xl w-32">ShopNest</div>
          <p>ShopNest offers quality products at great prices. Enjoy fast delivery, secure payments, and 24/7 support. Join thousands of happy customers shopping with confidence and ease every day.</p>
        </div>

        <div className="right w-full flex justify-evenly mt-5 lg:w-[40%] lg:flex lg:justify-between">

          <div className="left w-[110px] lg:w-[40%]">
            <h4 className='font-bold'>Company</h4>
            <ul className='mt-5'>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/about'>About Us</NavLink></li>
              <li><NavLink to='/'>Delivery</NavLink></li>
              <li><NavLink to='/'>Privacy policy</NavLink></li>
            </ul>
          </div>

          <div className="right w-[200px] lg:w-[40%] ">
            <h4 className='font-bold'>GET IN TOUCH</h4>
            <p className='mt-5'>(+91)995366xxxx</p>
            <p className=' break-all'>ShopNest@gmail.com</p>
          </div>
        </div>
      </div>

      <div className=' mt-6 mx-auto w-[90%] '>
        {/* line */}
        <div className='w-full border-2 border-black mx-auto'></div>
        <p className='text-center my-2'>Copyright 2025 © YogeshChaturvedi.dev - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
