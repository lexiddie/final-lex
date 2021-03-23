import React, { useEffect } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Home from '../src/pages/home/home.component';
import Main from '../src/pages/main/main.component';
import Category from '../src/pages/category/category.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectIsSignIn } from './redux/user/user.selectors';

import Header from './components/header/header.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './sass/index.scss';

const App = (props) => {
  const { isSignIn, setCurrentUser, history } = props;

  const checkSignIn = () => {
    if (isSignIn) {
      history.push('/main');
    }
  };

  useEffect(() => {
    checkSignIn();

    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [isSignIn]);

  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/' render={() => (!isSignIn ? <Redirect from='*' to='/home' /> : null)} />
        <Route path='/home' component={Home} />
        <Route path='/main' component={Main} />
        <Route path='/category' component={Category} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
