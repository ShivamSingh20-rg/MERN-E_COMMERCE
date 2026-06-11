const express = require('express')
const cors = require('cors')
const Authrouter = require('./src/Routes/authRoute')
const UserRoute = require('./src/Routes/userRoute')
const ProductRoute = require('./src/Routes/product.routes')
const CartRoute = require('./src/Routes/cart.route')
const AdressRoute = require('./src/Routes/addres.Route')
const OrderRoute = require ('./src/Routes/orderRoute')
 
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
 

app.use('/auth',Authrouter);
app.use('/users',UserRoute);
app.use('/products',ProductRoute);
app.use('/cart',CartRoute);
app.use('/address',AdressRoute);
app.use('/orders',OrderRoute);
 
module.exports = app;
