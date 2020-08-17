import React, { useState } from 'react';
import NavBarStyles from './NavBarStyles';

import Menu from './Menu/Menu';

const NavBar = () => {
  const isLoggedIn = false;
  const [menuOpened, setmenuOpened] = useState(false);
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
            onClick={() => setmenuOpened(!menuOpened)}
          >
            {menuOpened ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>
      <Menu menuOpened={menuOpened} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default NavBar;
