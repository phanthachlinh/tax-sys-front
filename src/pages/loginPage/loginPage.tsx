// import React,{Component} from 'react';
// import styled from 'styled-components';
// import {connect} from 'react-redux';
// import {signInAction} from '../../ducks/signInReducer'
// class LoginPage extends Component<IProps,IState>{
//   constructor(props:any){
//      super(props);
//      this.state={
//        username: '',
//        password:''
//      }
//    }
//    componentDidMount(){
//      if(this.props.user!==null&& this.props.user !== 'fail'){
//       this.props.history.push('/clients')
//      }
//    }
//    componentDidUpdate(prevProps: any, prevState: any, snapshot: any){
//      console.log(this.props)
//      if(this.props.user!==null&& this.props.user !== 'fail'){
//       this.props.history.push('/clients')
//      }
//      if(this.props.user === 'fail'){
//       console.log('fail')
//      }
//
//    }
//    changeUsernameHandler(ev:any){
//      this.setState({username:ev.target.value});
//    }
//    changePasswordHandler(ev:any){
//      this.setState({password:ev.target.value});
//    }
//    signInHandler(){
//      this.props.signIn(this.state.username,this.state.password)
//    }
//   render(){
//     return(
//       <LoginBox className={this.props.user === 'fail'?'error':''}>
//       </LoginBox>
//     )
//   }
// }
// LoginPage.propTypes = {
//   user: any
// };
// LoginPage.defaultProps = {
//   user: null
// };
//  interface IState {
//   username: String,
//   password: String
//  }
//  interface IProps{
//   signIn:any;
//    user: any;
//   history: Array<string>
//  }
// const LoginBox = styled.div`
//   position:absolute;
//   left:50%;
//   top: 50%;
//   transform:translate(-50%,-50%);
//   text-align:center;
//   &>*{
//     margin:10px 0
//   }
//   &>label{
//     font-size:75%;
//     color:gray
//   }
//   &.error>input{
//     font-size:75%;
//     color:gray;
//     border-color:red
//   }
// `
// function mapDispatchToProps(dispatch:any){
//   return {
//     signIn:(username:String,password:String)=>{dispatch(signInAction.signIn(username,password))}
//   }
// }
// function mapStateToProps(state:any){
//   return {
//     user: state.user
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)
// export default LoginPage
// class LoginPage extends React.Component{
//   constructor(super){
//     super();
//     this.state={
//       username: '',
//       password:''
//     }
//   }
//   changeUsernameHandler(ev:any){
//     this.setState({username:ev.target.value});
//   }
//   changePasswordHandler(ev:any){
//     this.setState({password:ev.target.value});
//   }
//   signInHandler(){
//     this.props.signIn(this.state.username,this.state.password)
//   }
//   render(){
//     return(
//       <LoginBox>
//         <label htmlFor="username">Username</label>
//         <input type="text" name="username" onChange={this.changeUsernameHandler.bind(this)}/>
//         <label htmlFor="username">Password</label>
//         <input type="password" name="password" onChange={this.changePasswordHandler.bind(this)}/>
//         <button onClick={this.signInHandler.bind(this)}>Sign in</button>
//       </LoginBox>
//     )
//   }
// }
// const LoginBox = styled.div`
//   position:absolute;
//   left:50%;
//   top: 50%;
//   transform:translate(-50%,-50%);
//   text-align:center;
//   &>*{
//     margin:10px 0
//   }
//   &>label{
//     font-size:75%;
//     color:gray
//   }
// `
// function mapDispatchToProps(dispatch:any){
//   return {
//     signIn:(username:String,password:String)=>{dispatch(signInAction.signIn(username,password))}
//   }
// }
// function mapStateToProps(state:any){
//   return {
//     user: state.user
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)
import React,{Component} from 'react';
import styled from 'styled-components';
import {userActions} from '../../ducks/signIn/signIn';
import {connect} from 'react-redux';
import * as H from 'history'
class LoginPage extends Component<IProps,IState>{
    constructor(props:IProps){
      super(props);
      this.state={
        username: '',
        password:'',
        loginError:false
      }
    }
   componentDidMount(){
     if(this.props.user!==null&& this.props.user !== 'fail'){
      this.props.history.push('/clients')
     }
   }
   componentDidUpdate(prevProps: any, prevState: any, snapshot: any){
     if(this.props.user!==null&& this.props.user !== 'fail'){
      this.props.history.push('/clients')
     }
     if(prevProps.user!=='fail' && this.props.user === 'fail'){
       this.setState({loginError:true})
     }

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
      <LoginBox>
        <label htmlFor="username">Username</label>
        <LoginInput loginError={this.state.loginError} type="text" name="username" onChange={this.changeUsernameHandler.bind(this)}/>
        <label htmlFor="username">Password</label>
        <LoginInput loginError={this.state.loginError} type="password" name="password" onChange={this.changePasswordHandler.bind(this)}/>
        <LoginButton onClick={this.signInHandler.bind(this)}>Sign in</LoginButton>
      </LoginBox>
    )
  }
}
export const LoginInput= styled('input')<{loginError:boolean}>`
  border: none;
  border-bottom: 1px solid;
  border-bottom-color:${(props)=>props.loginError?'red':"gray"};
  margin-bottom:15px;
  margin-top:6px;
  text-align:center
`
export const LoginButton = styled.button`
  background: none;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 0px;
  margin-top: 25px;
`
export const LoginBox = styled.div`
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
interface IComponent{

}
interface IProps{
  signIn:any,
  history: any,
  user: any,
}
interface IState{
  username:String,
  password:String,
  loginError:boolean
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
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)
