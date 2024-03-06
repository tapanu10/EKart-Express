const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes=require('./routes/categoryRoutes')
const productRoutes=require('./routes/productRoutes')
const db = require('./config/db');
const cors=require('cors')
const path=require('path')
//config env
dotenv.config();

//rest object
const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

//rest api
app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
