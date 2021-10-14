import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductsPage from './pages/ProductsPage';
import ItemsPage from "./pages/ItemsPage";
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ProductsPage} path="/products" />
        <Route component={ItemsPage} path="/items/:id" />
        <Route exact component={Register} path="/register" />
        <Route exact component={Login} path="/login" />
      </Switch>
     </BrowserRouter>
  );
}

export default App
