import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ProductContext } from '../../context/ProductContext'
import { ToastContainer, toast } from 'react-toastify'
import DashboardSidebar from '../../Components/DashboardSidebar'

const DashboardAdd = () => {

  const value = useContext(ProductContext)

  const BASE_URL = import.meta.env.VITE_API_URL

  const [data, setData] = useState({
    image: '',
    subImage1: '',
    subImage2: '',
    subImage3: '',
    subImage4: '',
    productName: '',
    productPrice: '',
    quantity: '',
    description: '',
    bestSeller: false,
    latestCollection: false,
    category: '',
    type: '',
    size: {
      XS: false,
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
      XXXL: false,
      XXXXL: false,
    }
  })
  function handleChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // to add data in database
  async function handleSubmit(e) {
    console.log('submit')
    e.preventDefault()
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/dashboard/products`,
        data: data,
        withCredentials: true
      })
      const { success, message } = response.data;
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
      console.log(response.data);
    }
    catch (error) {
      console.log("there is an error", error)
    }

  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']

  return (
    <div className='flex'>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <DashboardSidebar />

      <div className="w-full min-h-screen px-4 py-5">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-black mb-4 flex items-center justify-center underline">
          Add Items
        </h1>

        {/* form */}
        <div className="p-2">
          <form
            className="border border-gray-300 bg-slate-100 h-auto rounded-2xl flex flex-col gap-3 sm:gap-6 w-[95%] sm:w-[85%] md:w-[60%] lg:w-[70%] mx-auto mt-2 p-4"
            onSubmit={handleSubmit}
          >
            <input
              value={data.image}
              onChange={handleChange}
              name="image"
              className="border-2 border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
              type="url"
              placeholder="Enter Image URL"
            />

            {/* group 1 */}
            <div className="flex justify-between">
              <input
                value={data.subImage1}
                onChange={handleChange}
                className="border-2 w-[47%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="url"
                name="subImage1"
                placeholder="Enter SubImage1 URL"
              />
              <input
                value={data.subImage2}
                onChange={handleChange}
                className="border-2 w-[47%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="url"
                name="subImage2"
                placeholder="Enter SubImage2 URL"
              />
            </div>

            {/* group 2 */}
            <div className="flex justify-between">
              <input
                value={data.subImage3}
                onChange={handleChange}
                className="border-2 w-[47%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="url"
                name="subImage3"
                placeholder="Enter SubImage3 URL"
              />
              <input
                value={data.subImage4}
                onChange={handleChange}
                className="border-2 w-[47%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="url"
                name="subImage4"
                placeholder="Enter SubImage4 URL"
              />
            </div>

            <div className="flex justify-between">
              <input
                value={data.productName}
                onChange={handleChange}
                name="productName"
                className="border-2 w-[70%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="text"
                placeholder="Enter Product Name"
              />
              <input
                value={data.productPrice}
                onChange={handleChange}
                name="productPrice"
                className="border-2 w-[27%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="number"
                placeholder="Enter Product Price"
              />
            </div>

            <div className="flex gap-5 text-gray-800">
              <div className="flex items-center gap-1">
                <label>Bestseller</label>
                <input
                  value={data.bestSeller}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, bestSeller: e.target.checked }))
                  }
                  className="border-2 border-gray-400 h-4 w-4 accent-blue-600"
                  type="checkbox"
                />
              </div>

              <div className="flex items-center gap-1">
                <label>Latest Collection</label>
                <input
                  value={data.latestCollection}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      latestCollection: e.target.checked,
                    }))
                  }
                  className="border-2 border-gray-400 h-4 w-4 accent-blue-600"
                  type="checkbox"
                />
              </div>
            </div>

            {/* sizes */}
            <div className="flex flex-col text-gray-800">
              <p>Select Available Sizes</p>
              <div className="flex gap-6 flex-wrap">
                {sizes.map((sizes, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <label className="font-bold">{sizes}</label>
                    <input
                      value={data.size[sizes]}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          size: { ...prev.size, [sizes]: e.target.checked },
                        }))
                      }
                      type="checkbox"
                      className="h-4 w-4 accent-blue-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* quantity */}
            <input
              value={data.quantity}
              onChange={handleChange}
              name="quantity"
              className="border-2 border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
              type="number"
              placeholder="Quantity"
            />

            {/* category and type */}
            <div className="flex justify-between">
              <input
                value={data.category}
                onChange={handleChange}
                name="category"
                className="border-2 w-[47%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="text"
                placeholder="Categorey"
              />
              <input
                value={data.type}
                onChange={handleChange}
                name="type"
                className="border-2 w-[47%] border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
                type="text"
                placeholder="Product Type"
              />
            </div>

            <input
              value={data.description}
              onChange={handleChange}
              name="description"
              className="border-2 border-gray-300 bg-white text-gray-900 outline-none px-2 py-1 rounded-lg focus:border-blue-500"
              type="text"
              placeholder="Product Description"
            />

            <div className="text-center">
              <button
                type="submit"
                className="text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-4 pt-1 pb-2 transition"
              >
                Submit
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default DashboardAdd
