import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 🎯 Cleaned up unused imports
import Dashboard1 from "./Dashboard1";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";  
import Cartpage from './components/Cartpage';
import Login from './components/Login';
import Signup from './components/Signup';
import Authprovider from '../src/Context/Authcontext';
import Productadd from './admin/Productadd'
import CartPorvider from'../src/components/CartContext'
import Productlist from './components/Productlist'
import Deliveryaddress from '../src/components/Deliveryaddress'
import Order from '../src/components/Order'
import Payment from '../src/components/Payment'
import Myorders from '../src/components/Myorders'
import Productcard from '../src/components/Productcard'
import OrderDetail from '../src/components/orderDetail'
import Footer from './components/Footer'
export default function App() {
  return (
    <BrowserRouter>
     <Authprovider>
  <CartPorvider >   {/* 🎯 Removed the broken nested <Router> tag */}
          <div className="min-h-screen bg-white">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Dashboard1 />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cartpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/adminadd" element={<Productadd/>} />
              <Route path="/category/:subCategorySlug" element={<Productlist />} />
              <Route path="/checkout/address" element={<Deliveryaddress />} />
              <Route path="/checkout/orders" element={<Order />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/myorders" element={<Myorders />} />
              <Route path="/shop" element={<Productcard/>} />
              <Route path="/orders/:orderId" element={<OrderDetail />} /> 
            </Routes>

            <Footer />
          </div>

          </CartPorvider> 
        </Authprovider>
  
    </BrowserRouter>
  );
}