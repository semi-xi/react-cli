const initState = {
  list: [
    {
     title: '1'
    }
  ]
}
function orderReducer (state = initState, action) {
  switch(action.type) {
    case 'ADD': {
      return {
        ...state,
        list: [...state.list, action.data]
      }
    }
    default: 
      return state
  }
}

export default orderReducer