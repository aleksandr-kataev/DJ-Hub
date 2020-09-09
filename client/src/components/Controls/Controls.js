import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import NavBar from './NavBar/NavBar';
import Menu from './Menu/Menu';
import LogModal from './Modals/LogModal';
import RegModal from './Modals/RegModal';

const Controls = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);

  const animation = useSpring({
    opacity: showMenu ? 1 : 0,
    transform: showMenu ? 'translateX(0)' : 'translateX(100%)',
  });

  return (
    <div className='fixed'>
      <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <Menu
        showMenu={showMenu}
        setShowLogModal={setShowLogModal}
        setShowRegModal={setShowRegModal}
        style={animation}
      />
      <LogModal
        showLogModal={showLogModal}
        setShowLogModal={setShowLogModal}
      />
      <RegModal
        showRegModal={showRegModal}
        setShowRegModal={setShowRegModal}
      />
    </div>
  );
};

export default Controls;
