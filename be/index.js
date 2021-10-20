const express = require('express')
const cors = require('cors')
const { 
    productsRouter,
    itemsRouter,
    cartRouter
} = require('./routers')

const PORT = 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h4>Welcome to dev-mysql-api</h4>')
})

app.use('/products', productsRouter)
app.use('/items', itemsRouter)
app.use('/cart', cartRouter)

app.listen(PORT, () => console.log('Api Running :', PORT));