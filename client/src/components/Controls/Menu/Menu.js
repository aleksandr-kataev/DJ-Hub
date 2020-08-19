import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuStyles from './MenuStyles';

const Menu = ({ showMenu, setShowLogModal, setShowRegModal }) => {
  const isLoggedIn = false;
  const { menu, closedMenu, openedMenu, ul, li, button } = MenuStyles;

  const handleShowLogModal = () => setShowLogModal(true);
  const handleShowRegModal = () => setShowRegModal(true);

  return (
    <div className={`${menu} ${showMenu ? openedMenu : closedMenu}`}>
      {isLoggedIn ? (
        <>
          <ul className={ul}>
            <li className={li}>
              <Link to='/'>DISCOVER</Link>
            </li>
            <li className={li}>
              <Link to='/profile'>MY PROFILE</Link>
            </li>
            <li className={li}>
              <Link to='/post'>POST</Link>
            </li>
            <li className={li}>
              <button type='button'>LOGOUT</button>
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

Menu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowLogModal: PropTypes.func.isRequired,
  setShowRegModal: PropTypes.func.isRequired,
};

export default Menu;
