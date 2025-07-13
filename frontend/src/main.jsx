import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from './context/ProductContext.jsx';
import CartContextProvider from './context/CartContext.jsx';
import OrderContextProvider from './context/OrdersContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
