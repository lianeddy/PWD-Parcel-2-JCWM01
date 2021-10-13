import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductsPage from "./pages/ProductsPage";
import ItemsPage from "./pages/ItemsPage";
import ProductsPage from "./pages/ProductsPage";
import DetailItemPage from "./pages/DetailItemPage";

import Register from "./pages/Auth/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ProductsPage} path="/products" />
        <Route component={ItemsPage} path="/items/:id" />
        <Route component={DetailItemPage} path="/detail/:id" />
        <Route component={ProductsPage} path="/products" />
        <Route component={ItemsPage} path="/items/:id" />
        <Route exact component={Register} path="/register" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
