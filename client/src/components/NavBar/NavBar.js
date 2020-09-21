/* eslint-disable no-shadow */
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavBarProps, DefaultNavBarProps } from '../../types/index';

import LoginModal from './Modals/LoginModal';
import RegModal from './Modals/RegModal';
import './NavBar.css';

const NavBar = ({ auth, logout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark'>
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
                <Nav.Link className='mr-3'>Discover</Nav.Link>
                <Nav.Link className='mr-3 '>Categories</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    setShowLoginModal(true);
                  }}
                  className='mr-3 '
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    setShowRegModal(true);
                  }}
                  className='mr-3 '
                >
                  Join
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
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
