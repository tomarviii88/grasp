import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReadingList } from '../../actions/story';
import { getCurrentProfile, deleteReadlater } from '../../actions/profile';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const ReadingList = ({
  getReadingList,
  getCurrentProfile,
  deleteReadlater,
  story: { stories }
}) => {
  useEffect(() => {
    getReadingList();
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <Navbar />
      {stories.length === 0 ? (
        <p>You have no Read Later stories</p>
      ) : (
        <Fragment>
          {stories.map(story => (
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
                <button
                  className='button-readmore'
                  onClick={() => {
                    deleteReadlater(story._id);
                    window.location.reload(false);
                  }}
                >
                  Remove from ReadingList
                </button>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

ReadingList.propTypes = {};

const mapStateToProps = state => ({
  story: state.story
});

export default connect(mapStateToProps, {
  getReadingList,
  getCurrentProfile,
  deleteReadlater
})(ReadingList);
