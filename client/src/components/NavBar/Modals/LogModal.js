/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authActions';
import { returnErrors } from '../../../actions/errorActions';
import ModalStyles from './ModalStyle';

const LogModal = ({ show, setLogModalShow }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleClose = () => {
    setLogModalShow(false);
  };

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleBackgroundClick = (e) => {
    setLogModalShow(false);
  };

  if (!show) {
    return null;
  }
  return (
    <div className={ModalStyles.bg}>
      <div className={ModalStyles.modal}>
        <p className={ModalStyles.heading}>Login</p>
        <form className={ModalStyles.form}>
          <label htmlFor='username' className={ModalStyles.label}>
            Username
            <input
              className={ModalStyles.input}
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              onChange={handleChangeUsername}
            />
          </label>
          <label htmlFor='password' className={ModalStyles.label}>
            Password
            <input
              className={ModalStyles.input}
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={handleChangePassword}
            />
          </label>
          <button
            type='button'
            className={ModalStyles.submit}
            onClick={handleClose}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

LogModal.propTypes = {
  setLogModalShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, {})(LogModal);
