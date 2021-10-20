const init_state = {
    stockItems: [],
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "DATA_STOCK":
        return { ...state, stockItems: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;