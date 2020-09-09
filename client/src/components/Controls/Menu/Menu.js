/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuProps, DefaultMenuProps } from '../../../types/index';
import MenuStyled from './MenuStyles';
import { logout } from '../../../actions/authActions';

const Menu = ({
  style,
  setShowLogModal,
  setShowRegModal,
  auth,
  logout,
}) => {
  const handleShowLogModal = () => setShowLogModal(true);
  const handleShowRegModal = () => setShowRegModal(true);

  return (
    <MenuStyled style={style}>
      {auth && auth.isAuthenticated ? (
        <>
          <ul>
            <li>
              <Link to='/'>DISCOVER</Link>
            </li>
            <li>
              <Link to='/profile'>MY PROFILE</Link>
            </li>
            <li>
              <Link to='/create-post'>POST</Link>
            </li>
            <li>
              <button type='button' onClick={logout}>
                LOGOUT
              </button>
            </li>
            <li>
              <Link to='/about'>ABOUT</Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li>
              <Link to='/'>Discover</Link>
            </li>
            <li>
              <button type='button' onClick={handleShowLogModal}>
                LogIn
              </button>
            </li>
            <li>
              <button type='button' onClick={handleShowRegModal}>
                Join
              </button>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </>
      )}
    </MenuStyled>
  );
};

Menu.propTypes = MenuProps;
Menu.defaultProps = DefaultMenuProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Menu);
