const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {handler} = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/categories', require('./routes/categoryRoutes'))

app.use(handler)

app.listen(port, () => console.log(`Server started on port ${port}`))
