import {
  SAVE_AS_DRAFT_STORY,
  PUBLISH_STORY,
  STORY_ERR,
  GET_STORIES,
  GET_STORY,
  GET_FOLLOWED_PEOPLE_STORIES,
  GET_FOLLOWED_TOPIC_STORIES
} from '../actions/types';
const initialState = {
  story: null,
  stories: [],
  error: {},
  followedTopics: [],
  followedPeople: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUBLISH_STORY:
    case SAVE_AS_DRAFT_STORY:
      return {
        ...state,
        story: action.payload,
        loading: false
      };
    case GET_FOLLOWED_PEOPLE_STORIES:
      return {
        ...state,
        followedPeople: action.payload
      };
    case GET_FOLLOWED_TOPIC_STORIES:
      return {
        ...state,
        followedTopics: action.payload
      };
    case GET_STORY:
      return {
        ...state,
        story: action.payload
      };
    case GET_STORIES:
      return {
        ...state,
        stories: action.payload
      };
    case STORY_ERR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
