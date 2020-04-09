import React from 'react';
import PropTypes, { node } from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div className='navbar-contents'>
      <ul>
        <Link to='/dashboard' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item '>Home</li>
        </Link>
        <Link to='/explore/topic' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item'>Explore</li>
        </Link>
        <Link to='/new-story' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item navbar-active'>New Story</li>
        </Link>
        <Link to='/my-stories' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item'> My Stories</li>
        </Link>

        <Link to='/reading-list' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item'>Reading List</li>
        </Link>
        <Link to='/bookmarks' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item'>Bookmarks</li>
        </Link>
        <Link to='/profile/me' style={{ textDecoration: 'none' }}>
          <li className='navbar-content-item'>Profile</li>
        </Link>
      </ul>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
