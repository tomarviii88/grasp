import React, { Fragment, useEffect } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, loadUser } from '../../actions/auth';

const Header = ({ auth: { isAuthenticated, user }, logout }) => {
  return (
    <Fragment>
      <div className='header'>
        <div className='grasp-title'>
          <p>GRASP</p>
        </div>
        <div className='headerContainer'>
          {
            <ul>
              {isAuthenticated !== true && (
                <Fragment>
                  <Link to='/signup'>
                    <li className='signup-login'>
                      <button>Signup</button>
                    </li>
                  </Link>
                  <Link to='/login'>
                    <li className='signup-login'>
                      <button>Login</button>
                    </li>
                  </Link>
                </Fragment>
              )}
              {isAuthenticated === true && (
                <Fragment>
                  <li className='signup-login'>
                    <button
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                  <Link to={user !== null && `/profile/me`}>
                    <li className='signup-login'>
                      <button>{user !== null && `${user.name}`}</button>
                    </li>
                  </Link>
                </Fragment>
              )}
            </ul>
          }
        </div>
      </div>
    </Fragment>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
