/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import { login } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import {
  LogModalProps,
  DefaultLogModalProps,
} from '../../../types/index';

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  error,
  login,
  clearErrors,
  isAuthenticated,
}) => {
  const [form] = Form.useForm();
  const [errMsg, setErrMsg] = useState(null);
  // const [disabled, setDisabled] = useState(false);

  const onOk = () => {
    form.validateFields().then(async (values) => {
      login({
        username: values.username,
        password: values.password,
      });
    });
  };

  const onCancel = () => {
    form.resetFields();
    clearErrors();
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrMsg(error.msg.msg);
    } else {
      setErrMsg(null);
    }

    if (showLoginModal) {
      if (isAuthenticated) {
        setShowLoginModal(false);
      }
    }
  }, [error, setShowLoginModal, isAuthenticated, showLoginModal]);

  return (
    <>
      <Modal
        title='Login'
        visible={showLoginModal}
        onOk={onOk}
        onCancel={onCancel}
        okText='Login'
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Form name='login' form={form}>
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <span style={{ text: 'black' }}>{errMsg}</span>
        </Form>
      </Modal>
    </>
  );
};

LoginModal.propTypes = LogModalProps;
LoginModal.defaultProps = DefaultLogModalProps;

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, { login, clearErrors })(
  LoginModal,
);
