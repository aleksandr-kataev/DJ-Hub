import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { VscComment } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { CommentIconProps } from '../../types/index';

const CommentIconStyled = styled.div.attrs({
  className: 'flex hover:opacity-70 cursor-pointer',
})`
  & {
    span {
      ${tw`ml-2`}
    }
  }
`;

const CommentIcon = (props) => {
  const { handleOpenComments, commentCount } = props;
  return (
    <CommentIconStyled onClick={handleOpenComments}>
      <IconContext.Provider value={{ color: 'black', size: '24px' }}>
        <VscComment />
      </IconContext.Provider>
      <span>{commentCount}</span>
    </CommentIconStyled>
  );
};

CommentIcon.propTypes = CommentIconProps;

export default CommentIcon;