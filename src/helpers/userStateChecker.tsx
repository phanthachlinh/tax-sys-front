import React from 'react';
import { connect } from 'react-redux';
import {userActions, IUser} from '../ducks/signIn/signIn'
import { Redirect } from 'react-router-dom';
class UserStateChecker extends React.Component<{user:IUser|null},{}>{

  render(){
    return(
      <>
        {this.props.user ===null &&<Redirect to="/"/>}
      </>)
  }
}
function mapStateToProps(state:any){
  return{
    user:state.user
  }
}
function mapDispatchToProps(dispatch:any){
  return{
    logout:()=>{dispatch(userActions.logout())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserStateChecker)
