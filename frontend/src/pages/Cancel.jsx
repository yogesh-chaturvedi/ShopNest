import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
    let naviagte = useNavigate()

    function handleNavigation() {
        naviagte('/')
    }


    return (
        <div className='flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 min-h-screen'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

            <div className="box border border-green-400 bg-white text-center p-6 rounded-2xl shadow-xl h-[200px] w-[320px]">
                <h1 className='font-bold text-2xl text-green-700'>Payment Failed!</h1>
                <p className="mt-4 text-gray-700 text-lg">Try Again Later</p>
                <button onClick={() => { handleNavigation() }} className='text-white text-lg font-semibold px-4 py-2 mt-6 bg-green-600 hover:bg-green-700 transition-colors duration-200 rounded-xl'>
                    Go To Home
                </button>
            </div>
        </div>
    )
}

export default Cancel
