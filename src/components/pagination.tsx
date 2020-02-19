import React from 'react';
import styled from 'styled-components';
import { ClientActions } from '../ducks/client/client';
import { connect } from 'react-redux';
import { MediaQueries } from '../shared/mediaQueries';
class Pagination extends React.Component<{totalCount:number,getClients:any,activePage:number,searchTerm:string},{}>{
  getClientsHandler(pageNumber:number){
    this.props.getClients(pageNumber,this.props.searchTerm)
  }
  render(){
    const pageItems:Array<any>=[]
    let pageCount = (this.props.totalCount - (this.props.totalCount%5))/5
    getPaginationItems(this.props.totalCount,this.props.activePage).map((i:number)=>{
      pageItems.push(<PageNumber active={this.props.activePage==i} onClick={this.getClientsHandler.bind(this,i)}>{i}</PageNumber>)
    })
    return(
      <PaginationWrapper>
        <PageNumber onClick={()=>{if(this.props.activePage>1) this.props.getClients(this.props.activePage-1,this.props.searchTerm)}} active={this.props.totalCount>5&&this.props.activePage>1}>
          <StyledArrow next={false} src={require('../assets/images/previous.svg').default} />
        </PageNumber>
        {pageItems}
        <PageNumber onClick={()=>{if(this.props.totalCount>this.props.activePage*5) this.props.getClients(this.props.activePage+1,this.props.searchTerm)}} active={this.props.totalCount>this.props.activePage*5}>
          <StyledArrow next={true} src={require('../assets/images/previous.svg').default} />
        </PageNumber>
      </PaginationWrapper>
    )
  }
}
function getPaginationItems(totalCount:number,activePage:number){
  let totalPages
  let pagesBefore = [];
  if(activePage == 2)
    pagesBefore.push(1)
  if(activePage>=3){
    pagesBefore.push(activePage-2);
    pagesBefore.push(activePage-1);
  }
  pagesBefore.push(activePage);
  if(totalCount-activePage*5>=6){
    pagesBefore.push(activePage+1);
  }
  if(totalCount-activePage*5>=11){
    pagesBefore.push(activePage+2);
  }
  return pagesBefore

}
const StyledArrow = styled.img<{next:boolean}>`
  height:18px;
  transform: rotate(${props=>{return props.next?'0deg':'180deg'}});
  color:white
`
const PaginationWrapper = styled.div`
display:flex;
justify-content: space-between;
@media screen and (${MediaQueries.tablet}){
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  display: inline-flex;
}
`
const PageNumber = styled.div<{active:boolean}>`
padding: 10px;
background:${(props)=>{return props.active?'#080939':'#eee'}};
color:${(props)=>{return props.active?'white':'black'}};
border-radius: 5px;
margin: 5px;
`
function mapDispatchToProps(dispatch:any){
  return{
    getClients: (page:number,searchTerm:string)=>{dispatch(ClientActions.getClients(page,searchTerm))}
  }
}
export default connect(null, mapDispatchToProps)(Pagination)
