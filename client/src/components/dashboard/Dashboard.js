import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getFollowedPeopleStories,
  getFollowedTopicsStories,
  getStoryById
} from '../../actions/story';

const Dashboard = ({
  story,
  getFollowedPeopleStories,
  getFollowedTopicsStories,
  getStoryById
}) => {
  useEffect(() => {
    getFollowedPeopleStories();
    getFollowedTopicsStories();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className='dashboard-container'>
        <div className='dashboard-followed-container'>
          <div
            className='dashboard-followed-topic-container'
            style={{ overflow: 'scroll' }}
          >
            <h1>ARTICLES BASED ON FOLLOWED TOPICS</h1>
            {story &&
              story.followedTopics &&
              story.followedTopics.map(story => (
                <Fragment>
                  <div className='my-stories-card-container'>
                    <div className='my-stories-main-content'>
                      <div className='my-stories-img'>
                        <img src={story.imgsrc} />
                      </div>
                      <div className='my-stories-text'>
                        <h2>{story.title}</h2>
                        <Link
                          to={`/search-stories/${story.topic}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <h6>Category: {story.topic}</h6>
                        </Link>
                        <Link
                          to={`/profile/${story.user}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <h6>Author: {story.authorname}</h6>
                        </Link>
                        <p>{story.tagline}</p>
                      </div>
                    </div>
                    <div className='like-comment-container'>
                      <div className='dashboard-like-container'>
                        <p>Like: {story.likes.length}</p>
                      </div>
                      <div className='dashboard-comment-container'>
                        <p>Comment: {story.comments.length}</p>
                      </div>
                    </div>
                    <div className='my-stories-button'>
                      <Link
                        to={`/read-story/${story._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <button className='button-readmore'>Read More</button>
                      </Link>
                    </div>
                  </div>
                </Fragment>
              ))}
          </div>
          <div
            className='dashboard-followed-people-container'
            style={{ overflow: 'scroll' }}
          >
            <h1>ARTICLE BASED ON FOLLOWED AUTHORS</h1>
            {story &&
              story.followedPeople &&
              story.followedPeople.map(story => (
                <Fragment>
                  <div className='my-stories-card-container'>
                    <div className='my-stories-main-content'>
                      <div className='my-stories-img dashboard-img'>
                        <img src={story.imgsrc} />
                      </div>
                      <div className='my-stories-text'>
                        <h2>{story.title}</h2>
                        <Link
                          to={`/search-stories/${story.topic}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <h6>Category: {story.topic}</h6>
                        </Link>
                        <Link
                          to={`/profile/${story.user}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <h6>Author: {story.authorname}</h6>
                        </Link>
                        <p>{story.tagline}</p>
                      </div>
                    </div>
                    <div className='like-comment-container'>
                      <div className='dashboard-like-container'>
                        <p>Like: {story.likes.length}</p>
                      </div>
                      <div className='dashboard-comment-container'>
                        <p>Comment: {story.comments.length}</p>
                      </div>
                    </div>
                    <div className='my-stories-button'>
                      <Link
                        to={`/read-story/${story._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <button
                          className='button-readmore'
                          onClick={() => getStoryById(story._id)}
                        >
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
        <div className='dashboard-top-picks'></div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {};

const mapStateToProps = state => ({
  story: state.story
});

export default connect(mapStateToProps, {
  getFollowedPeopleStories,
  getFollowedTopicsStories,
  getStoryById
})(Dashboard);
