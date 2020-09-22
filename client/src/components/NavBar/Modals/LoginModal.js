/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import {
  LogModalProps,
  DefaultLogModalProps,
} from '../../../types/index';
import {
  closeLoginModal,
  switchLogToReg,
} from '../../../actions/modalActions';
import './Modal.css';

const LoginModal = ({
  switchLogToReg,
  showLoginModal,
  closeLoginModal,
  error,
  login,
  clearErrors,
  isAuthenticated,
}) => {
  const [errMsg, setErrMsg] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
    login(user);
  };

  const handleClose = () => {
    clearErrors();
    closeLoginModal();
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrMsg(error.msg.msg);
    } else {
      setErrMsg(null);
    }

    if (showLoginModal) {
      if (isAuthenticated) {
        closeLoginModal();
      }
    }
  }, [error, closeLoginModal, isAuthenticated, showLoginModal]);

  return (
    <>
      <Modal show={showLoginModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='loginUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='username'
                placeholder='Username'
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group controlId='loginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <div className='modal__bottomRow'>
              <Button
                variant='dark'
                type='submit'
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                variant='light'
                type='button'
                onClick={switchLogToReg}
              >
                Sign up
              </Button>
            </div>
          </Form>
          <p>{errMsg}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

LoginModal.propTypes = LogModalProps;
LoginModal.defaultProps = DefaultLogModalProps;

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  showLoginModal: state.modals.showLoginModal,
});

export default connect(mapStateToPros, {
  login,
  clearErrors,
  closeLoginModal,
  switchLogToReg,
})(LoginModal);
