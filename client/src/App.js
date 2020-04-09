import React, { Fragment, useEffect } from 'react';
import './App.css';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layouts/Home';
import store from './store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Alert from './components/layouts/Alert';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import { loadUser } from './actions/auth';
import Profile from './components/profile/Profile';
import EditProfileForm from './components/profile/EditProfileForm';
import ExploreTopic from './components/explore/Explore';
import ExplorePeople from './components/explore/explore_people/Explore';
import NewStoryForm from './components/new-story/NewStoryForm';
import MyStories from './components/my-stories/MyStories';
import Story from './components/story/Story';
import PeopleProfile from './components/profile/PeopleProfile';
import TopicStory from './components/story/TopicStory';
import Bookmark from './components/bookmark/Bookmark';
import ReadingList from './components/readinglist/ReadingList';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='screen'>
            <Header />
            <Alert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/edit-profile' component={EditProfileForm} />
              <PrivateRoute exact path='/profile/me' component={Profile} />
              <PrivateRoute
                exact
                path='/explore/topic'
                component={ExploreTopic}
              />
              <PrivateRoute
                exact
                path='/explore/people'
                component={ExplorePeople}
              />
              <PrivateRoute exact path='/new-story' component={NewStoryForm} />
              <PrivateRoute exact path='/my-stories' component={MyStories} />
              <PrivateRoute
                exact
                path='/read-story/:story_id'
                component={Story}
              />
              <PrivateRoute
                exact
                path='/profile/:user_id'
                component={PeopleProfile}
              />
              <PrivateRoute
                exact
                path='/search-stories/:topic'
                component={TopicStory}
              />
              <PrivateRoute exact path='/bookmarks' component={Bookmark} />
              <PrivateRoute
                exact
                path='/reading-list'
                component={ReadingList}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
