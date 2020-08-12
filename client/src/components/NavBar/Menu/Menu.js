import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import MenuStyles from './MenuStyles';

const Menu = ({ menuOpened, isLoggedIn }) => {
  const {
    menu,
    closedMenu,
    openedMenu,
    ul,
    li,
  } = MenuStyles;
  return (
    <div
      className={`${menu} ${
        menuOpened ? openedMenu : closedMenu
      }`}
    >
      {isLoggedIn ? (
        <>
          <ul className={ul}>
            <li className={li}>
              <Link to='/'>Discover</Link>
            </li>
            <li className={li}>
              <button type='button'>LogIn</button>
            </li>
            <li className={li}>
              <button type='button'>Join</button>
            </li>
            <li className={li}>
              <Link to='/about'>about</Link>
            </li>
          </ul>
        </>
      ) : (
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
      )}
    </div>
  );
};

Menu.propTypes = {
  menuOpened: bool.isRequired,
  isLoggedIn: bool.isRequired,
};

export default Menu;
