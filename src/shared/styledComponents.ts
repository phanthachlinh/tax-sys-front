import styled from 'styled-components';
import { MediaQueries } from './mediaQueries';
export const StyledRow = styled.div`
  display:flex;
  position:relative;
  padding: 20px;
  flex-basis:100%;
  flex-direction:row;
  background:white;
  overflow-x: hidden;
  @media screen and (${MediaQueries.tablet}){
    margin: 20px;
  }
  @media screen and (${MediaQueries.desktop}){


    margin:0;
    flex-direction:row;
    border-bottom: solid 1px gainsboro;
    flex-basis: calc(100% - 44px);
    margin-bottom: 20px;
  }
`
export const StyledButton = styled.button`
  background: none;
  border-radius: 5px;
  border-style: solid
  margin: 5px 0;
  width:50%;
  &:hover{
    color: white;
    background: blue;
    border-color: blue;
  }
  @media screen and (${MediaQueries.tablet}){
    height:40px;
  }
  `
