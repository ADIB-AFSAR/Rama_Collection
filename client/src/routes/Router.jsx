import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "../pages/frontend/Home";
import ProductDetailsPage from "../pages/frontend/Details";
import Checkout from "../pages/frontend/Checkout";
import Login from "../pages/frontend/Login";
import Register from "../pages/frontend/Register";
import ThankYou from "../pages/frontend/Thankyou";  
import Profile from "../pages/backend/Profile/Profile";
import ProfileEdit from "../pages/backend/Profile/ProfileEdit";
import Orders from "../pages/backend/orders/Orders";
import OrdersView from "../pages/backend/orders/OrdersView";
import AddOrEditCategories from "../pages/backend/categories/AddOrEditCategory";
import Categories from "../pages/backend/categories/Categories";
import Products from "../pages/backend/products/Products";
import AddOrEditProducts from "../pages/backend/products/AddOrEditProduct";
import Users from "../pages/backend/users/Users";
import AddOrEditUser from "../pages/backend/users/AddOrEditUsers";
import Auth from "../pages/backend/Auth";
import Wishlist from "../pages/frontend/Wishlist";
// import Cart from "../pages/frontend/Cart";
// import Thankyou from "../pages/frontend/Thankyou";
// import Details from "../pages/frontend/Details";
// import Checkout from "../pages/frontend/Checkout";
// import Profile from "../pages/backend/dashboard/Profile";
// import ProfileEdit from "../pages/backend/dashboard/ProfileEdit";
// import Categories from "../pages/backend/categories/Categories";
// import AddOrEditCategories from "../pages/backend/categories/AddOrEditCategories";
// import Products from "../pages/backend/products/Products";
// import AddOrEditProducts from "../pages/backend/products/AddOrEditProducts";
// import Users from "../pages/backend/users/Users";
// import AddOrEditUser from "../pages/backend/users/AddOrEditUser";
// import Orders from "../pages/backend/orders/Orders";
// import OrdersView from "../pages/backend/orders/OrdersView";
// import Login from "../pages/frontend/Login";
// import Register from "../pages/frontend/Register";
// import Auth from "../pages/backend/Auth";
 
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/details/:id" element={<ProductDetailsPage/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/> 
      <Route path="/thankyou" element={<ThankYou/>} />
      <Route path="/wishlist" element={<Wishlist/>} />

      {/* <Route path="/cart" element={<Cart />} />*/}
      

        <Route path="dashboard" element={<Profile/>} />
        <Route path="profile/edit/:id" element={<ProfileEdit/>} />
        
        <Route path="order">
          <Route path="" element={<Orders/>} />
          <Route path="view/:id" element={<OrdersView/>} /> 
        </Route>

        
      <Route path="/admin" element={<Auth/>}>

        <Route path="category">
          <Route path="" element={<Categories/>} />
          <Route path="create" element={<AddOrEditCategories/>} />
          <Route path="edit/:id" element={<AddOrEditCategories />} />
        </Route>

        <Route path="product">
          <Route path="" element={<Products />} />
          <Route path="create" element={<AddOrEditProducts />} />
          <Route path="edit/:id" element={<AddOrEditProducts />} />
        </Route>

        <Route path="user">
          <Route path="" element={<Users/>} />
          <Route path="create" element={<AddOrEditUser />} />
          <Route path="edit/:id" element={<AddOrEditUser />} />
        </Route>

        
      </Route>
    </Routes>
  );
}

export default AppRouter;
