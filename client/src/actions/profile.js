import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERR,
  CLEAR_PROFILE,
  FOLLOW_ERR,
  FOLLOW_TOPIC,
  UNFOLLOW_TOPIC,
  FOLLOW_PEOPLE,
  UNFOLLOW_PEOPLE,
  MY_PROFILE
} from './types';
import { setAlert } from './alert';

//Get the current user
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all the profiles
export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(
      'http://localhost:5000/api/profile',
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    history.push('/profile/me');
    dispatch(setAlert('Profile Updated', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const followTopic = title => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/follow-topic/${title}`
    );
    dispatch({
      type: FOLLOW_TOPIC,
      payload: res.data
    });
    dispatch(setAlert(`${title} added to your list`, 'success'));
  } catch (err) {
    dispatch({
      type: FOLLOW_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

export const unfollowTopic = title => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/unfollow-topic/${title}`
    );
    dispatch({
      type: UNFOLLOW_TOPIC,
      payload: res.data
    });
    dispatch(setAlert(`${title} removed from your list`, 'danger'));
  } catch (err) {
    dispatch({
      type: FOLLOW_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const followPerson = (user_id, name) => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/follow-people/${user_id}`
    );
    console.log(res.data);
    dispatch({
      type: FOLLOW_PEOPLE,
      payload: res.data
    });
    dispatch(setAlert(`Now you are following ${name}`, 'success'));
  } catch (err) {
    dispatch({
      type: FOLLOW_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const unfollowPerson = (user_id, name) => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/unfollow-people/${user_id}`
    );
    dispatch({
      type: UNFOLLOW_PEOPLE,
      payload: res.data
    });
    dispatch(setAlert(`Unfollowed ${name}`, 'danger'));
  } catch (err) {
    dispatch({
      type: FOLLOW_ERR,
      payload: { msg: err.respponse.statusText, status: err.response.status }
    });
  }
};

export const getProfile = user_id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/${user_id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getMyProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: MY_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const bookmark = story_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/bookmark/${story_id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Story bookmarked', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteBookmark = story_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/deletebookmark/${story_id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Removed from bookmark', 'danger'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const readLater = story_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/readinglist/${story_id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Added to your reading list', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteReadlater = story_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/profile/deletereadinglist/${story_id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Removed from your reading list', 'danger'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
