import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const ProductContext = createContext()


const ProductContextProvider = (props) => {

    const currency = '₹'
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/dashboard/all',
                })
                // console.log(response.data.product)
                const { product, success, message } = response.data
                if (success) {
                    setAllProducts(product)
                }
                else {
                    console.log(message)
                }
            }
            catch (error) {
                console.log("there is an error", error)
            }
        }

        fetchData()
    }, [])


    const value = {
        currency,
        allProducts,
        setAllProducts
    }

    return (
        <ProductContext.Provider value={value}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;