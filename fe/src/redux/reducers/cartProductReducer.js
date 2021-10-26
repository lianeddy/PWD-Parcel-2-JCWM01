const init_state = {
    productList: [],
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "DATA_CART_PRODUCT":
        return { ...state, productList: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;