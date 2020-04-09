import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import explore from './explore';
import story from './story';

export default combineReducers({ alert, auth, profile, explore, story });
