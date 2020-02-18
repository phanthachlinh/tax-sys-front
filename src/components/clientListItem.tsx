import React from 'react';
import styled from 'styled-components';
import {IClient ,ClientActions} from '../ducks/client/client'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {StyledButton} from '../shared/styledComponents'
import {coming_from,civil_status} from '../pages/clientsPage';
import {CSSTransition} from 'react-transition-group';
import { StyledRow } from '../shared/styledComponents';
import { MediaQueries } from '../shared/mediaQueries';
class ClientListItem extends React.Component<IProps,{openClient:boolean,isItemMenuOpen:boolean}>{
  constructor(props:IProps){
    super(props);
    this.state={
      openClient:false,
      isItemMenuOpen: false
    }
  }
  handleDelete(id:String){
      this.props.delete(this.props.client._id)
  }
  setupUpdateFormHandler(){
    this.props.showUpdateForm();
    this.props.setUpdatingClientID(this.props.client._id);
  }
  handleViewClient(){
    this.props.history.push('client/'+this.props.client._id)
  }
  handleMobileNavigation(){
    if(window.innerWidth<768){
      if(this.state.isItemMenuOpen){
        this.setState({isItemMenuOpen:false})
      }else{
        this.setState({openClient:true})
      }
    }
  }
  itemMenuClickHandler(){
    this.setState({isItemMenuOpen:!this.state.isItemMenuOpen})
  }
  render(){
    return(
      <>
        {this.state.openClient && <Redirect to={"/client/"+this.props.client._id} />}
        <StyledRow>
          <CSSTransition in={this.state.isItemMenuOpen} timeout={0} >
          <StyledRowInner onClick={this.handleMobileNavigation.bind(this)}>
          <NameWrapper>
          <div>
            First name
          </div>
          <StyledComma className="comma">
            |
          </StyledComma>
          <div>
            {this.props.client.first_name}
          </div>
        </NameWrapper>
        <LastNameWrapper>
          <div>
            Last name
          </div>
          <StyledComma className="comma">
            |
          </StyledComma>
          <div>
            {this.props.client.last_name}
          </div>
        </LastNameWrapper>
        <EmailWrapper>
          <div>
            Email
          </div>
          <StyledComma className="comma">
            |
          </StyledComma>
          <div>
            {this.props.client.email}
          </div>
        </EmailWrapper>
          </StyledRowInner>
          </CSSTransition>
          <ItemMenu style={{display:this.state.isItemMenuOpen?'none':'inline-block'}} src={require('../assets/images/itemMenu.svg').default}  onClick={this.itemMenuClickHandler.bind(this)}/>
          <CSSTransition in={this.state.isItemMenuOpen} timeout={0} >
        <ButtonWrapper>
          <StyledButtonView onClick={this.handleViewClient.bind(this)}><img style={{height: '40px',width:'80px',padding:'5px'}} src={require('../assets/images/view.svg').default} /></StyledButtonView>
          <StyledUpdateButton onClick={this.setupUpdateFormHandler.bind(this)}><img style={{height: '40px',width:'80px',padding:'5px'}} src={require('../assets/images/update.svg').default} /></StyledUpdateButton>
          <StyledDeleteButton onClick={this.handleDelete.bind(this)}><img style={{height: '40px',width:'80px',padding:'5px'}} src={require('../assets/images/delete.svg').default} /></StyledDeleteButton>
        </ButtonWrapper>
        </CSSTransition>
          </StyledRow>
      </>
    )

  }
};
interface IProps{
  position: number,
  client: IClient,
  delete: any,
  showUpdateForm:any,
  history:any,
  setUpdatingClientID:any
}
export interface IClientListItem{
  client: IClient;
  deleteClient:any
}
const ItemMenu = styled.img`
  height: 25%;
  position: absolute;
  right: 22px;
  @media screen and (${MediaQueries.desktop}){
    display: none!important
  }
`
const StyledDeleteButton = styled(StyledButton)`
background:red
`
const StyledUpdateButton = styled(StyledButton)`
  background: lightblue;
`
const StyledRowInner = styled.div`
transition: transform 500ms
&.enter-active{
  transform: translate(0%)
}
&.enter-done{
  transform: translate(-25%)
}
  @media screen and (${MediaQueries.tablet}){
  display: flex;
  flex-basis: 95%;
}
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  top: 0;
  right: 0;
  justify-content: space-between;
  position: absolute;
  width: 50vw;
  height: 100%;
  transform: translate(100%);
  transition: transform 500ms;
  &.enter-active{
    transform: translate(100%)
  }
  &.enter-done{
    transform: translate(0)
  }
  @media screen and (${MediaQueries.tablet}){
    width: 25vw;
  }
  @media screen and (${MediaQueries.desktop}){
    position:relative
    margin-top:0px;
    flex-direction: column;
    flex-basis: 60%;
    justify-content: end;
    flex-direction:row;
    transform: none;
    width: unset;
    height: unset;
    flex-basis: 23%;

  }
`
const StyledButtonView = styled(StyledButton)`
  display:none;
  @media screen and (${MediaQueries.desktop}){
    display:block
  }
`
const NameWrapper = styled.div`
display:flex;
margin-bottom: 5px;
  @media screen and (min-width:768px){
    flex-basis:25%;
    display:block;
    & > span{
      display: none
    }
  }
`
const StyledComma = styled.span`
  margin: 0 3px;
`
const LastNameWrapper = styled(NameWrapper)`
@media screen and (${MediaQueries.tablet}){
      flex-basis: 25%;
}
`;
const EmailWrapper = styled(NameWrapper)`
& > .comma{
  display:none
}
& > :first-child{
  display:none
}
@media screen and (${MediaQueries.tablet}){
  flex-basis:35%
}
@media screen and (${MediaQueries.desktop}){
  flex-basis: 37%!important;
  display:block;
}
`;
const StyledLink = styled(Link)`
  color:black;
  text-decoration:none
`
function mapDispatchToProps(dispatch:any){
  return{
    delete:(id:String)=>{dispatch(ClientActions.deleteClient(id))}
  }
}
const PropNames = {
   first_name: 'First Name',
  last_name: 'Last Name',
  coming_from: 'Ad',
  date_of_birth: 'Date of birth',
  civil_status: 'Civil status',
  amount_of_children: 'Amount of Children',
  home_address: 'Home address',
  foreign_address: 'Foreign address',
  email: 'Email',
  telephone: 'Telephone'
}

export default connect(null, mapDispatchToProps)(ClientListItem)
