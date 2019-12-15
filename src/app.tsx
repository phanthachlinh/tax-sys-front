import * as React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import promise from 'redux-promise';
import {Provider} from 'react-redux';
import rootReducer from './ducks/rootReducer';
import ClientsPage from './pages/clientsPage';
import {Menu} from './components/menu';
import ClientDetail from './pages/clientDetail';
const store = createStore(rootReducer, applyMiddleware(promise));
export const App = function(){
  return(
    <Provider store={store}>
      <>
        <Menu key='1' />
        <Router>
          <Switch>
          <Route exact path='/' component={ClientsPage}/>
          <Route path='/client/:clientIndex' component={ClientDetail}/>
          </Switch>
        </Router>
      </>
    </Provider>
  )
}
