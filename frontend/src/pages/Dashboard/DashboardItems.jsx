import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { ProductContext } from '../../context/ProductContext'
import { ToastContainer, toast } from 'react-toastify'
import DashboardSidebar from '../../Components/DashboardSidebar'

const DashboardItems = () => {

  const { fetchProducts, currency, allProducts, setAllProducts } = useContext(ProductContext)
  const BASE_URL = import.meta.env.VITE_API_URL


  // to delete data from the database
  async function handleDelete(productId) {
    try {
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/dashboard/remove/${productId}`,
        data: allProducts,
        withCredentials: true
      })
      const { success, message, error } = response.data
      if (success) {
        toast(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchProducts();
      }
    }
    catch (error) {
      console.log("there is an error")
    }
  }

  async function handleSizeStatus(sizeKey, value, itemsId) {
    try {
      const token = JSON.parse(localStorage.getItem("token"))
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/dashboard/sizeUpdate`,
        data: { sizeKey, value, itemsId },
        withCredentials: true
      })
      const { success, error, products, message } = response.data
      if (success) {
        setAllProducts(products)
      }
      console.log(response.data)
    }
    catch (error) {
      console.log("there is an error", error)
    }
  }

  return (
    <div className=" flex">

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <DashboardSidebar />

      <div className='max-h-[100vh] overflow-y-auto scrollbar-hide p-5 w-full'>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-black mb-4 flex items-center justify-center underline">
          Listed Items
        </h1>

        <div className="p-2 flex flex-col gap-2">
          {allProducts.map((product) => (
            <div
              key={product._id}
              className="storedProducts rounded-2xl w-full xl:w-[90%] mx-auto border-2 border-gray-300 bg-slate-100 relative flex flex-col md:flex-row items-center justify-between p-3 gap-4"
            >
              {/* Product Image */}
              <img
                className="rounded-lg h-[120px] w-[90px] md:h-[100px] md:w-[80px]"
                src={product.image}
                alt="productImg"
              />

              {/* Product Info Section */}
              <div className="flex flex-col md:flex-row justify-between w-full gap-2.5 ">
                {/* Name and Price */}
                <div className="flex flex-col sm:flex-row gap-2.5 xl:gap-5 flex-wrap justify-between">
                  <div className="product-name flex flex-col">
                    <h4 className="font-bold px-1.5">Name:</h4>
                    <div className="productName w-[220px] truncate overflow-x-hidden px-1.5 mt-1 rounded-2xl">
                      {product.productName}
                    </div>
                  </div>
                  <div className="product-price flex justify-center flex-col">
                    <h4 className="font-bold px-1.5">Price:</h4>
                    <div className="productPrice w-[80px] px-1.5 mt-1 rounded-2xl">
                      ₹{product.productPrice}
                    </div>
                  </div>
                </div>

                {/* ID and Size */}
                <div className="flex flex-col sm:flex-row gap-2.5 xl:gap-5 flex-wrap justify-between">
                  <div className="productId flex flex-col">
                    <h4 className="font-bold px-1.5">ID:</h4>
                    <div className="productPrice text-wrap max-w-[215px] mt-1 pl-2 break-all">
                      {product._id}
                    </div>
                  </div>
                  <div className="product-size flex flex-col">
                    <h4 className="font-bold px-1.5">Size:</h4>
                    <div className="flex flex-wrap items-center gap-2 px-2 py-1 rounded">
                      {Object.entries(product.size).map(([key, value]) => (
                        <span
                          key={key}
                          onClick={() => handleSizeStatus(key, value, product._id)}
                          className={`text-center cursor-pointer px-2 py-1 text-sm min-w-[32px] rounded-sm ${value ? "bg-blue-500" : "bg-gray-500 line-through"
                            }`}
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Icon */}
              <div onClick={() => handleDelete(product._id)} className="self-end md:self-center">
                <i className="fa-solid fa-trash flex items-center justify-center text-lg h-10 w-10 rounded-full hover:bg-gray-700 cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

  )
}

export default DashboardItems
