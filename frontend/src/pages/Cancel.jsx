import React from 'react'

const Cancel = () => {
    return (
        <div className='flex items-center justify-center bg-green-200 min-h-screen '>
            <div className="box border border-black bg-green-500 text-center p-5 rounded-2xl h-[190px] w-[300px]">
                <h1 className='font-bold text-2xl '>Payment Failed</h1>
                <p className="mt-4 text-lg">Wait, and try again later</p>
            </div>
        </div>
    )
}

export default Cancel
