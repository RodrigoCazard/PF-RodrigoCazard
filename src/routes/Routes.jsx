import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import UpdateUser from "../components/UpdateUser/UpdateUser.jsx";
import Cart from "../components/Cart/Cart.jsx";
import Checkout from "../components/Checkout/Checkout.jsx";
import Profile from "../components/Profile/Profile.jsx";
import Favorites from "../components/Favorites/Favorites.jsx";
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";
import WhyUs from "../components/WhyUs/WhyUs";
import Newsletter from "../components/Newsletter/Newsletter";
import CategoryListContainer from "../components/Categories/CategoryListContainer";
import ItemListContainer from "../components/Items/ItemListContainer";
import Hero from "../components/Hero/Hero";
import OrdersContainer from "../components/Orders/OrdersContainer.jsx";
import Order from "../components/Orders/Order.jsx";
import UpdateEmail from "../components/UpdateUser/UpdateEmail.jsx";
import ReviewContainer from "../components/ReviewSection/ReviewContainer.jsx";
import UpdatePassword from "../components/UpdateUser/UpdatePassword.jsx";
import Search from "../components/Search/Search.jsx";
import RelatedItems from "../components/RelatedItems/RelatedItems.jsx";
import Contact from "../components/Contact/Contact.jsx";
import About from "../components/About/About.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero></Hero>
            <CategoryListContainer></CategoryListContainer>
            <ItemListContainer />
            <ReviewContainer></ReviewContainer>
            <WhyUs></WhyUs>

            <Newsletter></Newsletter>
          </>
        }
      />
      <Route
        path="/category/:category"
        element={
          <>
            {" "}
            <ItemListContainer></ItemListContainer>
            <Newsletter></Newsletter>
          </>
        }
      />
      <Route
        path="/categories"
        element={
          <>
            {" "}
            <CategoryListContainer variant></CategoryListContainer>
            <Newsletter></Newsletter>
          </>
        }
      />
      <Route
        path="/search/:search"
        element={
          <>
            {" "}
            <Search variant></Search>
            <Newsletter></Newsletter>
          </>
        }
      />
      <Route
        path="/profile/orders/:idOrder"
        element={<Order variant></Order>}
      />
      <Route
        path="/item/:idItem"
        element={
          <>
            <ItemDetailContainer></ItemDetailContainer>
          </>
        }
      />

      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/cart" element={<Cart></Cart>} />
      <Route path="/cart/checkout" element={<Checkout></Checkout>} />
      <Route path="/profile" element={<Profile></Profile>} />
      <Route path="/profile/update" element={<UpdateUser></UpdateUser>} />
      <Route path="/profile/favorites" element={<Favorites />} />
      <Route path="/profile/orders" element={<OrdersContainer />} />
      <Route path="/profile/email" element={<UpdateEmail />} />
      <Route path="/profile/password" element={<UpdatePassword />} />
      <Route
        path="/contact"
        element={
          <>
            {" "}
            <Contact />
            <Newsletter></Newsletter>
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            {" "}
            <About />
            <Newsletter></Newsletter>
          </>
        }
      />
      {<Route path="*" element={<Navigate to={"/"} />} />}
    </Routes>
  );
};

export default AppRoutes;
