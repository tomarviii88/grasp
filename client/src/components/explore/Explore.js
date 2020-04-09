import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';

const Explore = ({ getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <SubNavbar />
    </Fragment>
  );
};

Explore.propTypes = {};

export default connect(null, { getCurrentProfile })(Explore);
