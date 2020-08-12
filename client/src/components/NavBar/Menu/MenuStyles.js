const MenuStyles = {
  menu: `flex absolute w-2/12 bg-black 
  h-full top-0 right-0 z-20`,
  openedMenu:
    'transform translate-x-0 duration-500 ease-in-out',
  closedMenu:
    'transform translate-x-full duration-500 ease-in-out',
  ul: 'm-auto text-sideMenu text-white',
  li: 'my-12',
};

//

export default MenuStyles;

/**
 * flex absolute w-2/12 bg-black bg-opacity-90
  h-full top-0 right-0 z-20  div

  `my-12 text-sideMenu text-white opacity-80 li

  m-auto transform hover:-translate-y-1 hover:scale-110 ul
 */
