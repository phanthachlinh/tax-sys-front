import React from 'react';
import {IMenuItemObj} from './menu';
import styled from 'styled-components';
import {MediaQueries} from '../shared/mediaQueries';
export const MenuItem =  function({item,setIsMenuOpen}:IMenuItemProps){
  console.log(require('../assets/images/'+item.icon))
  return(
    <StyledMenuItem>
      <StyledImage src={require('../assets/images/'+item.icon).default} />
      <span>{item.name}</span>
    </StyledMenuItem>
  )
}
interface IMenuItemProps{
  item: IMenuItemObj;
  setIsMenuOpen?:Function
}
export const StyledImage = styled.img`
  height:7vh;

  @media (${MediaQueries.tablet}){

  }
`
const StyledMenuItem = styled.div`
  width: 80vw;
  display: flex;
align-items: center;
`
