import styled from 'styled-components';
import tw from 'tailwind.macro';

const StyledMenu = styled.div`
  ${tw`flex absolute w-2/12 bg-gray-800 
  h-full top-0 right-0 z-20`}
  ul {
    ${tw`m-auto`}
  }
  li {
    ${tw`my-12 text-sideMenu text-white opacity-50`}
  }
`;

//

export default StyledMenu;
