const init_state = {
    productList: []
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "FETCH_PRODUCTS":
        return { ...state, productList: action.payload};
      default:
        return state;
    }
  };
  
  export default reducer;