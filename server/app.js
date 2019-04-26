require("dotenv").config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)

mongoose.connect(`mongodb+srv://${process.env.ATLAST_NAME}:${process.env.ATLAST_PW}@cluster0-sfchz.gcp.mongodb.net/e-commerce?retryWrites=true`, { useNewUrlParser: true })

// mongoose.connect(`mongodb://localhost/e-commerce-testing`, { useNewUrlParser: true })


app.use(express.urlencoded({ limit: '200mb', extended: false }));
app.use(express.json({ limit: '200mb' }));
app.use(cors())

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const transactionRoutes = require('./routes/transaction')
const brandRoutes = require('./routes/brand')

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/transactions', transactionRoutes)
app.use('/brands', brandRoutes)

module.exports = app
app.listen(port, () => {
    console.log("listening on port" + port)
})
