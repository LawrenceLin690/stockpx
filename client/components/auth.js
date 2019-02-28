import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';
import { Link } from 'react-router-dom';
import Indices from './indices';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <React.Fragment>
      <div id="parentAuth">
        <div id="auth">
          {displayName === 'Create Account' ? (
            <h2>Register</h2>
          ) : (
            <h2>Sign In</h2>
          )}
          <form onSubmit={handleSubmit} name={name}>
            {displayName === 'Create Account' ? (
              <div>
                <div>
                  <div>
                    <label htmlFor="userName">Name</label>
                  </div>
                  <input name="userName" type="text" />
                </div>
                <br />
              </div>
            ) : (
              <div />
            )}
            <div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <input name="email" type="text" />
            </div>
            <div>
              <br />
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <input name="password" type="password" />
            </div>
            <br />
            <button type="submit">{displayName.toUpperCase()}</button>
            {displayName === 'Create Account' ? (
              <div />
            ) : (
              <div>
                <Link to="/register">
                  <button type="submit"> CREATE ACCOUNT </button>
                </Link>
              </div>
            )}
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
        <div id="auth">
          <Indices />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Create Account',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (formName === 'signup') {
        const userName = evt.target.userName.value;
        dispatch(auth(email, password, formName, userName, 50000));
      } else {
        dispatch(auth(email, password, formName));
      }
    },
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);
export const Register = connect(
  mapSignup,
  mapDispatch
)(AuthForm);
