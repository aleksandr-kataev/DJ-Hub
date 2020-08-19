/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authActions';
import { returnErrors } from '../../../actions/errorActions';
import ModalStyles from './ModalStyle';

const LogModal = ({ showLogModal, setShowLogModal }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { bg, modal, heading, label, input, submit } = ModalStyles;

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleCloseLogModal = () => {
    setShowLogModal(false);
  };

  if (!showLogModal) {
    return null;
  }
  return (
    <div className={bg}>
      <div className={modal}>
        <p className={heading}>Login</p>
        <form>
          <label htmlFor='username' className={label}>
            Username
            <input
              className={input}
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              onChange={handleChangeUsername}
            />
          </label>
          <label htmlFor='password' className={label}>
            Password
            <input
              className={input}
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={handleChangePassword}
            />
          </label>
          <button
            type='button'
            className={submit}
            onClick={handleCloseLogModal}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

LogModal.propTypes = {
  showLogModal: PropTypes.bool.isRequired,
  setShowLogModal: PropTypes.func.isRequired,
};

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, {})(LogModal);
