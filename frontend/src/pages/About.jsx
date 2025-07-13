import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { assets } from '../assets/Assets'

function About() {
  return (
    <div>
      <Navbar />
      <div className='w-full'>
        {/* top */}
        <div className="aboutUs w-full lg:w-[90%] mx-auto">
          <h1 className='font-bold text-2xl text-center py-5'>About Us</h1>
          {/* img and text */}
          <div className='flex flex-col lg:flex-row gap-3 items-center justify-between'>
            <img className=' px-1 lg:w-[45%] rounded-xl' src={assets.cloths} alt="cloths" />

            <div className=' w-full px-1 lg:w-[45%] flex flex-col gap-5 justify-center'>
              <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>

              <p> Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>

              <h2 className='font-bold'>Our Mission</h2>
              <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond</p>
            </div>
          </div>
        </div>

        {/* why choose us */}
        <div className=' w-full lg:w-[90%] mx-auto flex flex-col gap-5   py-10 '>

          <h1 className='font-bold text-2xl text-center py-5'>Why Choose Us</h1>
          <div className='flex flex-wrap items-center gap-3 justify-evenly '>
            <div className='w-[300px] p-5 bg-slate-200 rounded-xl text-center'>
              <p className='font-bold'>Quality Assurance:</p>
              <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
            </div>

            <div className='w-[300px] p-5 bg-slate-200 rounded-xl text-center'>
              <p className='font-bold'>Convenience: </p>
              <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
            </div>

            <div className='w-[300px] p-5 bg-slate-200 rounded-xl text-center'>
              <p className='font-bold'>Exceptional Customer Service:</p>
              <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
