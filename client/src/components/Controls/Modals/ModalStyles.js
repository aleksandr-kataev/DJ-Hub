import styled from 'styled-components';
import tw from 'tailwind.macro';
import { animated as a } from 'react-spring';

const Background = styled(a.div)`
  ${tw`fixed flex inset-0 bg-black z-40`};
  background-color: rgba(0, 0, 0, 0.7);
`;

const Modal = styled(a.div)`
  ${tw`bg-white shadow-md rounded  px-8 pt-6 pb-8 w-full max-w-xs m-auto`};

  & {
    label {
      ${tw`block mb-4`}
    }
    input {
      ${tw`shadow appearance-none border w-full py-2 px-3 mt-2 text-gray-700 leading-tight`}
    }
  }
`;

const Heading = styled.p`
  ${tw`text-center text-modalHeader mb-4`};
`;

const SubmitButton = styled.button`
  ${tw`focus:outline-none w-full mt-4 py-2 px-3 border border-2 border-gray-900`};
`;

const ErrorMessage = styled.p`
  ${tw`text-red-600`};
`;

export { Background, Modal, Heading, SubmitButton, ErrorMessage };
