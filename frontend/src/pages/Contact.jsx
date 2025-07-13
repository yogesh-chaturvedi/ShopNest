import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { assets } from '../assets/Assets'

function Contact() {
  return (
    <div>
      <Navbar />
      <div className='w-full'>
        <div className="contact w-full lg:w-[90%] mx-auto text-center py-5">
          <div className='font-bold text-2xl'>Contact Us</div>

          <div className="mt-5 flex flex-col text-center sm:flex-row gap-6 mx-auto items-center justify-center ">
            <img className=' w-[280px] rounded-xl sm:h-[350px] sm:w-[400px]' src={assets.contactImg} alt="contact-image" />

            <div className='info px-1 flex justify-center flex-col gap-5'>
              <div className='text-start'>
                <p className='font-bold'>OUR STORE</p>
                <p>54709 Willms Station Suite 350, Washington, USA</p>
                <p>Tel: (415) 555‑0132</p>
                <p>Email:shopnest@gmail.com</p>
              </div>
              <div className='text-start'>
                <p className='font-bold'>CAREERS AT FOROVER</p>
                <p>Learn more about our teams and job openings.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
