import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../src/pages/main/main.component';
import Home from '../src/pages/home/home.component';

import { selectIsSignIn } from './redux/user/user.selectors';

import Header from './components/header/header.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './sass/index.scss';

const App = (props) => {
  const { isSignIn } = props;
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/' render={() => (isSignIn ? <Redirect from='*' to='/main' /> : <Redirect from='*' to='/home' />)} />
        <Route path='/home' component={Home} />
        <Route path='/main' component={Main} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn
});

export default withRouter(connect(mapStateToProps)(App));
