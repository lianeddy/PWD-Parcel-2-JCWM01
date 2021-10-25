import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ItemsPage from './pages/ItemsPage';
import ProductsPage from './pages/ProductsPage';
import CartProduct from "./pages/CartProduct";
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import Verifikasi from './pages/Auth/Verifikasi/Verifikasi';
import InputEmail from './pages/Auth/ResetPassword/InputEmail';
import Profile from './pages/Profile/Profile';
import listparcel from './pages/listparcel';
import ProductAdmin from './pages/productAdminPanel';
import ResetPasswordAfterLogin from './pages/Auth/ResetPassword/ResetPasswordAfterLogin';
import Home from './pages/Home/Home';
import AdminPage from './pages/AdminPage/AdminPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={ProductsPage} path="/products" />
          <Route exact component={ItemsPage} path="/items/:index" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Register} path="/register" />
          <Route exact component={Verifikasi} path="/verifikasi/:token" />
          <Route exact component={ResetPassword} path="/reset/:token" />
          <Route exact component={InputEmail} path="/email" />
          <Route exact component={Profile} path="/profile" />
          <Route exact component={listparcel} path="/parcel" />
          <Route component={CartProduct} path="/cart-product" />
          <Route component={ProductAdmin} path="/productadmin" />
          <Route exact component={ResetPasswordAfterLogin} path="/resetpassword" />
          <Route exact component={AdminPage} path="/admin" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;

