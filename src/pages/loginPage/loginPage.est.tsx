import React from 'react';
import ReactDOM from 'react';
import LoginPage,{LoginBox} from './loginPage';
import Enzyme,{mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import {Router,} from 'react-router-dom'
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });
describe('Login Page',()=>{
  let store:any;
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });
  });
  // it('should contain 1 div',()=>{
  //   const page = mount(<Provider store={store}><Router><LoginPage /></Router></Provider>);
  //   expect(page.find(LoginBox).length).toBe(1)
  // })
})
