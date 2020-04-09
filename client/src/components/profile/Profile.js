import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, getProfiles } from '../../actions/profile';
import Navbar from './Navbar';

const Profile = ({ getCurrentProfile, getProfiles, profile: { profile } }) => {
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
  }, []);
  return (
    profile && (
      <Fragment>
        <Navbar />
        <div className='profileContainer'>
          <h1>{profile.name}</h1>
          {profile.bio && (
            <Fragment>
              <p>{profile.bio}</p>
            </Fragment>
          )}
          <Link to='/edit-profile'>
            <button className='edit-profile-button'>Edit Profile</button>
          </Link>
        </div>
      </Fragment>
    )
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, getProfiles })(
  Profile
);
