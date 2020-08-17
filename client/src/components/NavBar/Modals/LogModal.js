/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authActions';
import { returnErrors } from '../../../actions/errorActions';

const LogModal = ({ show, setLogModalShow }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleClose = () => {
    setLogModalShow(false);
  };

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

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
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={handleChangePassword}
          />
        </form>
        <button type='button' onClick={handleClose}>
          close
        </button>
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
