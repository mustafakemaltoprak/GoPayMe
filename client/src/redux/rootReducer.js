import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import fundraiserReducer from './reducers/fundraiserReducers';
import userReducer from './reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  fundraiser: fundraiserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
