import { combineReducers } from 'redux'
import orderReducer from './order.js'

// reducer 合并

export default combineReducers({
  order: orderReducer
})