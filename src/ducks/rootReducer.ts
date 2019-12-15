import {combineReducers} from 'redux';
import clientsReducer from './clientsReducer'
export default combineReducers({
  clientsReducer
})
export interface IRootReducer{
  clientsReducer: Array<any>
}
