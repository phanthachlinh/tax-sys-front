import axios from 'axios';
import { ReactText } from 'react';
export default function(state:Array<any> = [],action:any ){
  switch (action.type){
    case ClientsTypes.GET_CLIENTS:
      return action.payload.data.data.clients
    default:
      return state;

  }
}
enum ClientsTypes{
  GET_CLIENTS = 'GET_CLIENTS'
}
export const ClientActions = {
  getClients:()=>{
    return {
      type:ClientsTypes.GET_CLIENTS,
      payload: axios({
        url:'http://localhost:4000/',
        method: 'post',
        data:{
          query:`
          {
            clients{
              _id
              first_name
              last_name
            }
          }
          `
        }
      })
    }
  }
}
export interface IClient{
  _id: ReactText;
  first_name: String;
  last_name: String;
}
