import axios from "axios";
import { useEffect, createContext, useState } from "react";


export const OrderContext = createContext()

const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([])
    const BASE_URL = import.meta.env.VITE_API_URL


    async function fetchOrders() {
        try {
            // const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/orders/fetch`,
                withCredentials: true
            })
            const { success, message, error, order } = response.data

            if (success) {
                setOrders(order)
            }

            // console.log(response.data)
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }


    useEffect(() => {
        fetchOrders()
    }, [])


    const value = {fetchOrders, orders, setOrders }

    return (
        <OrderContext.Provider value={value}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider;


