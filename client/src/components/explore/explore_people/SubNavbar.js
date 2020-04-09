import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import People from './People';

const SubNavbar = props => {
  return (
    <Fragment>
      <div className='explore-subnavbar'>
        <ul>
          <Link to='/explore/topic' style={{ textDecoration: 'none' }}>
            <li style={{ color: 'gray' }} className='explore-li'>
              Topic
            </li>
          </Link>
          <Link to='/explore/people' style={{ textDecoration: 'none' }}>
            <li style={{ color: 'black' }} className='explore-li'>
              People
            </li>
          </Link>
        </ul>
      </div>
      <People />
    </Fragment>
  );
};

SubNavbar.propTypes = {};

export default SubNavbar;
