const init_state = {
    itemList: [],
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "SELECT_ITEM":
        return { ...state, itemList: [...state.itemList, action.payload] };
  
      default:
        return state;
    }
  };
  
  export default reducer;