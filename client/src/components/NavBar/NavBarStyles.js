import styled from 'styled-components';
import tw from 'tailwind.macro';

const NavBarStyled = styled.div`
  ${tw`sticky top-0 lg:px-16 px-6 bg-black flex flex-wrap items-center lg:py-0 py-2`}

  & {
    button {
      ${tw`focus:outline-none`}
    }
    ul {
      ${tw`lg:flex items-center justify-between pt-4 lg:pt-0`}
    }
  }
`;

const LogoStyled = styled.div`
  ${tw`flex-1 flex justify-between items-center`}
  & {
    p {
      ${tw`md:text-logoS lg:text-logoL text-white font-bold`}
    }
  }
`;

const BurgerButtonStyled = styled.div`
  ${tw`cursor-pointer lg:hidden block`}
`;

const LinkContainerStyled = styled.div`
  ${tw`hidden lg:flex lg:items-center lg:w-auto w-full`}
  display: ${(props) => props.showSideMenu && 'block'}
`;

const NavLinkStyled = styled.div`
  ${tw`lg:p-4 py-3 px-0 block border-b-2 border-transparent`}
  & {
    p {
      ${tw`text-navL text-white`}
    }
  }
`;

export {
  NavBarStyled,
  LogoStyled,
  BurgerButtonStyled,
  LinkContainerStyled,
  NavLinkStyled,
};
