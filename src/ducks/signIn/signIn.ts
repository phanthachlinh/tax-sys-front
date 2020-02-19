import axios from 'axios';

export default function(state:IUser|null=null,action:any){
  switch (action.type){
    case(SignInTypes.GET_USER):
      if(!action.payload.data)
        return 'fail'
      else
        return {ID:action.payload.data.ID,isManager: action.payload.data.isManager}
    case(SignInTypes.LOG_OUT):
      return null
    default:
        return state
  }
}
export const userActions = {
  signIn: (username:String,password:String)=>{
    return {
      type: SignInTypes.GET_USER,
      payload: axios.get('http://127.0.0.1:8001/user/validate?username='+username+'&password='+password+''),
      meta:{
        username: username
      }
    }
  },
  logout: ()=>{
    return {
      type: SignInTypes.LOG_OUT,
      payload: {}
    }
  }
}
export interface IUser{
  ID: number,
  isManager: boolean
}

export const SignInTypes = {
  GET_USER: 'GET_USER',
  LOG_OUT: 'LOG_OUT'
}
