import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ItemsPage from './pages/ItemsPage';
import ProductsPage from './pages/ProductsPage';

class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <Switch>
        <Route component={ProductsPage} path="/products" />
        <Route component={ItemsPage} path="/items/:index" />
      </Switch>
     </BrowserRouter>
    )
  }
}

export default App;

