import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectIsSignIn } from '../../redux/user/user.selectors';
import { signOut } from '../../redux/user/user.actions';
import { auth } from '../../firebase/firebase.utils';

import Logo from '../../assets/galactic.png';

import './header.styles.scss';

const Header = (props) => {
  const { history, isSignIn, signOut } = props;

  const handleSignOut = () => {
    signOut();
    auth.signOut();
    history.push('/home');
  };

  useEffect(() => {}, [isSignIn]);

  return (
    <>
      <div className='header'>
        <NavLink className='logo-container' to='/'>
          <img src={Logo} alt='Logo' />
        </NavLink>
        <div className='options'>
          {isSignIn ? (
            <div className='option' onClick={handleSignOut}>
              Sign Out
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
