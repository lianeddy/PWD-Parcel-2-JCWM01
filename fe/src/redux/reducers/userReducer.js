const init_state = {
    data: {
        id_user: 1,
        name_user: "dedi",
    },
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "DATA_USER":
        return { ...state, user: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;