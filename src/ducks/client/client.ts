import axios from 'axios';
export default function(state: {count:number,results:Array<IClient>} = {count:0,results:[]},action:any ){
  switch (action.type){
    case ClientTypes.GET_CLIENTS:
      if(action.payload.status !== 200){
        return state
      }
      return {
        page:action.payload.meta.page,
        count:action.payload.data.count,
        results:action.payload.data.results}
    case ClientTypes.DELETE_CLIENT:

      if(action.payload.status === 200){
        let newState:any = {};
        newState.results = state.results.filter(function(value:IClient, _index:number){
          return value._id != action.payload.data._id
        });
        newState.count = state.count - 1
        newState.action = ClientTypes.DELETE_CLIENT
        return newState
      }
      return state;
    case ClientTypes.POST_CLIENT:
      if(action.payload.status === 200&&action.meta.page===1){
        state.results.pop();
        state.results.unshift(action.payload.data)
        return {...state}
      }
      return state;
    case ClientTypes.PUT_CLIENT:
      let updatedClientIndex = state.results.findIndex(function(value:IClient, _index:number){
        return value._id === action.payload.data._id
      });
      state.results[updatedClientIndex] = action.payload.data;
      return {...state};
    default:
      return state;

  }
}
export interface IClient{
  _id: string,
  amount_of_children: Number,
  civil_status: Number,
  coming_from: Number,
  date_created: String,
  date_of_birth: String,
  email: String,
  first_name: String,
  foreign_address: String,
  home_address: String,
  last_name: String,
  telephone: String,
}
export enum ClientTypes{
  GET_CLIENTS = 'GET_CLIENTS',
  DELETE_CLIENT = 'DELETE_CLIENT',
  POST_CLIENT = 'POST_CLIENT',
  PUT_CLIENT = 'PUT_CLIENT'
}
export const ClientActions:IClientActions = {
  getClients:(page:Number,searchTerm:string)=>{
    return {
      type:ClientTypes.GET_CLIENTS,
      payload: axios.get('http://localhost:8888/client/?page='+page+'&searchTerm='+searchTerm),
      meta:{
        page
      }
    }
  },
  deleteClient:(id:String)=>{
    return {
      type:ClientTypes.DELETE_CLIENT,
      payload: axios.delete('http://localhost:8888/client',{
        data: {_id: id}
      })
    }
  },
  updateClient:(data:FormData)=>{
    return {
      type:ClientTypes.PUT_CLIENT,
      payload: axios({
          url:'http://localhost:8888/client',
          method:'put',
          data: data,
          headers: {'Content-Type': 'multipart/form-data' }
      })
    }
  },
  postClient:(formData:FormData,page:Number)=>{
    return {
      type:ClientTypes.POST_CLIENT,
      payload: axios({url:'http://localhost:8888/client',
                  method:'post',
                  data: formData,
                headers: {'Content-Type': 'multipart/form-data' }
              }),
      meta:{
        client:formData,
        page: page
      }
    }
  }
}
interface IClientActions{
  getClients:any,
  deleteClient:any,
  postClient:any,
  updateClient:any
}
