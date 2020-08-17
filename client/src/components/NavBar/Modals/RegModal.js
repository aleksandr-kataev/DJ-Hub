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
        <form>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            onChange={handleChangeUsername}
          />
          <input
            type='text'
            id='email'
            name='email'
            placeholder='Email'
            onChange={handleChangeEmail}
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={handleChangePassword}
          />
          <input
            type='password'
            id='confPassword'
            name='confPassword'
            placeholder='Confirm password'
            onChange={handleChangeConfPassword}
          />
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
