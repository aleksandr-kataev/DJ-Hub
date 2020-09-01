import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import { CommentIconProps } from '../../types/index';

const CommentIconStyled = styled.div.attrs({
  className: 'flex',
})`
  & {
    span {
      ${tw`ml-2`}
    }
  }
`;

const CommentIcon = (props) => {
  const { commentCount } = props;
  return (
    <CommentIconStyled>
      <span>{commentCount}</span>
    </CommentIconStyled>
  );
};

CommentIcon.propTypes = CommentIconProps;

export default CommentIcon;
