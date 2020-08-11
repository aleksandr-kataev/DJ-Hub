import styled from 'styled-components';
import tw from 'tailwind.macro';

const NavBarStyled = styled.nav.attrs({
  className:
    'flex items-center justify-between relative bg-black z-30',
})``;

const LeftContainer = styled.div.attrs({
  className: 'ml-6',
})`
  p {
    ${tw`text-base md:text-logoS lg:text-logoL text-white`}
  }
`;

const RightContainer = styled.div.attrs({
  className: 'flex items-center mr-6',
})`
  p {
    ${tw`hidden sm:inline-block text-white text-menu`}
  }
  button {
    ${tw`block text-white focus:outline-none`}
  }
  svg {
    ${tw`h-12 w-14 fill-current inline-block`}
  }
`;

export {
  NavBarStyled,
  LeftContainer,
  RightContainer,
};
