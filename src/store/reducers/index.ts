import { combineReducers } from 'redux';
import userLoginReducer from './userloginReducer';

const rootReducer = combineReducers({
  userlogin: userLoginReducer,
});

export default rootReducer;