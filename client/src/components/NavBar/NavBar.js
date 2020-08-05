import React from 'react';
import {
  NavBarStyled,
  LeftContainer,
  RightContainer,
} from './NavBar.styled';

const NavBar = () => (
  <NavBarStyled>
    <LeftContainer>
      <p>DJHUB</p>
    </LeftContainer>

    <RightContainer>
      <p>MENU</p>
      <button type='button'>
        <svg viewBox='0 0 21 21'>
          <path
            fillRule='evenodd'
            d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
          />
        </svg>
      </button>
    </RightContainer>
  </NavBarStyled>
);

export default NavBar;
