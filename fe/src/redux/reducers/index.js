import { combineReducers } from "redux"
import limitCategoryReducer from "./limitCategory"
import cartReducer from "./cartReducer"
import userReducer from "./userReducer"
import stockReducer from "./stockReducer"


export default combineReducers({
  limitCategory: limitCategoryReducer,
  cart: cartReducer,
  user: userReducer,
  stock: stockReducer
});
