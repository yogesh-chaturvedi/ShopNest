import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { assets } from '../assets/Assets'
import Footer from '../Components/Footer'
import { ProductContext } from '../context/ProductContext'
import Product from './Product'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


function Collection() {

  const { currency, allProducts, setAllProducts } = useContext(ProductContext)

  const [sortedOrder, setSortedOrder] = useState('default')
  const [show, setShow] = useState("All")
  const [type, setType] = useState("All")
  const navigate = useNavigate()
  const location = useLocation()
  const [filterToggle, setFilterToggle] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  // console.log(filterToggle)
  useEffect(() => {
    if (location.state?.showTost) {
      toast('You can search products here!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Remove the state from history so it doesn't re-show on back, so that it will not come again and again when page gets refresh
      window.history.replaceState({}, document.title);
    }
  }, [location])


  // to set category 
  function handleClick(arg) {
    setShow(arg)
  }

  // to set type 
  function handleType(arg) {
    setType(arg)
  }

  function showProduct(collection) {
    navigate(`/product/${collection.productName}`, { state: collection })
    console.log(collection)
  }

  // to get categories from the database 
  function getCategories(database, property) {
    let newVal = database.map((item, index) => {
      return item[property]
    })
    const uniqueVal = ['All', ...new Set(newVal)]
    return uniqueVal
  }

  const myCategories = getCategories(allProducts, 'category')
  const myType = getCategories(allProducts, 'type')
  // console.log(myCategories)
  // console.log(myType)

  const categories = myCategories
  const types = myType


  function handleSort(value) {
    setSortedOrder(value)
  }

  function toggleFilter() {
    if (filterToggle === true) {
      setFilterToggle(false)
    }
    else {
      setFilterToggle(true)
    }
  }

  useEffect(() => {
    const screenResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', screenResize)
    return () => window.removeEventListener('resize', screenResize)
  }, [])
  

  // to make it reusable 
  function FilterContent() {
    return (
      <div className='flex flex-col gap-3'>
        <div className='box1 lg:border-2 lg:border-black pl-3'>
          {/* box1 */}
          <h4 className='font-bold text-lg lg:text-2xl'>CATEGORIES</h4>
          {categories.map((category, index) => {
            return (<div key={index} onClick={() => handleClick(category)} className='flex gap-2 cursor-pointer items-center'>
              <span className={`h-4 w-4 border-2 border-black ${show === `${category}` ? 'bg-blue-600' : ''}`}></span>
              <span className='overflow-x-auto truncate'>{category.toUpperCase()}</span>
            </div>)
          })}
        </div>
        {/* box2 */}
        <div className='box2 lg:border-2 lg:border-black pl-3'>
          <h4 className='font-bold text-lg lg:text-2xl'>TYPES</h4>
          {types.map((types, index) => {
            return (<div key={index} onClick={() => handleType(types)} className='flex cursor-pointer gap-2 items-center'>
              <span className={`h-4 w-4 border-2 border-black ${type === `${types}` ? 'bg-blue-600' : ''}`}></span>
              <span className='overflow-x-auto truncate'>{types.toUpperCase()}</span>
            </div>)
          })}
        </div>
      </div>
    )
  }


  return (
    <div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <Navbar />
      <div className="collection w-full px-1 lg:w-[90%] mx-auto py-5">
        <h1 className='font-bold text-3xl text-center mb-14'>ALL COLLECTIONS</h1>
        <div className='w-full flex gap-2'>
          {/*  filter  */}
          {isDesktop && (<div className="left rounded-lg w-[200px] lg:w-[20%] flex flex-col gap-3">
            <div className='flex justify-between items-center'>
              <h3 className='font-bold text-2xl ml-3'>FILTER</h3>
              <span onClick={() => toggleFilter()} className='mr-3'><i className={`fa-solid fa-angle-down text-xl lg:hidden  ${filterToggle === true ? 'rotate-180' : ''}`}></i></span>
            </div>
            <FilterContent />
          </div>)}


          {/* right */}
          {/* max-h-[81vh] overflow-y-scroll py-2 scrollbar-hide  border-2 border-red-500 */}
          <div className="right relative lg:border-none border-t-2 border-black py-2 w-full lg:w-[75%] flex flex-wrap justify-evenly gap-y-4">

            {/* filter  */}
            {!isDesktop && (<div className="left absolute top-[-38px] left-0 rounded-lg border-2 border-black   bg-white w-[170px] lg:w-[20%] flex flex-col gap-3">
              <div className='flex justify-between items-center'>
                <h3 className='font-bold text-[16px] ml-3'>FILTER</h3>
                <span onClick={() => toggleFilter()} className='mr-3'><i className={`fa-solid fa-angle-down text-lg lg:hidden  ${filterToggle === true ? 'rotate-180' : ''}`}></i></span>
              </div>
              {/* conditional rendering  */}
              {filterToggle && (<FilterContent />)}
            </div>)}

            {/* sorting */}
            <div className='absolute top-[-35px] right-0'>
              <select onChange={(e) => handleSort(e.target.value)} className='border-2 border-black font-bold w-[140px] rounded-md outline-none '>
                <option className='text-[12px] lg:text-sm  font-semibold' value="default">Sort By</option>
                <option className='text-[12px] lg:text-sm font-semibold' value="price-asc">Price: Low to High</option>
                <option className='text-[12px] lg:text-sm font-semibold' value="price-dsc">Price: High to Low</option>
              </select>
            </div>


            {allProducts.filter((collection) => {
              const categoryMatch = show === "All" || collection.category === show;
              const typeMatch = type === "All" || collection.type === type;
              return categoryMatch && typeMatch;
            })
              .sort((a, b) => {
                if (sortedOrder === "price-asc") {
                  return a.productPrice - b.productPrice
                }
                else if (sortedOrder === "price-dsc") {
                  return b.productPrice - a.productPrice
                }
                else {
                  return 0;
                }
              })
              .map((collection, index) => {
                return <div key={index} className='shadow-2xl pb-1 rounded-xl h-[250px] w-[170px] lg:h-[300px] lg:w-[230px]'>
                  <img onClick={() => showProduct(collection)} className='h-[82%] lg:h-[85%] w-full rounded-t-xl cursor-pointer' src={collection.image} alt="productImage" />
                  <div className='px-1'>
                    <p className='ProductName overflow-hidden truncate '>{collection.productName}</p>
                    <p className='Productprice font-semibold'>{currency}{collection.productPrice}</p>
                  </div>
                </div>
              })
            }

          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Collection
