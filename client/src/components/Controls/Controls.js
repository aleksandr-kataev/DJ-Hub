import React, { useState } from 'react';
import NavBar from './NavBar/NavBar';
import Menu from './Menu/Menu';
import LogModal from './Modals/LogModal';
import RegModal from './Modals/RegModal';

const Controls = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);

  return (
    <>
      <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <Menu
        showMenu={showMenu}
        setShowLogModal={setShowLogModal}
        setShowRegModal={setShowRegModal}
      />
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

export default Controls;
