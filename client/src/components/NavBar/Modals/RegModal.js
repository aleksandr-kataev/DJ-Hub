/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import { RegModalProps, DefaultRegModalProps } from '../../../types';
import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

const RegModal = ({
  showRegModal,
  setShowRegModal,
  clearErrors,
  isAuthenticated,
  error,
  register,
}) => {
  const [form] = Form.useForm();
  const [errMsg, setErrMsg] = useState(null);
  // const [disabled, setDisabled] = useState(false);

  const onOk = () => {
    form.validateFields().then(async (values) => {
      register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      form.resetFields();
    });
  };

  const onCancel = () => {
    form.resetFields();
    clearErrors();
    setShowRegModal(false);
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrMsg(error.msg.msg);
    } else {
      setErrMsg(null);
    }

    if (showRegModal) {
      if (isAuthenticated) {
        setShowRegModal(false);
      }
    }
  }, [error, setShowRegModal, isAuthenticated, showRegModal]);

  return (
    <Modal
      title='Register'
      visible={showRegModal}
      onOk={onOk}
      onCancel={onCancel}
      okText='Login'
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Form name='Register' form={form}>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please enter your username',
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
              message: 'Please enter your password',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm password'
          name='confpassword'
          rules={[
            {
              required: true,
              message: 'Please enter your password confirmation',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <span style={{ text: 'black' }}>{errMsg}</span>
      </Form>
    </Modal>
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
