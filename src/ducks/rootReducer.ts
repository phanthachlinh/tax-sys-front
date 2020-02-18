import {combineReducers} from 'redux';
import clientsReducer, { IClient } from './client/client'
import signInReducer from './signIn/signIn'
import caseReducer,{ICase} from './case/case'
import noteReducer,{INote} from './note/note'
import fileReducer from './file/file'
let rootReducer:any;
if(process.env.NODE_ENV === 'reset')
  rootReducer =  (state:undefined,action:any):undefined=>{
    return undefined
  }
else
  rootReducer =  combineReducers({
    clientsReducer,
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
