const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {handler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/manufacturers', require('./routes/manufacturerRoutes'))
app.use('/api/parts', require('./routes/partRoutes'))

app.use(handler)

app.listen(port, () => console.log(`Server started on port ${port}`))
