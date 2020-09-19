import { useEffect, useState } from 'react';
import dateDiff from './helper';
import { CommentProps } from '../../types/index';

const Comment = ({ comment }) => {
  const [date, setDate] = useState(dateDiff(comment.date));
  console.log(date);
  useEffect(() => {
    const check = setInterval(() => {
      setDate(dateDiff(comment.date));
    }, 10000);
    return () => clearInterval(check);
  });

  return null;
};

Comment.propTypes = CommentProps;

export default Comment;
