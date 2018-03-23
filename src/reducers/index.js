import {combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
	posts: postReducer,
	user: userReducer
});

export default rootReducer;

