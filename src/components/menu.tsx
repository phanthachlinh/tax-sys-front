import React, { useState } from 'react';
import styled from 'styled-components';
import {MenuItem, StyledImage} from './menuItem';
import { MediaQueries } from '../shared/mediaQueries';
import { connect } from 'react-redux';
import { userActions } from '../ducks/signIn/signIn';
const Menu:any= (props:any)=>{
  const [isMenuOpen,setIsMenuOpen] = useState(true);
  let menuItemsJSX: Array<JSX.Element> = menuItems.map(
    (menuItem:IMenuItemObj)=>{return(<MenuItem key={menuItems.indexOf(menuItem)} logoutHandler={null} item={menuItem} setIsMenuOpen={setIsMenuOpen}/>)}
  )
  let logoutHandler:any = (props:any)=>{
    props.logout()
  }
  return(
    <StyledMenu>

      <MenuIconWrapper>
        <MenuIcon
        src={require('../assets/images/menu.png').default}
        onClick={()=>{setIsMenuOpen(true)}}/>
      </MenuIconWrapper>
      <StyledMenuIconsWrapper className={isMenuOpen?'open':''} >
        {/*
        <div>
          <CloseIcon
          src={require('../assets/images/close.png').default}
          onClick={()=>{setIsMenuOpen(false)}}/>
        </div>*/}
        {menuItemsJSX}
        <MenuItem logoutHandler={logoutHandler.bind(this,props)} key={-1} item={
          {
            name: 'Logout',
            location: '',
            icon: 'logout.svg'
          }
        }/>
      </StyledMenuIconsWrapper>
    </StyledMenu>
  )
}
function mapDispatchToProps(dispatch:any){
  return {
    logout: ()=>{dispatch(userActions.logout())}
  }
}
export default connect(null, mapDispatchToProps)(Menu)
const menuItems: Array<IMenuItemObj> = [
  {
    name: 'Clients',
    location: ' ',
    icon: 'clients.svg'
  },
  {
      name: 'Cases',
      location: ' ',
      icon: 'case.svg'
    }
];
const MenuIconWrapper = styled.div`
  display:none
`
const MenuIcon = styled.img`

`
const CloseIcon = styled.img`

`
const StyledMenuItem = styled.div`
`

interface IMenu{
  props: any,
  key:any,
  type:any
}

const StyledMenu = styled.div`
background: #080939;
height:10vh;
@media screen and (${MediaQueries.tablet}){
  height:unset;

}
`
const StyledMenuIconsWrapper = styled.div`
display: flex;
align-items: center;
  justify-content: space-between;
  height:100%;
  @media screen and (${MediaQueries.tablet}){
    padding-top: 79px;
    flex-direction:column;
    display:block
  }
`
export interface IMenuItemObj{
  name: String,
  location: String,
  icon: String
}
