import React,{Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { userActions, IUser } from '../../ducks/signIn/signIn';
import { Redirect } from 'react-router-dom';
export class LoginBox extends Component<IProps,IState>{
    constructor(props:IProps){
      super(props);
      this.state={
        username: '',
        password:'',
        loginError:false,
        isUserLoggedIn:false
      }
    }
   componentDidMount(){
     if(this.props.user!==null&&!this.state.isUserLoggedIn)
      this.setState({isUserLoggedIn:true})

   }
   componentDidUpdate(){
     if(this.props.user!==null&&!this.state.isUserLoggedIn)
      this.setState({isUserLoggedIn:true})
   }
    changeUsernameHandler(ev:any){
      this.setState({username:ev.target.value});
    }
    changePasswordHandler(ev:any){
      this.setState({password:ev.target.value});
    }
    signInHandler(){
      this.props.signIn(this.state.username,this.state.password)
   }
  render(){
    return(
      <>
        {this.state.isUserLoggedIn&&<Redirect to="/clients"/>}
        <LoginWrapper>
          <label htmlFor="username">Username</label>
          <LoginInput loginError={this.state.loginError} type="text" name="username" onChange={this.changeUsernameHandler.bind(this)}/>
          <label htmlFor="password">Password</label>
          <LoginInput loginError={this.state.loginError} type="password" name="password" onChange={this.changePasswordHandler.bind(this)}/>
          <LoginButton onClick={this.signInHandler.bind(this)}>Sign in</LoginButton>
        </LoginWrapper>
      </>
    )
  }
}
const LoginInput= styled('input')<{loginError:boolean}>`
  border: none;
  border-bottom: 1px solid;
  border-bottom-color:${(props)=>props.loginError?'red':"gray"};
  margin-bottom:15px;
  margin-top:6px;
  text-align:center
`
LoginInput.displayName = "LoginInput";

export const LoginButton = styled.button`
  background: none;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 0px;
  margin-top: 25px;
`
LoginButton.displayName = "LoginButton"
export const LoginWrapper = styled.div`
  position:absolute;
  left:50%;
  top: 50%;
  transform:translate(-50%,-50%);
  display: flex;
flex-direction: column;
  text-align:center;
  &>label{
    color:gray
  }
`

interface IProps{
  signIn:any,
  user: IUser|null
}
interface IState{
  username:String,
  password:String,
  loginError:boolean,
  isUserLoggedIn:boolean
}
function mapDispatchToProps(dispatch:any){
  return {
    signIn:(username:String,password:String)=>{dispatch(userActions.signIn(username,password))}
  }
}
function mapStateToProps(state:any){
  return {
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginBox)
