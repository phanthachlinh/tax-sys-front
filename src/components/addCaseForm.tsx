import React from 'react';
import {getNameList} from 'country-list';
import {CaseActions} from '../ducks/case/case'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IClient } from '../ducks/client/client';
interface IState{
  countryCodes: Array<string>
}
interface IProps{
  show: boolean,
  page:number,
  addCase:any,
  user: any,
  client:IClient
}

class AddCaseForm extends React.Component<IProps,{}>{



  addCaseHandler(e: { preventDefault: () => void; }){
    e.preventDefault()
    let formx:any = document.querySelector('form select')
    this.props.addCase(formx.value,1,this.props.user.ID,this.props.client._id)
  }
  componentDidUpdate(prevProps:IProps){
  }
  render(){/*
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
    )
  }*/
  let nameList = getNameList()
  let countryOptionJSX = Object.keys(nameList).map((countryName:string)=>{
          return <option value={nameList[countryName]}>{countryName}</option>
        })

    return(
      <FormWrapper show={this.props.show}>
        <StyledForm>
            <select>
              {countryOptionJSX}
            </select>
          <button onClick={this.addCaseHandler.bind(this)}>Add</button>
        </StyledForm>
      </FormWrapper>
    )
  }

}
const FormWrapper = styled('div')<{show:boolean}>`
    display:${(props)=>props.show?'fixed':'none'}
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
    addCase: (casex:any,page:number,userId:number,clientId:string)=>{dispatch(CaseActions.postCase(casex,page,userId,clientId))},
  }
}
function mapStateToProps(state:any){
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddCaseForm)
