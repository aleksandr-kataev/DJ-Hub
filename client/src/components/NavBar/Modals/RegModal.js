/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../actions/authActions';
import { returnErrors } from '../../../actions/errorActions';

const RegModal = ({ show, setRegModalShow }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState(null);

  const handleClose = () => {
    setRegModalShow(false);
  };

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfPassword = (e) => setConfPass(e.target.value);
  if (!show) {
    return null;
  }
  return (
    <div>
      <div>
        <p>Register</p>
        <form>
          <label htmlFor='username'>
            UserName
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              onChange={handleChangeUsername}
            />
          </label>
          <label htmlFor='email'>
            Email
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Email'
              onChange={handleChangeEmail}
            />
          </label>
          <label htmlFor='password'>
            Password
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={handleChangePassword}
            />
          </label>
          <label htmlFor='confPassword'>
            Confirm password
            <input
              type='password'
              id='confPassword'
              name='confPassword'
              placeholder='Confirm password'
              onChange={handleChangeConfPassword}
            />
          </label>
        </form>
        <button type='button' onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  );
};

RegModal.propTypes = {
  setRegModalShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, {})(RegModal);
