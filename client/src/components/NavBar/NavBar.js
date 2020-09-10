/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavBarProps, DefaultNavBarProps } from '../../types/index';
import {
  NavBarStyled,
  LogoStyled,
  BurgerButtonStyled,
  LinkContainerStyled,
  NavLinkStyled,
} from './NavBarStyles';
import LogModal from './Modals/LogModal';
import RegModal from './Modals/RegModal';

const NavBar = ({ auth, logout }) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const LoggedOut = (
    <nav>
      <ul>
        <li>
          <Link to='discover'>
            <NavLinkStyled>
              <p>Discover</p>
            </NavLinkStyled>
          </Link>
        </li>
        <li>
          <Link to='categories'>
            <NavLinkStyled>
              <p>Categories</p>
            </NavLinkStyled>
          </Link>
        </li>
        <li>
          <button onClick={() => setShowLogModal(true)} type='button'>
            <NavLinkStyled>
              <p>Login</p>
            </NavLinkStyled>
          </button>
        </li>
        <li>
          <button onClick={() => setShowRegModal(true)} type='button'>
            <NavLinkStyled>
              <p>Join</p>
            </NavLinkStyled>
          </button>
        </li>
      </ul>
    </nav>
  );

  const LoggedIn = (
    <nav>
      <ul>
        <li>
          <Link to='discover'>
            <NavLinkStyled>
              <p>Discover</p>
            </NavLinkStyled>
          </Link>
        </li>
        <li>
          <Link to='categories'>
            <NavLinkStyled>
              <p>Categories</p>
            </NavLinkStyled>
          </Link>
        </li>
        <li>
          <Link to='post'>
            <NavLinkStyled>
              <p>Post</p>
            </NavLinkStyled>
          </Link>
        </li>
        <li>
          <Link to='user'>
            <NavLinkStyled>
              <p>My account</p>
            </NavLinkStyled>
          </Link>
        </li>
        <li>
          <button onClick={logout} type='button'>
            <NavLinkStyled>
              <p>Logout</p>
            </NavLinkStyled>
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <NavBarStyled>
        <LogoStyled>
          <Link to='/'>
            <p>DJ HUB</p>
          </Link>
        </LogoStyled>
        <BurgerButtonStyled>
          <IconContext.Provider
            value={{ color: 'white', size: '24px' }}
          >
            <GiHamburgerMenu
              onClick={() => setShowSideMenu(!showSideMenu)}
            />
          </IconContext.Provider>
        </BurgerButtonStyled>
        <LinkContainerStyled showSideMenu={showSideMenu}>
          {auth && auth.isAuthenticated ? LoggedIn : LoggedOut}
        </LinkContainerStyled>
      </NavBarStyled>
      <LogModal
        showLogModal={showLogModal}
        setShowLogModal={setShowLogModal}
      />
      <RegModal
        showRegModal={showRegModal}
        setShowRegModal={setShowRegModal}
      />
    </>
  );
};

NavBar.propTypes = NavBarProps;
NavBar.defaultProps = DefaultNavBarProps;

const mapStateToPros = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToPros, { logout })(NavBar);
