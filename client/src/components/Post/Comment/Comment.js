import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CommentProps } from '../../../types';
import dateDiff from '../../helpers/DateDiff';
import './Comment.css';

const Comment = ({ comment }) => {
  const history = useHistory();
  const [date, setDate] = useState(dateDiff(comment.date));

  const handleUserRedirect = () => {
    history.push(`/users/${comment.username}`);
  };

  useEffect(() => {
    const check = setInterval(() => {
      setDate(dateDiff(comment.date));
    }, 10000);
    return () => clearInterval(check);
  });

  return (
    <>
      <div className='comment'>
        <div className='comment__left'>
          <button
            onClick={handleUserRedirect}
            type='button'
            className='comment__username'
          >
            {comment.username}
          </button>
          <div>
            <span className='comment__comment'>
              {comment.comment}
            </span>
          </div>
        </div>

        <span className='comment__date'>{date}</span>
      </div>
    </>
  );
};

Comment.propTypes = CommentProps;

export default Comment;
