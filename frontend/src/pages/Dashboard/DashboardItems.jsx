import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { ProductContext } from '../../context/ProductContext'
import { ToastContainer, toast } from 'react-toastify'

const DashboardItems = () => {

  const { currency, allProducts, setAllProducts } = useContext(ProductContext)
  const BASE_URL = import.meta.env.VITE_API_URL


  // to delete data from the database
  async function handleDelete(productId) {
    try {
      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/dashboard/remove/${productId}`,
        data: allProducts
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
        headers: {
          Authorization: token
        },
        data: { sizeKey, value, itemsId }
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

    <div className="p-2 border-t-2 border-white">

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <div className="p-2 flex flex-col gap-2 max-h-[83vh] py-8 overflow-y-auto scrollbar-hide">
        {allProducts.map((product, index) => (
          <div
            key={product._id}
            className="storedProducts rounded-2xl w-full xl:w-[90%] mx-auto border-2 border-gray-700 relative flex flex-col md:flex-row items-center justify-between p-3 gap-4"
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


    // <div>
    //   {/* <h1 className='font-bold text-2xl py-2 w-[90%] mx-auto'>Listed Items</h1> */}
    //   <div className='border-2 border-white p-2 flex flex-col gap-2 max-h-[83vh] overflow-y-auto'>
    //     {allProducts.map((product, index) => {
    //       return (<div className='storedProducts rounded-2xl w-[100%] xl:w-[90%] mx-auto border-2 border-white relative flex items-center justify-between p-2 '>
    //         <img className='rounded-lg h-[150px] w-[105px] xl:h-[90px] xl:w-[70px]' src={product.image} alt="productIng" />

    //         <div className='flex items-center justify-between'>
    //           <div className='flex md:flex-col md:gap-5 xl:flex-row'>
    //             <div className='product-name flex md:flex-col'>
    //               <h4 className='font-bold  xl:absolute xl:top-0 px-1.5'>Name:</h4>
    //               <div className="productName text-wrap border border-white min-w-[250px] px-1.5 rounded-2xl">{product.productName}</div>
    //             </div>
    //             <div className='product-price flex md:flex-col'>
    //               <h4 className='font-bold xl:absolute xl:top-0 px-1.5'>Price:</h4>
    //               <div className="productPrice min-w-[80px] px-1.5 rounded-2xl">{product.productPrice}</div>
    //             </div>
    //           </div>
    //           <div className='flex md:flex-col md:gap-5 xl:flex-row xl:items-center'>
    //             <div className="productId flex md:flex-col">
    //               <h4 className='font-bold xl:absolute xl:top-0 px-1.5 mt-1'>ID:</h4>
    //               <div className="productPrice text-wrap border border-white max-w-[210px]  px-1.5 rounded-2xl">{product._id}</div>
    //             </div>
    //             {/* items-center */}
    //             <div className='product-size flex md:flex-col'>
    //               <h4 className='font-bold xl:absolute xl:top-0 px-1.5'>Size:</h4>
    //               {/* xl:max-w-[190px] */}
    //               <div className=' flex ml-1 mt-2 items-center gap-2 border border-white flex-wrap  '>
    //                 {Object.entries(product.size)
    //                   .map(([key, value]) => {
    //                     return (<span onClick={() => handleSizeStatus(key, value, product._id)} className={`text-center cursor-pointer px-1 text-sm min-w-[32px] rounded-sm ${value ? 'bg-blue-500' : "bg-gray-500 line-through"}`}>{key}</span>)
    //                   })
    //                 }
    //               </div>
    //             </div>
    //           </div>
    //         </div>


    //         <div onClick={() => handleDelete(product._id)} >
    //           <i className="fa-solid fa-trash flex items-center justify-center text-lg h-10 w-10 rounded-full hover:bg-gray-700 cursor-pointer"></i>
    //         </div>
    //       </div>)
    //     })}

    //   </div>

    // </div>


    // <div>
    //   <div className='border-2 border-white p-2 flex flex-col gap-2 max-h-[83vh] overflow-y-auto'>
    //     {allProducts.map((product, index) => {
    //       return (
    //         <div key={product._id} className='storedProducts rounded-2xl w-full xl:w-[90%] mx-auto border-2 border-white relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 gap-3'>
    //           {/* Product Image */}
    //           <img className='rounded-lg h-[150px] w-[110px] sm:h-[100px] sm:w-[80px]' src={product.image} alt="productImg" />

    //           {/* Product Info Section */}
    //           <div className='flex flex-col md:flex-row gap-1 w-full sm:w-auto'>
    //             {/* Name */}
    //             <div className='flex flex-col'>
    //               <div className='product-name flex items-start sm:items-center gap-1'>
    //                 <h4 className='font-bold'>Name:</h4>
    //                 <div className="productName text-wrap border border-white px-2 rounded-2xl max-w-[250px] break-words">{product.productName}</div>
    //               </div>

    //               {/* Price */}
    //               <div className='product-price flex items-start sm:items-center gap-1'>
    //                 <h4 className='font-bold'>Price:</h4>
    //                 <div className="productPrice px-2 rounded-2xl">{product.productPrice}</div>
    //               </div>


    //               {/* ID */}
    //               <div className="productId flex items-start sm:items-center gap-1">
    //                 <h4 className='font-bold'>ID:</h4>
    //                 <div className="productPrice text-wrap border border-white px-2 rounded-2xl max-w-[250px] break-words">
    //                   {product._id}
    //                 </div>
    //               </div>
    //             </div>
    //             {/* Size */}
    //             <div className='product-size flex flex-col sm:flex-row items-start sm:items-center gap-1'>
    //               <h4 className='font-bold'>Size:</h4>
    //               <div className='flex flex-wrap gap-2 px-1 border border-white rounded-md max-w-full sm:max-w-[250px]'>
    //                 {Object.entries(product.size).map(([key, value]) => (
    //                   <span
    //                     key={key}
    //                     onClick={() => handleSizeStatus(key, value, product._id)}
    //                     className={`cursor-pointer px-2 py-1 text-sm rounded-sm min-w-[32px] text-center ${value ? 'bg-blue-500' : 'bg-gray-500 line-through'
    //                       }`}
    //                   >
    //                     {key}
    //                   </span>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>

    //           {/* Delete Icon */}
    //           <div onClick={() => handleDelete(product._id)} className='self-end sm:self-center mt-2 sm:mt-0'>
    //             <i className="fa-solid fa-trash text-lg h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-700 cursor-pointer"></i>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>

  )
}

export default DashboardItems
