const init_state = {
    limit: [],
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "LIMIT_CATEGORY":
        return { ...state, limit: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;