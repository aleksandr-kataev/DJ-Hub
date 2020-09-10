/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSpring } from 'react-spring';
import { RegModalProps, DefaultRegModalProps } from '../../../types';
import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

import {
  BackgroundStyled,
  ModalStyled,
  HeadingStyled,
  SubmitButtonStyled,
  ErrorMessageStyled,
} from './ModalStyles';

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

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfPassword = (e) => {
    setConfPassword(e.target.value);
  };

  const fadeAnimation = useSpring({
    opacity: showRegModal ? 1 : 0,
  });

  const modalAnimation = useSpring({
    transform: showRegModal ? 'translateY(0)' : 'translateY(-200%)',
  });

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
    <BackgroundStyled style={fadeAnimation}>
      <ModalStyled style={modalAnimation}>
        <HeadingStyled>Register</HeadingStyled>
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
        <ErrorMessageStyled>{errMsg}</ErrorMessageStyled>
        <SubmitButtonStyled type='button' onClick={handleSubmit}>
          Submit
        </SubmitButtonStyled>
        <button type='button' onClick={handleCloseRegModal}>
          Close
        </button>
      </ModalStyled>
    </BackgroundStyled>
  );
};

RegModal.propTypes = RegModalProps;
RegModal.defaultProps = DefaultRegModalProps;

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, { register, clearErrors })(
  RegModal,
);
