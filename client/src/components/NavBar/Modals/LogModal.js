/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSpring } from 'react-spring';
import {
  LogModalProps,
  DefaultLogModalProps,
} from '../../../types/index';
import { login } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import {
  BackgroundStyled,
  ModalStyled,
  HeadingStyled,
  SubmitButtonStyled,
  ErrorMessageStyled,
} from './ModalStyles';

const LogModal = ({
  showLogModal,
  setShowLogModal,
  isAuthenticated,
  error,
  login,
  clearErrors,
}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const fadeAnimation = useSpring({
    opacity: showLogModal ? 1 : 0,
  });

  const modalAnimation = useSpring({
    transform: showLogModal ? 'translateY(0)' : 'translateY(-200%)',
  });

  const handleCloseLogModal = () => {
    clearErrors();
    setShowLogModal(false);
  };

  const handleOnSumbit = (e) => {
    e.preventDefault();
    const user = { username, password };
    login(user);
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrMsg(error.msg.err);
    } else {
      setErrMsg(null);
    }

    // If authenticated, close modal
    if (showLogModal) {
      if (isAuthenticated) {
        setShowLogModal(false);
      }
    }
  }, [error, setShowLogModal, isAuthenticated, showLogModal]);

  if (!showLogModal) {
    return null;
  }
  return (
    <BackgroundStyled style={fadeAnimation}>
      <ModalStyled style={modalAnimation}>
        <HeadingStyled>Login</HeadingStyled>
        <form>
          <label htmlFor='username'>
            Username
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              onChange={handleChangeUsername}
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
          <div>
            <ErrorMessageStyled>{errMsg}</ErrorMessageStyled>
          </div>
        </form>
        <SubmitButtonStyled type='button' onClick={handleOnSumbit}>
          Submit
        </SubmitButtonStyled>
        <button type='button' onClick={handleCloseLogModal}>
          Close
        </button>
      </ModalStyled>
    </BackgroundStyled>
  );
};

LogModal.propTypes = LogModalProps;
LogModal.defaultProps = DefaultLogModalProps;

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, { login, clearErrors })(
  LogModal,
);
