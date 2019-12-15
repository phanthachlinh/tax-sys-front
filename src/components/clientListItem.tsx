import React from 'react';
import { IClient } from '../ducks/clientsReducer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default function ClientListItem({position,client}:IClientListItem){
  return(
    <Link to={'/client/'+position}>
      <StyledRow>
        <div>
          {client.first_name}
        </div>
        <div>
          {client.last_name}
        </div>
      </StyledRow>
    </Link>
  )
};

export interface IClientListItem{
  client: IClient;
  position: Number
}
const StyledRow = styled.div`
  width:100%;
  padding: 20px;
  display: flex;
  &>div{
    margin-right:10px;
  }
`
