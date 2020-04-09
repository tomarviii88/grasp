import React, { useEffect, Fragment } from 'react';
import PropTypes, { node } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getProfiles,
  getCurrentProfile,
  unfollowPerson,
  followPerson
} from '../../../actions/profile';

const People = ({
  getCurrentProfile,
  getProfiles,
  profile: { profiles, profile },
  followPerson,
  unfollowPerson
}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
  }, []);

  const follow = (user_id, name) => {
    if (
      profile.following.filter(people => people.user === user_id).length > 0
    ) {
      unfollowPerson(user_id, name);
    } else {
      followPerson(user_id, name);
    }
  };
  return (
    <div className='explore-people-list'>
      {profiles.map(p => (
        <Fragment>
          <div className='explore-people-card'>
            <div className='explore-people-header'>
              <Link
                to={`/profile/${p.user}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{p.name}</h3>
              </Link>
              <button onClick={() => follow(p.user, p.name)}>
                {profile &&
                profile.following.filter(people => people.user === p.user)
                  .length > 0
                  ? 'Unfollow'
                  : 'Follow'}
              </button>
            </div>
            <p>{p.bio}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

People.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfiles,
  getCurrentProfile,
  followPerson,
  unfollowPerson
})(People);
