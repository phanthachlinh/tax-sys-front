import * as React from 'react';
import {connect} from 'react-redux';
import {ClientActions, IClient} from '../ducks/clientsReducer';
import ClientListItem from '../components/clientListItem';
interface ClientsPageProps{
  getClients: any,
    clients: Array<IClient>
}
interface ClientsPageState{

}
class ClientsPage extends React.Component<ClientsPageProps,ClientsPageState>{
  componentDidMount(){
    this.props.getClients()
  }
  componentDidRecievedProps(prevProps:any,prevState:any){
    if(prevProps.clients != this.props.clients){

    }
  }
  render(){
    let clientsJSX = this.props.clients.map((client:IClient)=>{
      let position = this.props.clients.indexOf(client);
      return(
        <ClientListItem key={position} position={position} client={client} />
      )
    })
      return(<div>{clientsJSX}</div>)
  }

}
function mapStateToProps(state:any){
  return{
    clients: state.clientsReducer
  }
}
function mapDispatchToProps(dispatch:any){
  return{
    getClients: ()=>dispatch(ClientActions.getClients())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClientsPage)
