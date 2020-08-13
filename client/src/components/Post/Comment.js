import React from 'react';

const CommentStyle = {
  cntLike: '',
  text: '',
};

const Comment = (numOfComments) => (
  <div className={CommentStyle.cntLike}>
    <p className={CommentStyle.text}>{numOfComments}</p>
  </div>
);

export default Comment;
