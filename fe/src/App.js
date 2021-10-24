import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductsPage from './pages/ProductsPage';
import ItemsPage from "./pages/ItemsPage";
import CartProduct from "./pages/CartProduct";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ProductsPage} path="/products"/>
        <Route component={ItemsPage} path="/items/:id" />
        <Route component={CartProduct} path="/cart-product" />
      </Switch>
     </BrowserRouter>
  );
}

export default App
