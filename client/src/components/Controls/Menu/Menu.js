/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuProps, DefaultMenuProps } from '../../../types/index';
import MenuStyles from './MenuStyles';
import { logout } from '../../../actions/authActions';

const Menu = ({
  showMenu,
  setShowLogModal,
  setShowRegModal,
  auth,
  logout,
}) => {
  const { menu, closedMenu, openedMenu, ul, li, button } = MenuStyles;

  const handleShowLogModal = () => setShowLogModal(true);
  const handleShowRegModal = () => setShowRegModal(true);

  return (
    <div className={`${menu} ${showMenu ? openedMenu : closedMenu}`}>
      {auth && auth.isAuthenticated ? (
        <>
          <ul className={ul}>
            <li className={li}>
              <Link to='/'>DISCOVER</Link>
            </li>
            <li className={li}>
              <Link to='/profile'>MY PROFILE</Link>
            </li>
            <li className={li}>
              <Link to='/create-post'>POST</Link>
            </li>
            <li className={li}>
              <button
                type='button'
                className={button}
                onClick={logout}
              >
                LOGOUT
              </button>
            </li>
            <li className={li}>
              <Link to='/about'>ABOUT</Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className={ul}>
            <li className={li}>
              <Link to='/'>Discover</Link>
            </li>
            <li className={li}>
              <button
                type='button'
                className={button}
                onClick={handleShowLogModal}
              >
                LogIn
              </button>
            </li>
            <li className={li}>
              <button
                type='button'
                className={button}
                onClick={handleShowRegModal}
              >
                Join
              </button>
            </li>
            <li className={li}>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

Menu.propTypes = MenuProps;
Menu.defaultProps = DefaultMenuProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Menu);
