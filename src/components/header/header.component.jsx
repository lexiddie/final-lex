import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../assets/galactic.png';

import './header.styles.scss';

const Header = (props) => {
  return (
    <>
      <div className='header'>
        <NavLink className='logo-container' to='/'>
          <img src={Logo} alt='Logo' />
        </NavLink>
        <div className='options'>
          <NavLink className='option' to='/main'>
            Main
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default withRouter(connect()(Header));
