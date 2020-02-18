import React from 'react'
import { StyledRow, StyledButton } from '../shared/styledComponents'
import { CaseActions } from '../ducks/case/case';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MediaQueries } from '../shared/mediaQueries';
class CaseListItem extends React.Component<IProps,{show:boolean,dateCreatedFormatted:string}>{
  constructor(props:IProps){
    super(props);
    this.state={
      show: false,
      dateCreatedFormatted:''
    }
  }
  componentDidMount(){
    let dateObj:number = Date.parse(this.props.date_created)
    let d = new Date(dateObj)
    this.setState(
      {
        dateCreatedFormatted:d.getDay() +'/'+ d.getMonth() +'/'+ d.getFullYear()
      }
    )
  }
  deleteCaseHandler(){
    this.props.deleteCase(this.props.caseId)
  }
  changeShowHandler(){
    this.setState({show:!this.state.show})
  }
  render(){
  return(
    <StyledRow>
    <CountryWrapper>
      <div>{this.props.country}</div>
    </CountryWrapper>
    <StatusWrapper>
        <div>{this.props.status}</div>
    </StatusWrapper>
    <DateCreated>
      <div>{this.state.dateCreatedFormatted}</div>
    </DateCreated>

      <ButtonWrapper>

        <StyledButton onClick={()=>{this.props.showUpdateForm();this.props.setUpdatingCaseIdHandler()}}>update</StyledButton>
        <StyledButton onClick={this.deleteCaseHandler.bind(this)}>delete</StyledButton>
        <StyledButton onClick={this.props.showNotesHandler}>Notes</StyledButton>
        <StyledButton onClick={this.props.showFilesHandler}>Files</StyledButton>
      </ButtonWrapper>
    </StyledRow>
  )
}
}
const StatusWrapper= styled.div`
  flex-basis: 15%;
`
const CountryWrapper= styled.div`
  flex-basis: 15%;
`
const DateCreated= styled.div`
  flex-basis: 15%;
`
interface IProps {
    id: string,
    country: string,
    status: Number,
    date_created: string,
    deleteCase: any,
    caseId:string,
    showUpdateForm:any,
    setUpdatingCaseIdHandler:any,
    showNotesHandler:any,
    showFilesHandler:any
}
const ButtonWrapper = styled.div`
display: flex;
flex-direction: column;
flex-basis:55%;
@media screen and (${MediaQueries.tablet}){
  flex-basis: 55%;
  justify-content: end;
  flex-direction:row
}
@media screen and (${MediaQueries.desktop}){
  flex-basis: 55%;

}
`
function mapDispatchToProps(dispatch:any){
  return{
    deleteCase: (caseId:number)=>dispatch(CaseActions.deleteCase(caseId))
  }
}
export default connect(null, mapDispatchToProps)(CaseListItem)
