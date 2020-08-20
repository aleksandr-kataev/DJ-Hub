/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalStyles from './ModalStyle';
import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

const RegModal = ({
  isAuthenticated,
  error,
  register,
  clearErrors,
  showRegModal,
  setShowRegModal,
}) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const {
    bg,
    modal,
    heading,
    label,
    input,
    submit,
    err,
    errMessage,
  } = ModalStyles;

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfPassword = (e) => {
    setConfPassword(e.target.value);
  };

  const handleCloseRegModal = () => {
    clearErrors();
    setShowRegModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setErrMsg('Passwords do not match');
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    register(newUser);
  };

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setErrMsg(error.msg.err);
    } else {
      setErrMsg(null);
    }

    // If authenticated, close modal
    if (showRegModal) {
      if (isAuthenticated) {
        setShowRegModal(false);
      }
    }
  }, [error, setShowRegModal, isAuthenticated, showRegModal]);

  if (!showRegModal) {
    return null;
  }
  return (
    <div className={bg}>
      <div className={modal}>
        <p className={heading}>Register</p>
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
          <label htmlFor='email' className={label}>
            Email
            <input
              className={input}
              type='text'
              id='email'
              name='email'
              placeholder='Email'
              onChange={handleChangeEmail}
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
          <label htmlFor='confPassword' className={label}>
            Confirm password
            <input
              className={input}
              type='password'
              id='confPassword'
              name='confPassword'
              placeholder='Confirm password'
              onChange={handleChangeConfPassword}
            />
          </label>
        </form>
        <div className={err}>
          <p className={errMessage}>{errMsg}</p>
        </div>
        <button
          type='button'
          className={submit}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button type='button' onClick={handleCloseRegModal}>
          Close
        </button>
      </div>
    </div>
  );
};

RegModal.propTypes = {
  showRegModal: PropTypes.bool.isRequired,
  setShowRegModal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.shape({
      err: PropTypes.string,
    }),
    status: PropTypes.number,
    id: PropTypes.string,
  }),
};

RegModal.defaultProps = {
  isAuthenticated: null,
  error: null,
};

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, { register, clearErrors })(
  RegModal,
);
