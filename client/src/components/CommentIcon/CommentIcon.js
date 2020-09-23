import React from 'react';
import { Chat } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { CommentIconProps } from '../../types/index';
import './CommentIcon.css';

const CommentIcon = ({ id, numOfComments, redirect }) => {
  const history = useHistory();
  const handlePostRedirect = () => {
    if (redirect) {
      history.push(`posts/${id}`);
    }
  };

  return (
    <div
      className='commentIcon'
      tabIndex={0}
      role='button'
      onKeyDown={handlePostRedirect}
      onClick={handlePostRedirect}
    >
      <Chat size={18} />
      <span className='commentIcon__count'>{numOfComments}</span>
    </div>
  );
};

CommentIcon.propTypes = CommentIconProps;

export default CommentIcon;
