import React from 'react';
import { NavBarProps } from '../../../types/index';
import NavBarStyles from './NavBarStyles';

const NavBar = ({ showMenu, setShowMenu }) => {
  const { nav, leftCnt, rightCnt, button } = NavBarStyles;
  return (
    <>
      <nav className={nav}>
        <div className={leftCnt}>
          <p>DJHUB</p>
        </div>
        <div className={rightCnt}>
          <button
            className={button}
            type='button'
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>
    </>
  );
};

NavBar.propTypes = NavBarProps;

export default NavBar;
