import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProfile,
  getMyProfile,
  followPerson,
  unfollowPerson
} from '../../actions/profile';
import { getStoryByProfile } from '../../actions/story';
import { Link } from 'react-router-dom';

const PeopleProfile = ({
  getMyProfile,
  getProfile,
  followPerson,
  unfollowPerson,
  getStoryByProfile,
  match,
  profile: { profile, myprofile },
  story: { stories }
}) => {
  useEffect(() => {
    getMyProfile();
    getProfile(match.params.user_id);
    getStoryByProfile(match.params.user_id);
  }, []);
  return (
    profile && (
      <div className='profile-container'>
        <div className='profileContainer'>
          <div className='profile'>
            <h1>{profile.name}</h1>
            {myprofile &&
            myprofile.following.filter(people => profile.user === people.user)
              .length > 0 ? (
              <button
                className='blue-button'
                onClick={() => unfollowPerson(profile.user, profile.name)}
              >
                UnFollow
              </button>
            ) : (
              <button
                className='blue-button'
                onClick={() => followPerson(profile.user, profile.name)}
              >
                Follow
              </button>
            )}
          </div>
          {profile.bio && (
            <Fragment>
              <p>{profile.bio}</p>
            </Fragment>
          )}
        </div>
        <div className='profile-story-container'>
          <h2>Stories by {profile.name}</h2>
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
            ))
          ) : (
            <p>{profile.name} has no stories to show</p>
          )}
        </div>
      </div>
    )
  );
};

PeopleProfile.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile,
  story: state.story
});

export default connect(mapStateToProps, {
  followPerson,
  unfollowPerson,
  getMyProfile,
  getProfile,
  getStoryByProfile
})(PeopleProfile);
