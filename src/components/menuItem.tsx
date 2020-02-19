import React from 'react';
import {IMenuItemObj} from './menu';
import styled from 'styled-components';
import {MediaQueries} from '../shared/mediaQueries';
export const MenuItem =  function({item,logoutHandler}:IMenuItemProps){
  return(
    <StyledMenuItem onClick={()=>{if(logoutHandler!==null) logoutHandler()}}>
      <StyledImage src={require('../assets/images/'+item.icon).default} />
      {/*<span>{item.name}</span>*/}
    </StyledMenuItem>
  )
}
interface IMenuItemProps{
  item: IMenuItemObj,
  setIsMenuOpen?:Function,
  logoutHandler:Function|null
}
export const StyledImage = styled.img`
  height: 33%;

  @media (${MediaQueries.tablet}){
    height: unset;
    width:80px;
    padding: 0 10px;
    height: 45px;
    object-fit: contain;
  }
`
const StyledMenuItem = styled.div`
text-align:center;
height:100%;
display:flex;
align-items: center;
@media screen and (${MediaQueries.tablet}){
  height:unset;
  padding: 22px 11px;
}
`
