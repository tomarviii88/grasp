import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { getMyStories, getStoryById } from '../../actions/story';
import { Link } from 'react-router-dom';

const MyStories = ({ getMyStories, getStoryById, story: { stories } }) => {
  useEffect(() => {
    getMyStories();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className='my-stories-container'>
        {stories.length > 0 ? (
          stories.map(story => (
            <Fragment>
              <div className='my-stories-card-container'>
                <div className='my-stories-main-content'>
                  <div className='my-stories-img'>
                    <img src={story.imgsrc} />
                  </div>
                  <div className='my-stories-text'>
                    <h2>{story.title}</h2>
                    <h6>Category: {story.topic}</h6>
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
                  <button className='button-readmore'>
                    {story.saveasdraft === true ? 'Publish' : 'Published'}
                  </button>
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
          ))
        ) : (
          <Fragment>
            <div className='center-align-text'>
              <p>You don't have any story right now.</p>
              <p>Create One</p>
              <Link to='/new-story'>
                <button className='blue-button'>Create New Story</button>
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

MyStories.propTypes = {};

const mapStateToProps = state => ({
  story: state.story
});

export default connect(mapStateToProps, { getMyStories, getStoryById })(
  MyStories
);
