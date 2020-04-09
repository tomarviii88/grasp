import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStoryByTopic } from '../../actions/story';
import { Link } from 'react-router-dom';
import {
  getMyProfile,
  followTopic,
  unfollowTopic
} from '../../actions/profile';

const TopicStory = ({
  match,
  getStoryByTopic,
  getMyProfile,
  story: { stories },
  followTopic,
  unfollowTopic,

  profile: { myprofile }
}) => {
  useEffect(() => {
    getMyProfile();

    getStoryByTopic(match.params.topic);
  }, []);

  const updateFollow = () => {
    if (
      myprofile.topics.filter(topic => topic.name === match.params.topic)
        .length > 0
    ) {
      unfollowTopic(match.params.topic);
    } else {
      followTopic(match.params.topic);
    }
  };
  return (
    <div className='topic-stories-container'>
      <h1>{match.params.topic} BASED STORIES</h1>
      <button
        className='blue-button'
        onClick={() => {
          updateFollow();
        }}
      >
        {myprofile &&
        myprofile.topics.filter(topic => topic.name === match.params.topic)
          .length > 0
          ? 'Unfollow'
          : 'Follow'}
      </button>

      <div className='topic-stories'>
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
                    <Link
                      to={`/profile/${story.user}`}
                      style={{ textDecoration: 'none' }}
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
          ))
        ) : (
          <p>{match.params.topic} do not have any story to show.</p>
        )}
      </div>
    </div>
  );
};

TopicStory.propTypes = {};

const mapStateToProps = state => ({
  story: state.story,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getStoryByTopic,
  getMyProfile,
  unfollowTopic,
  followTopic
})(TopicStory);
