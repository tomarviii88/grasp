import React, { useState } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='signup-form'>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          required
          onChange={e => onChange(e)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={e => onChange(e)}
          required
          minLength='6'
        />

        <input type='submit' name='submit' value='Login' />
      </form>
    </div>
  );
};

Login.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
