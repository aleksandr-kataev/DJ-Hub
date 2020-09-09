import styled from 'styled-components';
import tw from 'tailwind.macro';

const Nav = styled.nav`
  ${tw`flex items-center justify-between bg-black z-30 text-7xl`}
  & {
    button {
      ${tw`block text-white focus:outline-none`}
    }
  }
`;

const Left = styled.div`
  ${tw`ml-6 md:text-logoS lg:text-logoL text-white font-bold`};
`;

const Right = styled.div`
  ${tw`flex items-center mr-6 hidden sm:inline-block text-white text-menu`};
`;

export { Nav, Left, Right };
