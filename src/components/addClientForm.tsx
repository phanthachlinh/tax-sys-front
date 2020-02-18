import React from 'react';
import styled from 'styled-components';
import {coming_from,civil_status} from '../pages/clientsPage';
import {StyledButton} from '../shared/styledComponents'
class AddClientForm extends React.Component<IProps,{}>{
  constructor(props:any){
    super(props)
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
    return(
      <StyledForm id="addClient">
        <input type="text" name="first_name" placeholder="First name"/>
        <input type="text" name="last_name" placeholder="Last name"/>
        <select name="coming_from">
          {comingFromJsx}
        </select>
        <input type="date" name="date_of_birth"  placeholder="Date of birth"/>
        <select name="civil_status">
          {civilStatusJsx}
        </select>
        <select name="amount_of_children">
          {amountOfChildrenJsx}
        </select>
        <input type="text" name="home_address" placeholder="Home address"/>
        <input type="text" name="foreign_address" placeholder="Foreign address"/>
        <input type="text" name="email" placeholder="Email"/>
        <input type="text" name="telephone" placeholder="Telephone"/>

      <StyledAddButton onClick={this.props.addClientHandler.bind(this)}>add</StyledAddButton>
      </StyledForm>
    )
  }
}
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  &>*{
    margin:10px 0
  }
`
const StyledAddButton = styled(StyledButton)`
  width:100%;
  background: #080939;
  color:  white;
  padding: 10px 20px;
  border-radius: 10px;
`
interface IProps{
  addClientHandler: any
}
export default AddClientForm
