import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

it('should render',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<App />,div)
  ReactDOM.unmountComponentAtNode(div)
})
