import React from 'react'
import styled from 'styled-components'
import { CaseActions } from '../ducks/case/case';
import {getNameList} from 'country-list';
import { connect } from 'react-redux';
import { ICase } from '../ducks/case/case.types';
class UpdateCaseForm extends React.Component<IProps,{case:ICase,newCountry:string}>{
  constructor(props:any){
    super(props);
    this.state={
      case:{_id:'',status:0,country:'',date_created:'',FK_User:0,FK_Mongo_Client:''},
      newCountry: ''
    }
  }

  componentDidUpdate(prevProps:any){

    if(prevProps.updatingCase._id !== this.props.updatingCase._id){
      this.setState({case:this.props.updatingCase,newCountry:this.props.updatingCase.country})
    }
  }
  updateCaseHandler(ev:any){
    ev.preventDefault()
    this.props.updateCase(this.props.updatingCase._id,0,this.state.newCountry,this.props.page,this.props.date_created,1,this.props.clientId)
  }
  changeCountryValueHandler(ev:any){
    this.setState({newCountry:ev.target.value})
  }
  render(){
    /*
    let nameList = getNameList();

    let selectJsx=[]
    for(let i = 0; i<=this.state.countryCodes.length;i++){

    selectJsx.push( <><select
      key={i}
      data-position={i}
      className={i<this.state.countryCodes.length?'selected':''}
      onChange={this.countrySelectedHandler.bind(this)}
      value={i<this.state.countryCodes.length?this.state.countryCodes[i]:''}
      name="country1">
      <option>Select Country</option>
      {
        Object.keys(nameList).map((countryName:string)=>{
          return <option value={nameList[countryName]}>{countryName}</option>
        })
      }
    </select>{i!=this.state.countryCodes.length? <button onClick={this.removeSelectHandler.bind(this,i)}>remove</button>:''}</>
    */
    let nameList = getNameList()
    let countryOptionJSX = Object.keys(nameList).map((countryName:string)=>{
            return <option value={nameList[countryName]}>{countryName}</option>
          })



    return(
      <UpdateFormWrapper show={this.props.show}>
      <StyledForm id="updateForm">
        <select value={this.state.newCountry} onChange={this.changeCountryValueHandler.bind(this)}>
          {countryOptionJSX}
        </select>
        <button onClick={this.updateCaseHandler.bind(this)}>Update</button>
      </StyledForm>
      </UpdateFormWrapper>
    )
  }
}
const UpdateFormWrapper = styled('h4')<{show:boolean}>`
  display: ${(props)=>props.show?'block':'none'};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: ;
  background:
  rgba(255,255,255,0.8);
`
const StyledForm = styled.form`
  display:flex;
  flex-direction: column;
  position: absolute;
 top: 25%;
 left: 50%;
  transform: translate(-50%);`
function mapDispatchToProps(dispatch:any){
  return{
    updateCase: (_id:string,status:number,country:string)=>{dispatch(CaseActions.putCase(_id,status,country))}
  }
}
interface IProps{
  show:boolean,updatingCase:ICase,updateCase:any,page:number,clientId:string,date_created:string
}
export default connect(null,mapDispatchToProps)(UpdateCaseForm)
