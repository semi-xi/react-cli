const initState = {
  list: []
}
function orderReducer (state = initState, action) {
  switch(action.type) {
    case 'ADD': {
      return {
        ...state,
        list: [...state.list, action.item]
      }
    }
    default: 
      return state
  }
}

export default orderReducer