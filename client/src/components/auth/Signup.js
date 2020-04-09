import React, { useState } from 'react';
import '../../App.css';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Signup = ({ setAlert, register, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'success');
      setFormData({ name: '', email: '', password: '', password2: '' });
    } else {
      register({ name, email, password }, history);
    }
  };

  return (
    <div className='signup-form'>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          required
          onChange={e => onChange(e)}
        />
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
        <input
          type='password'
          name='password2'
          placeholder='Re-enter Password'
          value={password2}
          onChange={e => onChange(e)}
          required
          minLength='6'
        />
        <input type='submit' name='submit' value='SignUp' />
      </form>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(
  withRouter(Signup)
);
