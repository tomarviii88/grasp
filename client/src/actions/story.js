import {
  SAVE_AS_DRAFT_STORY,
  PUBLISH_STORY,
  STORY_ERR,
  GET_STORIES,
  GET_STORY,
  GET_FOLLOWED_TOPIC_STORIES,
  GET_FOLLOWED_PEOPLE_STORIES
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const saveAsDraft = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(
      'http://localhost:5000/api/story/saveasdraft',
      formData,
      config
    );
    dispatch({
      type: SAVE_AS_DRAFT_STORY,
      payload: res.data
    });

    dispatch(setAlert('Successfully saved as draft', 'success'));
    history.push('/my-stories');
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const publish = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(
      'http://localhost:5000/api/story/publish',
      formData,
      config
    );
    dispatch({
      type: PUBLISH_STORY,
      payload: res.data
    });

    dispatch(setAlert('Successfully Published', 'success'));
    history.push('/my-stories');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const getMyStories = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/story/my-stories');
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStoryById = story_id => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/story/read/${story_id}`
    );
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getFollowedTopicsStories = () => async dispatch => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/story/stories/followed-topics'
    );

    dispatch({
      type: GET_FOLLOWED_TOPIC_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getFollowedPeopleStories = () => async dispatch => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/story/stories/followed-people'
    );
    dispatch({
      type: GET_FOLLOWED_PEOPLE_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const likeStory = story_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/story/like/${story_id}`
    );
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const unlikeStory = story_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/story/unlike/${story_id}`
    );
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const commentStory = (story_id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(
      `http://localhost:5000/api/story/comment/${story_id}`,
      formData,
      config
    );
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (comment_id, story_id) => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/story/delete/${comment_id}/${story_id}`
    );
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStoryByProfile = user_id => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/story/story/${user_id}`
    );
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStoryByTopic = topic => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/story/stories/${topic}`
    );
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getReadingList = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/story/readinglist');
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getBookmarks = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/story/bookmark');
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
