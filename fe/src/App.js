import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductsPage from './pages/ProductsPage';
import ItemsPage from "./pages/ItemsPage";
import DetailItemPage from "./pages/DetailItemPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ProductsPage} path="/products" />
        <Route component={ItemsPage} path="/items/:id" />
        <Route component={DetailItemPage} path="/detail/:id" />
      </Switch>
     </BrowserRouter>
  );
}

export default App