import axios from "axios";
import { useEffect, createContext, useState } from "react";


export const OrderContext = createContext()

const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchOrders() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/orders/fetch',
                    headers: {
                        Authorization: token
                    }
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
        fetchOrders()
    }, [])


    const value = { orders, setOrders }

    return (
        <OrderContext.Provider value={value}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider;


