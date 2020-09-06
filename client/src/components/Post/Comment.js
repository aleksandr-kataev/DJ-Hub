import React from 'react';
import styled from 'styled-components';

const CommentCnt = styled.div.attrs({
  className: 'flex justify-between my-2 mx-4',
})``;

const Comment = (comment) => (
  <CommentCnt>
    <p>{comment.comment}</p>
    <p>1 day ago</p>
  </CommentCnt>
);

export default Comment;
