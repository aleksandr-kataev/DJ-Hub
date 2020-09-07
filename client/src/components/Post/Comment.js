import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dateDiff from './helper';
import { CommentProps } from '../../types/index';

const CommentCnt = styled.div.attrs({
  className: 'flex justify-between my-4 mx-4',
})``;

const Comment = ({ comment }) => {
  const [date, setDate] = useState(dateDiff(comment.date));

  useEffect(() => {
    const check = setInterval(() => {
      setDate(dateDiff(comment.date));
    }, 10000);
    return () => clearInterval(check);
  });

  return (
    <CommentCnt>
      <p>{comment.comment}</p>
      <p>{date}</p>
    </CommentCnt>
  );
};

Comment.propTypes = CommentProps;

export default Comment;
