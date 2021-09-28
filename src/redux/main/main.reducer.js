import { MainActionTypes } from './main.types';

const INITIAL_STATE = {
  requests: []
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MainActionTypes.SET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    default:
      return state;
  }
};

export default mainReducer;
