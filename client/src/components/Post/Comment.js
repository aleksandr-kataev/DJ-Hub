import React from 'react';

const CommentStyle = {
  cntLike: '',
  text: '',
};

const Comment = (comment) => (
  <div className={CommentStyle.cntLike}>{comment}</div>
);

export default Comment;
