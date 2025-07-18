import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { assets } from '../../assets/Assets'
import { OrderContext } from '../../context/OrdersContext'
import { CartContext } from '../../context/CartContext'
import axios from 'axios'

const DashboardOrders = () => {

  const [activated, setActivated] = useState(null)
  const [trackStatus, setTrackStatus] = useState('')
  const { orders, setOrders } = useContext(OrderContext)
  const { subTotal, setSubTotal, deliveryFee, currency } = useContext(CartContext)
  const orderStatus = ['Shipped', 'Out Of Delivery', 'Delivered']
  const BASE_URL = import.meta.env.VITE_API_URL;

  // to toggle activated index 
  function toggleBtn(index) {
    if (activated === index) {
      setActivated(null)
    }
    else {
      setActivated(index)
    }
  }

  async function updateStatus(orderId, dropdownValue) {
    try {
      const token = JSON.parse(localStorage.getItem("token"))

      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/orders/update-Status`,
        headers: {
          Authorization: token
        },
        data: { orderId, dropdownValue }
      })
      const { orders, success, error, message } = response.data
      // console.log(orders)
      if (success) {
        setOrders(orders)
      }
      setActivated(null)

    } catch (error) {
      console.log("there is  an error", error)
    }
  }

  return (

    <div className='border-t-2 border-white'>
      <div className="max-h-[83vh] overflow-y-auto py-8 flex flex-col gap-3 scrollbar-hide">
        {[...orders].sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((order, index) => (
            <div key={index} className={`orderBox border-2 border-gray-700 m-1 p-4 flex flex-col lg:flex-row justify-around gap-4 w-[95%] mx-auto rounded-xl ${order.status === 'Delivered' ? 'bg-gray-500 line-through' : ""}`}>
              {/* Icon */}
              <span className="icon self-start">
                <i className="fa-solid fa-box border border-gray-700  text-3xl rounded-md sm:text-4xl p-1"></i>
              </span>

              {/* Product + User Details */}
              <div className="w-full lg:w-1/2 border border-gray-700 p-2 rounded">
                {order.cartProducts.map((product, index) => (
                  <div key={index} className="products detail text-sm sm:text-base">
                    <p>
                      {product.productName}{" "}
                      <span>| Quantity: {product.quantity} |</span>{" "}
                      <span>Size: {product.selectedSize}</span>
                    </p>
                  </div>
                ))}

                <div className="userDetails border-t border-gray-700 mt-2 pt-2 text-sm sm:text-base">
                  <p className="font-bold">
                    {order.userDetails.firstName} {order.userDetails.lastName}
                  </p>
                  <p>{order.userDetails.street}</p>
                  <p>
                    <span className="city">{order.userDetails.city}</span>,{" "}
                    <span>{order.userDetails.country}</span>,{" "}
                    <span>{order.userDetails.zipCode}</span>
                  </p>
                  <p>{order.userDetails.phone}</p>
                </div>
              </div>

              {/* Order Info */}
              <div className="flex flex-col border border-gray-700 p-2 rounded text-sm sm:text-base min-w-[180px]">
                <p className="font-bold">Items: {order.cartProducts.length}</p>
                <p>Method: {order.payment === "Cash On Delivery" ? "COD" : "Stripe"}</p>
                <p>Payment: {order.payment === "Cash On Delivery" ? "Pending" : "Done"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="mt-2 pt-2 border-t border-gray-700 font-semibold">
                  Total: ₹
                  {order.cartProducts.reduce(
                    (acc, product) => acc + product.productPrice * product.quantity,
                    0
                  ) + parseInt(deliveryFee)}
                </p>
              </div>

              {/* Status Dropdown */}
              <div className="relative rounded w-[160px]">
                <div className="border border-gray-700 flex justify-between items-center rounded-lg py-1 px-2 text-sm sm:text-base">
                  <span>{order.status}</span>
                  <i onClick={() => { toggleBtn(index) }} className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
                </div>

                {activated === index && (
                  <div className="absolute right-0 top-10 z-10 border border-gray-700 bg-gray-900 py-1 px-2 rounded-lg flex flex-col gap-1 items-center justify-center">
                    {orderStatus.map((dropdown, index) => (
                      <p key={index} onClick={() => {
                        updateStatus(order._id, dropdown);
                      }}
                        className="font-semibold text-sm cursor-pointer rounded-md hover:bg-gray-700 py-1 px-2"
                      >
                        {dropdown}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DashboardOrders
