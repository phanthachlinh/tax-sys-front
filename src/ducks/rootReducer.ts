import {combineReducers} from 'redux';
import clientsReducer, { IClient } from './client/client'
import signInReducer from './signIn/signIn'
import caseReducer from './case/case'
import noteReducer from './note/note'
import fileReducer from './file/file'
import { ICase } from './case/case.types';
let rootReducer=  combineReducers({
    clients:clientsReducer,

    user:signInReducer,
    cases:caseReducer,
    note:noteReducer,
    files:fileReducer
})
export default rootReducer;
export interface IRootReducer{
  cases: {
    count: number,
    results: Array<ICase>
  };
  clientsReducer: {count:number,results:Array<IClient>}
  signInReducer: Object
  noteReducer:Object
}
