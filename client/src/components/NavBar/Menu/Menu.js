import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import StyledMenu from './Menu.styled';

const Menu = ({ menu, isLoggedIn }) => (
  <StyledMenu
    className={
      menu
        ? 'transform translate-x-0 duration-500 ease-in-out'
        : 'transform translate-x-full duration-500 ease-in-out'
    }
  >
    {isLoggedIn ? (
      <>
        <ul>
          <li>
            <Link to='/'>Discover</Link>
          </li>
          <li>
            <button type='button'>LogIn</button>
          </li>
          <li>
            <button type='button'>Join</button>
          </li>
          <li>
            <Link to='/about'>about</Link>
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
            <Link to='/profile'>My profile</Link>
          </li>
          <li>
            <Link to='/post'>Post</Link>
          </li>
          <li>
            <button type='button'>LogOut</button>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </>
    )}
  </StyledMenu>
);

Menu.propTypes = {
  menu: bool.isRequired,
  isLoggedIn: bool.isRequired,
};

export default Menu;
