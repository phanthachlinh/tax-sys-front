import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {StyledForm} from './addClientForm'
import {ClientActions} from '../ducks/client/client'
import {coming_from,civil_status} from '../pages/clientsPage';
import {StyledButton} from '../shared/styledComponents'
class UpdateClientForm extends React.Component<IProps,IState>{
  constructor(props:any){
    super(props);
    this.state={
      _id:'',
      first_name:'',
      last_name:'',
      coming_from:'',
      date_of_birth:'',
      civil_status:0,
      amount_of_children:0,
      home_address:'',
      foreign_address:'',
      email:'',
      telephone:''
    }
  }
  componentDidUpdate(prevProps:any){
    if(prevProps.clientID !== this.props.clientID){
      let updatingClient = this.props.clients.results.find((client:any)=>client._id === this.props.clientID);
        this.setState(updatingClient)
    }
  }
  hideUpdateFormHandler(){
      this.props.hideUpdateForm();
  }
  updateClientHandler(e:any){
    e.preventDefault()
    let formData: any = new FormData((document.getElementById('updateClient') as unknown) as HTMLFormElement);
    formData.append('_id', this.props.clientID);
    this.props.updateClient(formData)

  }
  handleInput(e:any){
    let newChange:any = {};
    newChange[e.target.name] = e.target.value
    this.setState(newChange)
  }
  render(){
    let comingFromJsx = coming_from.map((el)=>{
      return <option key={coming_from.indexOf(el)} value={coming_from.indexOf(el)}>{el}</option>
    })
    let civilStatusJsx = civil_status.map((el)=>{
      return <option key={civil_status.indexOf(el)} value={civil_status.indexOf(el)}>{el}</option>
    })
    let amountOfChildrenJsx = [];
    for(let i = 0; i<10;i++){
      amountOfChildrenJsx.push(<option key={i} value={i}>{i}</option>)
    }
    let updatingClient = this.props.clients.results.find((client:any)=>client._id === this.props.clientID);
    if(updatingClient)
    return(
      <UpdateClientWrapper className={this.props.showUpdateForm?'show':''}>
        <button onClick={this.hideUpdateFormHandler.bind(this)}>Close</button>
        <StyledForm id="updateClient">
          <span >first name</span>
          <input type="text" name="first_name" onChange={this.handleInput.bind(this)}  value={this.state.first_name}/>
          <span >last name</span>
          <input type="text" name="last_name" onChange={this.handleInput.bind(this)} value={this.state.last_name}/>
          <span >coming from</span>
          <select name="coming_from" onChange={this.handleInput.bind(this)} value={this.state.coming_from}>
            {comingFromJsx}
          </select>
          <span >date of birth</span>
          <input type="date" name="date_of_birth" onChange={this.handleInput.bind(this)} value={this.state.date_of_birth}/>
          <span >civil status</span>
          <select name="civil_status" onChange={this.handleInput.bind(this)} value={this.state.civil_status}>
            {civilStatusJsx}
          </select>
          <span >amount of children</span>
          <select name="amount_of_children" onChange={this.handleInput.bind(this)} value={this.state.amount_of_children}>
            {amountOfChildrenJsx}
          </select>
          <span >home_address</span>
          <input type="text" name="home_address" onChange={this.handleInput.bind(this)} value={this.state.home_address}/>
          <span >foreign_address</span>
          <input type="text" name="foreign_address" onChange={this.handleInput.bind(this)} value={this.state.foreign_address}/>
          <span >email</span>
          <input type="text" name="email" onChange={this.handleInput.bind(this)} value={this.state.email}/>
          <span >telephone</span>
          <input type="text" name="telephone" onChange={this.handleInput.bind(this)} value={this.state.telephone}/>
          <StyledButton onClick={this.updateClientHandler.bind(this)}>add</StyledButton>
          </StyledForm>

      </UpdateClientWrapper>
    )
    else
      return(<div></div>)
  }
}
interface IProps{
  showUpdateForm:boolean,
  clientID:any,
  clients:any,

  updateClient:any,
  hideUpdateForm:any
}
interface IState{
  _id:String,
  first_name:string,
  last_name:string,
  coming_from:string,
  date_of_birth:string,
  civil_status:number,
  amount_of_children:number,
  home_address:string,
  foreign_address:string,
  email:string,
  telephone:string
}
const UpdateClientWrapper = styled.div`
  display:none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.8);
  z-index: 1;
  &.show{
    display:block
  }
`
function mapStateToProps(state:any){
  return{
    clients: state.clientsReducer
  }
}
function mapDispatchToProps(dispatch:any){
  return{
    updateClient: (data:any)=>{dispatch(ClientActions.updateClient(data))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UpdateClientForm)
