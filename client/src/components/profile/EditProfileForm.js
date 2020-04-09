import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { createProfile } from '../../actions/profile';
import { withRouter, Link } from 'react-router-dom';

const EditProfileForm = ({
  getCurrentProfile,
  loadUser,
  createProfile,
  history,
  profile: { profile }
}) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    loadUser();
    getCurrentProfile();
    if (profile) {
      setFormData({
        name: profile.name,
        bio: profile.bio
      });
    }
  }, [2]);

  const { name, bio } = formData;

  const onChange = e => {
    setFormData({
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className='profile-formContainer'>
      <form
        onSubmit={e => {
          onSubmit(e);
        }}
      >
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => onChange(e)}
        />
        <textarea
          placeholder='Bio'
          name='bio'
          value={bio}
          onChange={e => onChange(e)}
        />
        <div className='submit-profile-formContainer'>
          <input type='submit' value='Save' />
          <Link to='/profile/me'>
            <input type='button' className='button-cancel' value='Cancel' />
          </Link>
        </div>
      </form>
    </div>
  );
};

EditProfileForm.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  loadUser,
  createProfile
})(withRouter(EditProfileForm));
