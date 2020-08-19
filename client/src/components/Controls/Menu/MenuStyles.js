const MenuStyles = {
  menu: `flex absolute w-2/12 bg-black 
  h-full top-0 right-0 z-20`,
  openedMenu: 'transform translate-x-0 duration-500 ease-in-out',
  closedMenu: 'transform translate-x-full duration-500 ease-in-out',
  ul: 'm-auto text-sideMenu text-white',
  li: 'my-12',
  button: 'focus:outline-none',
};

export default MenuStyles;

// Controlls component
// Which has a navbar, side menu and modals and they share states
// inside the controlls component
