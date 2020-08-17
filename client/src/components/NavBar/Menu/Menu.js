import React, { useState } from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import MenuStyles from './MenuStyles';
import RegModal from '../Modals/RegModal';
import LogModal from '../Modals/LogModal';

const Menu = ({ menuOpened, isLoggedIn }) => {
  const { menu, closedMenu, openedMenu, ul, li } = MenuStyles;
  const [logModalShow, setLogModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);

  const handleLogInClick = () => {
    setLogModalShow(true);
  };

  const handleRegClick = () => {
    setRegModalShow(true);
  };

  return (
    <div
      className={`${menu} ${menuOpened ? openedMenu : closedMenu}`}
    >
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
              <button type='button' onClick={handleLogInClick}>
                LogIn
              </button>
            </li>
            <li className={li}>
              <button type='button' onClick={handleRegClick}>
                Join
              </button>
            </li>
            <li className={li}>
              <Link to='/about'>About</Link>
            </li>
          </ul>
          <RegModal
            show={regModalShow}
            setRegModalShow={setRegModalShow}
          />
          <LogModal
            show={logModalShow}
            setLogModalShow={setLogModalShow}
          />
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
