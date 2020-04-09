import {
  GET_PROFILE,
  PROFILE_ERR,
  GET_PROFILES,
  CLEAR_PROFILE,
  FOLLOW_ERR,
  FOLLOW_TOPIC,
  UNFOLLOW_TOPIC,
  FOLLOW_PEOPLE,
  UNFOLLOW_PEOPLE,
  MY_PROFILE
} from '../actions/types';

const initialState = {
  myprofile: null,
  profile: null,
  loading: true,
  profiles: [],
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case MY_PROFILE:
      return {
        ...state,
        myprofile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    case FOLLOW_PEOPLE:
    case UNFOLLOW_PEOPLE:
      return {
        ...state,
        myprofile: action.payload
      };
    case UNFOLLOW_TOPIC:
    case FOLLOW_TOPIC:
      return {
        ...state,
        profile: action.payload,
        myprofile: action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        profiles: []
      };
    case FOLLOW_ERR:
    case PROFILE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
