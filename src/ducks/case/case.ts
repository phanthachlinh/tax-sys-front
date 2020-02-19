import axios from 'axios';
import { CaseTypes } from './case.enum';
import { IPutCaseAction, IGetCasesAction, IPostCaseAction, ICaseAction, ICase } from './case.types';
const initialState:ICaseState={
  count:0,
  results:[]
}
const initialAction:ICaseAction={
  payload:{
    data:{
      count:0,
      results:[]
    }
  }
}
export default (state:ICaseState = initialState, action:any=initialAction)=>{
  switch(action.type){
    case CaseTypes.GET_CASES:

      return {...action.payload.data};
    case CaseTypes.POST_CASE:
      if(action.payload.status == 422)
         return state
      if(action.meta.page === 1){
        let newState:{count:number,results:Array<ICase>} = {...state}
        newState.results.pop()
        newState.results.unshift(action.payload.data)
        return newState
      }
      return state
   case CaseTypes.DELETE_CASE:
      if(action.payload.status===422)
        return state
      if(action.payload.status===200){
        let newState = {...state};
        newState.results = newState.results.filter((casex:ICase)=>{return casex._id != action.meta.id})
        return newState
      }
      return state

    case CaseTypes.PUT_CASE:
      let updatedCaseIndex = state.results.findIndex((casex:ICase)=>casex._id === action.payload.data._id)
      state.results[updatedCaseIndex] = action.payload.data
      return {...state}
    default:

      return state
  }
}
export type ICaseActionTypes = IGetCasesAction|IPostCaseAction|IDeleteCaseAction|IPutCaseAction

export const CaseActions = {
  getCases:(id:String,page:Number):IGetCasesAction =>{
    return {
      type: CaseTypes.GET_CASES,
      payload: axios.get('http://localhost:8888/case?page='+page+'&clientId='+id)
    }
  },
  postCase:(formData:any,page:number,userId:number, clientId:string):IPostCaseAction =>{

    return {
      type: CaseTypes.POST_CASE,
      payload: axios.post('http://localhost:8888/case',{
        status:0,
        country:formData,
        FK_User: userId,
        FK_Mongo_Client: clientId
      }),

      meta:{
        page: page
      }
    }
  },
  deleteCase:(ID:Number):IDeleteCaseAction =>{
    return {
      type: CaseTypes.DELETE_CASE,
      payload: axios.delete('http://localhost:8888/case/',{params:{_id:ID}}),
      meta:{
        id:ID
      }
    }
  },
  putCase:(_id:string,status:number, country:string ,page:number,date_created:string,userId:number, clientId:string):IPutCaseAction =>{
    return {
      type: CaseTypes.PUT_CASE,
      payload: axios.put('http://localhost:8888/case/',{
        _id:_id,
        status:status,
        country:country,
        page:page,
        date_created:date_created,
        FK_User: userId,
        FK_Mongo_Client: clientId
      })

    }
  }
}
export interface ICaseState{
  count: number,
  results: Array<ICase>
}
