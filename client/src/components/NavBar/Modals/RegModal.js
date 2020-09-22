/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RegModalProps, DefaultRegModalProps } from '../../../types';
import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import {
  closeRegModal,
  switchRegToLog,
} from '../../../actions/modalActions';

// Add modal actions and states to prop validation + logmodal

const RegModal = ({
  switchRegToLog,
  closeRegModal,
  showRegModal,
  clearErrors,
  isAuthenticated,
  error,
  register,
}) => {
  const [errMsg, setErrMsg] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confpass, setConfPass] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfPassChange = (e) => setConfPass(e.target.value);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confpass) {
      setErrMsg('Password do not match');
      return;
    }
    const newUser = {
      username,
      email,
      password,
    };
    register(newUser);
  };

  const handleClose = () => {
    clearErrors();
    closeRegModal();
  };

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setErrMsg(error.msg.msg);
    } else {
      setErrMsg(null);
    }

    if (showRegModal) {
      if (isAuthenticated) {
        closeRegModal();
      }
    }
  }, [error, closeRegModal, isAuthenticated, showRegModal]);

  return (
    <Modal show={showRegModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='registerEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId='registerUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='username'
              placeholder='Username'
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId='registerPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group controlId='registerConfPass'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              onChange={handleConfPassChange}
            />
          </Form.Group>
          <div className='modal__bottomRow'>
            <Button
              variant='dark'
              type='submit'
              onClick={handleRegister}
            >
              Register
            </Button>
            <Button
              variant='light'
              type='button'
              onClick={switchRegToLog}
            >
              Sign up
            </Button>
          </div>
        </Form>
        <p>{errMsg}</p>
      </Modal.Body>
    </Modal>
  );
};

RegModal.propTypes = RegModalProps;
RegModal.defaultProps = DefaultRegModalProps;

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  showRegModal: state.modals.showRegModal,
});

export default connect(mapStateToPros, {
  register,
  clearErrors,
  closeRegModal,
  switchRegToLog,
})(RegModal);
