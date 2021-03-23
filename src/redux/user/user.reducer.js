import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isSignIn: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isSignIn: true
      };
    case UserActionTypes.SIGN_IN_OUT:
      return {
        ...state,
        currentUser: null,
        isSignIn: false
      };
    default:
      return state;
  }
};

export default userReducer;
