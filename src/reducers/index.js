import {combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer'

const rootReducer = combineReducers({
	posts: postReducer,
	user: userReducer,
	loading: loadingReducer
});

export default rootReducer;

