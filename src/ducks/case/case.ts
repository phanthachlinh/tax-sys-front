import axios,{AxiosResponse} from 'axios';
export default (state:IState = {count:0,results:[]}, action:ICaseAction={type:'',payload:{status:0,data:{count:0,results:[]}}})=>{

  switch(action.type){
    case CaseTypes.GET_CASES:
      return {...action.payload.data};
    case CaseTypes.POST_CASE:
      if(action.payload.status == 422)
         return state
      let newState:{count:number,results:Array<ICase>} = {...state}
      newState.results.pop()
      newState.results.unshift(action.payload.data)
      return newState

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
export interface ICase{
  _id: string,
  status: number,
  country: string,
  date_created: string,
  FK_User: number,
  FK_Mongo_Client: String
}
interface IGetCasesAction{
  type: typeof CaseTypes.GET_CASES,
  payload: any
}
interface IPutCaseAction{
  type: typeof CaseTypes.PUT_CASE,
  payload: any
}
interface IDeleteCaseAction{
  type: typeof CaseTypes.DELETE_CASE,
  payload: any,
  meta:{
    id: Number
  }
}
interface IPostCaseAction{
  type: typeof CaseTypes.POST_CASE,
  payload: any,
  meta:{
    page: number
  }
}
export type ICaseActionTypes = IGetCasesAction|IPostCaseAction|IDeleteCaseAction|IPutCaseAction
export enum CaseTypes {
  GET_CASES = 'GET_CASES',
  POST_CASE = "POST_CASE",
  DELETE_CASE = "DELETE_CASE",
  PUT_CASE = "PUT_CASE"
}
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
  putCase:(_id:string,status:number, country:string):IPutCaseAction =>{
    return {
      type: CaseTypes.PUT_CASE,
      payload: axios.put('http://localhost:8888/case/',{
        _id:_id,
        status:0,
        country:country,

      })
    }
  }
}
interface ICaseAction{
  type: string,
  payload:{
    status:number,
    data: any
  },
  meta?:{
    id?:string,
    page?: number
  }
}
interface IState{
  count:number,
  results: Array<ICase>
}
