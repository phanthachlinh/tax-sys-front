import React from 'react';
import { IRootReducer } from '../ducks/rootReducer';
import { connect } from 'react-redux';
const ClientDetail: React.FunctionComponent<IClientPage> = ({clients,match:{params:{clientIndex}}})=>{
  let client = clients[clientIndex]
  return(
    <div>{client.first_name}</div>
  )
}
interface IClientPage{
  clients: Array<any>,
  match:{
    params: {
      clientIndex: number
    }
  }
}
function mapStateToProps(state:IRootReducer){
  return{
    clients: state.clientsReducer
  }
}
export default connect(mapStateToProps)(ClientDetail)
