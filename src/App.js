import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../src/pages/main/main.component';

import Header from './components/header/header.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './sass/index.scss';

const App = (props) => {
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <Redirect from='*' to='/main' />} />
        <Route path='/main' component={Main} />
      </Switch>
    </div>
  );
};

export default withRouter(connect()(App));
