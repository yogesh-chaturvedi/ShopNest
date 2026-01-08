import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { CartContext } from '../context/CartContext'
import { OrderContext } from '../context/OrdersContext'
import { ToastContainer, toast } from 'react-toastify';

const Orders = () => {

    const { currency } = useContext(CartContext)
    const { orders, setOrders } = useContext(OrderContext)

    return (
        <div>
            <Navbar />
            <div className="orders w-[90%] mx-auto py-5">
                {/* Outer map: Iterate over each order object */}
                {[...orders].sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((order, orderIndex) => {
                        return (
                            <div key={orderIndex} className="item flex flex-col relative gap-4 border-b-2 border-gray-300 py-3 mb-4">
                                {/* Display Order ID and Payment */}
                                <h3 className="text-xl font-bold text-gray-800">Order ID: {order._id}</h3>
                                <p className="text-md text-gray-600">Payment: {order.payment}</p>

                                {/* This div will contain ALL products for the current order, making them stack vertically */}
                                <div className="flex flex-col gap-4 w-full">
                                    {/* Inner map: Iterate over the 'cartProducts' array within each order */}
                                    {order.cartProducts && order.cartProducts.length > 0 ? (
                                        order.cartProducts.map((product, productIndex) => {
                                            return (
                                                <div key={productIndex} className='gap-4 items-center border border-gray-200 rounded-lg p-3'>
                                                    <img className='w-[100px] h-auto object-cover rounded-md' src={product.image} alt={product.productName} />
                                                    <div className='flex flex-col gap-2 flex-grow'> {/* flex-grow to take available space */}
                                                        <p className='productName font-bold text-lg'>{product.productName || 'Product Name'}</p>
                                                        <div className='flex gap-3 items-center text-sm'>
                                                            <span className='productprice font-semibold'><b>{currency}</b>{product.productPrice}</span>
                                                            <span className='boxes border border-gray-300 rounded px-2 py-0.5 text-gray-600'>Size: {product.selectedSize}</span>
                                                        </div>
                                                        <p className='text-gray-700'>Quantity: {product.quantity || 1}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-gray-500 italic text-center p-4">No products in this order.</p>
                                    )}
                                </div>

                                {/* Order status and Track Order button, now neatly placed at the bottom, full width */}
                                <div className="flex justify-between items-center w-full mt-2 pt-2 border-t border-gray-200">
                                    {/* Order status */}
                                    <div className="flex items-center gap-2 border border-gray-400 rounded-md w-fit px-2 py-1 text-sm bg-gray-50">
                                        <span className={`h-2.5 w-2.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                        <span>{order.status || 'Status N/A'}</span>
                                    </div>
                                    {/* Track orders */}
                                    <div className='border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-200 py-1 px-3 rounded-xl cursor-pointer text-sm font-medium'>
                                        Track Order
                                    </div>
                                </div>


                            </div>
                        );
                    })}
            </div>
            <Footer />
        </div>
    )
}

export default Orders
