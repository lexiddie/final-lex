import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../assets/galactic.png';

import { auth } from '../../firebase/firebase.utils';
import { signOut } from '../../redux/user/user.actions';
import { cleanData } from '../../redux/main/main.actions';
import { selectIsSignIn } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header = (props) => {
  const { isSignIn, signOut, cleanData, history } = props;

  const handleSignOut = () => {
    signOut();
    cleanData();
    auth.signOut();
    history.push('/home');
  };

  const checkSignIn = () => {
    if (!isSignIn) {
      history.push('/home');
    }
  };

  useEffect(() => {
    checkSignIn();
  }, [isSignIn]);

  return (
    <>
      {isSignIn ? (
        <div className='header'>
          <NavLink className='logo-container' to='/'>
            <img src={Logo} alt='Logo' />
          </NavLink>
          <div className='options'>
            <NavLink className='option' to='/main'>
              Main
            </NavLink>
            <NavLink className='option' to='/category'>
              Category
            </NavLink>
            <div className='option' onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  cleanData: () => dispatch(cleanData())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
