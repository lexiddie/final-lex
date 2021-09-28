import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button.component';

import { signInWithGoogle, auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { selectIsSignIn, selectCurrentUser } from '../../redux/user/user.selectors';
import { setCurrentUser } from '../../redux/user/user.actions';

import './home.styles.scss';

const Home = (props) => {
  const { history, isSignIn, setCurrentUser } = props;
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
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [isSignIn]);
  return (
    <div className='home'>
      <div>
        <div className='preview'>
          <h2>Getting start to reserve your parking spots</h2>
          <CustomButton inverted onClick={signInWithGoogle}>
            Sign in with Google
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
