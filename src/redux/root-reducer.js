import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import mainReducer from './main/main.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whileList: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  main: mainReducer
});

export default persistReducer(persistConfig, rootReducer);
