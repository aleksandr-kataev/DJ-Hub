import styled from 'styled-components';
import tw from 'tailwind.macro';

const PostStyled = styled.div`
  ${tw`m-auto mt-6 max-w-5xl rounded overflow-hidden shadow-lg my-4`}
`;

const Container = styled.div`
  ${tw`flex justify-between my-4 mx-4`};
`;

const PlayerStyled = styled.div`
  ${tw`mx-4`};
`;

const InteractionStyled = styled.div`
  ${tw`flex justify-between`}
`;

const AddCommentStyled = styled.div`
  ${tw`flex justify-between my-8 mx-4`};
  & {
    input {
      width: 80%;
      text-indent: 10px;
      ${tw`border border-gray-600 rounded-sm`};
    }
    button {
      ${tw`bg-transparent hover:bg-black text-black 
      font-semibold hover:text-white py-1 px-5 border 
      border-gray-600 rounded focus:outline-none`}
    }
  }
`;

export {
  PostStyled,
  Container,
  PlayerStyled,
  InteractionStyled,
  AddCommentStyled,
};
