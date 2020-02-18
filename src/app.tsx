import React from 'react';
import {HashRouter as Router, Route,Switch} from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import promise from 'redux-promise';
import {Provider} from 'react-redux';
import rootReducer from './ducks/rootReducer';
import ClientsPage from './pages/clientsPage';
import LoginPage from './pages/loginPage/loginPage';
import Menu from './components/menu';
import UserStateChecker from './helpers/userStateChecker';
import ClientDetail from './pages/clientDetail/clientDetail';
import { persistStore, persistReducer } from 'redux-persist'
import styled from 'styled-components'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import { MediaQueries } from './shared/mediaQueries';
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

  let store = createStore(persistedReducer, applyMiddleware(promise));
  let persistor = persistStore(store)

  //let persistor = persistStore(createStore(undefined))
  const App = function(){
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <>
            <UserStateChecker />
            <ContentWrapper>
              <Menu />
              <PageWrapper>
              <Route path='/clients' component={ClientsPage} />
              <Route path='/client/:id' component={ClientDetail} />
              </PageWrapper>
            </ContentWrapper>
            </>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}
const PageWrapper = styled.div`
  height: 90vh;
  overflow-y:scroll;
  background:#f0f0f0;
  @media screen and (${MediaQueries.tablet}){
    width:100%;
    height:100vh;
    padding-top:90px;
    overflow-y:auto;
  }
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media screen and (${MediaQueries.tablet}){
    flex-direction: row;

  }
`
export default App
//  <Menu key='1' />
//<Route exact path='/' component={ClientsPage}/>
//  <Route path='/client/:clientIndex' component={ClientDetail}/>
