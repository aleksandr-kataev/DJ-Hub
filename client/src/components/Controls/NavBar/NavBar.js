import React from 'react';
import { NavBarProps } from '../../../types/index';
import { Nav, Left, Right } from './NavBarStyles';

const NavBar = ({ showMenu, setShowMenu }) => (
  <Nav>
    <Left>
      <p>DJHUB</p>
    </Left>
    <Right>
      <button type='button' onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? 'CLOSE' : 'MENU'}
      </button>
    </Right>
  </Nav>
);

NavBar.propTypes = NavBarProps;

export default NavBar;
