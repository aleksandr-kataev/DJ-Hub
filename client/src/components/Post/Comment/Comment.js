import React from 'react';
import { Chat } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Comment.css';

const Comment = ({ id, numOfComments }) => {
  const history = useHistory();
  const handlePostRedirect = () => {
    history.push(`./posts/${id}`);
  };

  return (
    <div
      className='comment'
      tabIndex={0}
      role='button'
      onKeyDown={handlePostRedirect}
      onClick={handlePostRedirect}
    >
      <Chat size={18} />
      <span className='comment__count'>{numOfComments}</span>
    </div>
  );
};

Comment.propTypes = {
  numOfComments: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Comment;
