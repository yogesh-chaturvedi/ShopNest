const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
require('./Models/db')
const ProductsRoute = require('./Routes/ProductsRoute')
const AuthRoute = require('./Routes/AuthRoutes')
const CartRoute = require('./Routes/CartRoutes')
const OrdersRoute = require('./Routes/OrdersRoutes')
const SearchedRoute = require("./Routes/SearchRoutes")
const PaymentRoute = require('./Routes/PaymentRoutes')
const ResetRoute = require('./Routes/ResetRoutes')
const ChatBotRoute = require('./Routes/ChatBotRoutes')
const PaginationRoute = require('./Routes/PaginationRoutes')

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cookieParser())
// https://shop-nest-livid.vercel.app
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(bodyParser.json())

app.use('/dashboard', ProductsRoute)
app.use('/auth', AuthRoute)
app.use('/api', CartRoute)
app.use('/orders', OrdersRoute)
app.use('/search', SearchedRoute)
app.use('/payment', PaymentRoute)
app.use('/password', ResetRoute)
app.use('/chatBot', ChatBotRoute)
app.use('/pagination', PaginationRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
