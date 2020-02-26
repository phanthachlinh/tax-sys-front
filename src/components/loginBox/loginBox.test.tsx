import React from 'react';
import Enzyme,{shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16'
import {LoginBox} from './loginBox'
import { IUser } from '../../ducks/signIn/signIn';
Enzyme.configure({ adapter: new Adapter() });
describe('Check Loginbox content',()=>{
  it('should contain User name label',()=>{
    const component = shallow(<LoginBox signIn={()=>{}} user={null}/>)
    expect(component.contains(
      <label htmlFor="username">
        Username
      </label>
    )).toBeTruthy()
  })
  it('should contain Password Label',()=>{
    const component = shallow(<LoginBox signIn={()=>{}} user={null}/>)
    expect(component.contains(
      <label htmlFor="password">Password</label>
    )).toBeTruthy()
  })
  it('should contain 2 inputs',()=>{
    const component = shallow(<LoginBox signIn={()=>{}} user={null}/>)
    expect(component.find(
      'LoginInput'
    ).length).toBe(2)
  })
  it('should contain A login button',()=>{
    const component = shallow(<LoginBox signIn={()=>{}} user={null}/>)
    expect(component.find(
      'LoginButton'
    ).length).toBe(1)
  })
  it('should contain login button "Sign In" text',()=>{
    const component = shallow(<LoginBox signIn={()=>{}} user={null}/>)
    expect(component.find(
      'LoginButton'
    ).text()).toBe('Sign in')
  })
  it('should match the snapshot',()=>{

    expect(shallowToJson(shallow(<LoginBox signIn={()=>{}} user={null}/>))).toMatchSnapshot()
  })
  it('should contain a navigate component',()=>{
    let user:IUser = {ID:6,isManager:true}
    expect(shallow(<LoginBox signIn={()=>{}} user={user}/>).find('Redirect').length).toBe(1)
  })
})
