import styled from 'styled-components';
import tw from 'tailwind.macro';
import { animated as a } from 'react-spring';

const MenuStyled = styled(a.div)`
  ${tw`flex fixed w-2/12 bg-black h-full top-0 right-0 z-20`};

  & {
    ul {
      ${tw`m-auto text-sideMenu text-white`};
      li {
        ${tw`my-12`};
      }
    }

    button {
      ${tw`focus:outline-none`};
    }
  }
`;

export default MenuStyled;
