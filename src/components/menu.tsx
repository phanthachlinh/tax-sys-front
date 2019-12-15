import React, { useState } from 'react';
import styled from 'styled-components';
import {MenuItem, StyledImage} from './menuItem';
import { MediaQueries } from '../shared/mediaQueries';
export const Menu:any= ()=>{
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  let menuItemsJSX: Array<JSX.Element> = menuItems.map(
    (menuItem:IMenuItemObj)=>{return(<MenuItem key={menuItems.indexOf(menuItem)} item={menuItem} setIsMenuOpen={setIsMenuOpen}/>)}
  )

  return(
    <StyledMenu>

      <div>
        <StyledImage
        src={require('../assets/images/menu.png').default}
        onClick={()=>{setIsMenuOpen(true)}}/>
        </div>
      <StyledMenuIconsWrapper className={isMenuOpen?'open':''} >
      <div>
        <StyledImage
        src={require('../assets/images/close.png').default}
        onClick={()=>{setIsMenuOpen(false)}}/>
      </div>
      {menuItemsJSX}
      </StyledMenuIconsWrapper>
    </StyledMenu>
  )
}
const menuItems: Array<IMenuItemObj> = [{
  name: 'Clients',
  location: ' ',
  icon: 'clients.png'

}];

const StyledMenuItem = styled.div`
`

interface IMenu{
  props: any,
  key:any,
  type:any
}

const StyledMenu = styled.div`
  width: 100vw;
  height: 10vh
  @media (${MediaQueries.tablet}){

  }
`
const StyledMenuIconsWrapper = styled.div`
  position: fixed;
  height:100vh;
  top:0;
  transition: width 1s;
  width:0%;
  background:green;
  overflow-x:hidden;
  &.open{
    width:80%;
  }
  @media (${MediaQueries.tablet}){

  }
`
export interface IMenuItemObj{
  name: String,
  location: String,
  icon: String
}
