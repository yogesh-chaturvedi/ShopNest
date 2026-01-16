import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { assets } from '../../assets/Assets'
import { OrderContext } from '../../context/OrdersContext'
import { CartContext } from '../../context/CartContext'
import axios from 'axios'
import DashboardSidebar from '../../Components/DashboardSidebar'

const DashboardOrders = () => {

  const { fetchOrders, orders, setOrders } = useContext(OrderContext)
  const { subTotal, setSubTotal, deliveryFee, currency } = useContext(CartContext)
  const orderStatus = ['Shipped', 'Out Of Delivery', 'Delivered']
  const [PaginatedOrder, setPaginatedOrder] = useState([])
  const [currentPages, setCurrentPages] = useState(1)
  const [TotalPages, setTotalPages] = useState(50)
  const BASE_URL = import.meta.env.VITE_API_URL;


  async function updateStatus(orderId, dropdownValue) {
    try {
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/orders/update-Status`,
        data: { orderId, dropdownValue },
        withCredentials: true
      })
      const { orders, success, error, message } = response.data
      if (success) {
        console.log(orders)
        setOrders(orders)
        fetchOrders()
      }

    } catch (error) {
      console.log("updateStatus error", error)
    }
  }

  // previous btn
  function handlePrev() {
    if (currentPages <= 1) {
      return;
    }
    setCurrentPages(currentPages - 1);
  }

  // next btn
  function handleNext() {
    if (currentPages >= TotalPages) {
      return;
    }
    setCurrentPages(currentPages + 1);
  }

  // pagination
  useEffect(() => {
    async function pagination() {
      try {
        const response = await axios({
          method: 'get',
          url: `${BASE_URL}/pagination/orders?currentPage=${currentPages}&limit=5`,
          withCredentials: true
        })
        const { message, success, data, totalPages } = response.data
        if (success) {
          setPaginatedOrder(data)
          setTotalPages(totalPages)
        }
      }
      catch (error) {
        console.log("there is an error", error)
      }
    }
    pagination()
  }, [currentPages])


  return (

    <div className='flex'>

      <DashboardSidebar />

      <div className='w-full max-h-[100vh] scrollbar-hide overflow-y-auto p-5'>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-black mb-4 flex items-center justify-center underline">
          View Orders
        </h1>

        <div className=" flex flex-col gap-3 scrollbar-hide">
          {[...PaginatedOrder].sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order, index) => (
              <div key={index} className={`orderBox border-2 border-gray-300 bg-slate-100 m-1 p-4 flex flex-col lg:flex-row justify-around gap-4 w-[95%] mx-auto rounded-xl ${order.status === 'Delivered' ? 'bg-gray-500 line-through' : ""}`}>
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
                <div className="relative w-[160px]">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className=" w-full border border-gray-700 rounded-lg py-1 px-2 text-sm sm:text-base  bg-white  cursor-pointer focus:outline-none  focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out Of Delivery">Out Of Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}

          {/* buttons */}
          <div className='flex gap-2 items-center justify-center'>
            <button onClick={handlePrev} type='button' className='px-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-300 bg-blue-500 text-white text-xl '>Prev</button>
            <span className='text'>{currentPages} of {TotalPages}</span>
            <button onClick={handleNext} type='button' className='px-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-300 bg-blue-500 text-white text-xl '>Next</button>
          </div>

        </div>
      </div>

    </div >
  )
}

export default DashboardOrders
