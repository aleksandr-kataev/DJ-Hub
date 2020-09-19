/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Menu } from 'antd';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavBarProps, DefaultNavBarProps } from '../../types/index';

import LoginModal from './Modals/LoginModal';
import RegModal from './Modals/RegModal';
import './NavBar.css';

const NavBar = ({ auth, logout }) => {
  const { SubMenu } = Menu;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);

  return (
    <>
      <div className='nav'>
        <div className='logo'>
          <span>DJHUB</span>
        </div>
        {auth && auth.isAuthenticated ? (
          <Menu theme='dark' mode='horizontal'>
            <Menu.Item style={{ marginRight: '2rem' }}>
              Discover
            </Menu.Item>
            <Menu.Item style={{ marginRight: '2rem' }}>
              Categories
            </Menu.Item>
            <SubMenu key='SubMenu' title='My account'>
              <Menu.Item key='setting:1'>Create a post</Menu.Item>
              <Menu.Item key='setting:2'>My profile</Menu.Item>
              <Menu.Item onClick={logout} key='setting:3'>
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
        ) : (
          <Menu theme='dark' mode='horizontal'>
            <Menu.Item style={{ marginRight: '2rem' }}>
              Discover
            </Menu.Item>
            <Menu.Item style={{ marginRight: '2rem' }}>
              Categories
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setShowLoginModal(true);
              }}
              style={{ marginRight: '2rem' }}
            >
              Login
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setShowRegModal(true);
              }}
              style={{ marginRight: '2rem' }}
            >
              Join
            </Menu.Item>
          </Menu>
        )}
      </div>
      <RegModal
        showRegModal={showRegModal}
        setShowRegModal={setShowRegModal}
      />
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
};

NavBar.propTypes = NavBarProps;
NavBar.defaultProps = DefaultNavBarProps;

const mapStateToPros = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToPros, { logout })(NavBar);
