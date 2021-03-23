import { MainActionTypes } from './main.types';

const INITIAL_STATE = {
  journals: [],
  categories: [],
  categoryId: ''
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MainActionTypes.SET_JOURNALS:
      return {
        ...state,
        journals: action.payload
      };
    case MainActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case MainActionTypes.SET_CATEGORY:
      return {
        ...state,
        categoryId: action.payload
      };
    case MainActionTypes.CLEAN_DATA:
      return {
        journals: [],
        categories: [],
        categoryId: ''
      };
    default:
      return state;
  }
};

export default mainReducer;
