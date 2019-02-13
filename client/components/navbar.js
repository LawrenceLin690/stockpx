import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const Navbar = props => {
  return (
    <div id="navbar">
      <Link to="/account" style={{ textDecoration: 'none', color: 'black' }}>
        Portfolio
      </Link>{' '}
      |{' '}
      <Link
        to="/transactions"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        Transactions
      </Link>{' '}
      |{' '}
      <button type="submit" onClick={props.logOut}>
        Logout
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logout()),
});

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
