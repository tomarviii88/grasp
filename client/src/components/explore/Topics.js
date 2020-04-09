import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  followTopic,
  getCurrentProfile,
  unfollowTopic
} from '../../actions/profile';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Topics = ({
  followTopic,
  explore: { topics_data },
  profile: { profile },
  setAlert,
  unfollowTopic
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const follow = title => {
    if (profile.topics.filter(topic => topic.name === title).length > 0) {
      unfollowTopic(title);
    } else {
      followTopic(title);
    }
  };

  return (
    <div className='topics-container'>
      {topics_data.topics.map(t => (
        <Fragment>
          <div className='topic-card-container' key={t.id}>
            <Link
              to={`/search-stories/${t.title}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h1>{t.title}</h1>
            </Link>
            <img src={t.imgSrc} />
            <button
              className='primary'
              onClick={() => {
                follow(t.title);
              }}
            >
              {profile &&
              profile.topics.filter(topic => topic.name === t.title).length > 0
                ? 'Following'
                : 'Follow'}
            </button>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

Topics.propTypes = {};

const mapStateToProps = state => ({
  explore: state.explore,
  profile: state.profile
});

export default connect(mapStateToProps, {
  followTopic,
  setAlert,
  unfollowTopic
})(Topics);
