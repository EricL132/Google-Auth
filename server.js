const express = require('express')
const app = express()
const dotenv = require('dotenv')
const  cookieParser = require('cookie-parser')
const accountRoute = require('./routes/account')
dotenv.config() 
const PORT  = process.env.PORT || 9000 
app.use(express.json())
app.use(cookieParser())

app.use('/account',accountRoute)

app.listen(PORT,()=>{
    "Listenin to port "+PORT
})