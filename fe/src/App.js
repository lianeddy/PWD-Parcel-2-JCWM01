import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ItemsPage from './pages/ItemsPage';
import ProductsPage from './pages/ProductsPage';
import DetailItemPage from './pages/DetailItemPage';

class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <Switch>
        <Route component={ProductsPage} path="/products" />
        <Route component={ItemsPage} path="/items/:id" />
        <Route component={DetailItemPage} path="/detail/:id" />
      </Switch>
     </BrowserRouter>
    )
  }
}

export default App;

