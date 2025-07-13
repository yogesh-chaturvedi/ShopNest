const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("db connected successfully")
}).catch((err) => {
    console.log("db connection unsuccessfully",err)
})
// console.log(process.env.MONGODB_URI)