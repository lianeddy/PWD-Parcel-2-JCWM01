const init_state = {
    itemList: [],
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "DATA_CART":
        return { ...state, itemList: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;