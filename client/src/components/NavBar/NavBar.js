/* eslint-disable no-shadow */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavBarProps, DefaultNavBarProps } from '../../types/index';
import {
  openRegModal,
  openLoginModal,
} from '../../actions/modalActions';

import LoginModal from './Modals/LoginModal';
import RegModal from './Modals/RegModal';
import './NavBar.css';
// user-select: none;

const NavBar = ({ auth, logout, openRegModal, openLoginModal }) => {
  const history = useHistory();
  return (
    <>
      <Navbar bg='dark' variant='dark' fixed='top'>
        <Navbar.Brand className='ml-5' href='#home'>
          DJHUB
        </Navbar.Brand>
        {auth && auth.isAuthenticated ? (
          <Navbar.Collapse className='justify-content-end mr-5'>
            <Nav variant='light'>
              <Nav.Link className='mr-3'>Discover</Nav.Link>
              <Nav.Link className='mr-3 '>Categories</Nav.Link>
              <NavDropdown className='mr-3 ' title='My Account'>
                <NavDropdown.Item>Create a new post</NavDropdown.Item>
                <NavDropdown.Item>My profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <>
            <Navbar.Collapse className='justify-content-end mr-5'>
              <Nav variant='light'>
                <Nav.Link
                  onClick={() => {
                    history.push('/discover');
                  }}
                  className='mr-3'
                >
                  Discover
                </Nav.Link>
                <Nav.Link className='mr-3 '>Categories</Nav.Link>
                <Nav.Link onClick={openLoginModal} className='mr-3 '>
                  Login
                </Nav.Link>
                <Nav.Link onClick={openRegModal} className='mr-3 '>
                  Join
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
      <RegModal />
      <LoginModal />
    </>
  );
};

NavBar.propTypes = NavBarProps;
NavBar.defaultProps = DefaultNavBarProps;

const mapStateToPros = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToPros, {
  logout,
  openRegModal,
  openLoginModal,
})(NavBar);
