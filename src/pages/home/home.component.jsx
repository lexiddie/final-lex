import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../../components/custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './home.styles.scss';

const Home = (props) => {
  return (
    <div className='home'>
      <div>
        <div className='preview'>
          <h2>Getting start to record your money now</h2>
          <CustomButton inverted onClick={signInWithGoogle}>
            Sign in with Google
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default connect()(Home);
