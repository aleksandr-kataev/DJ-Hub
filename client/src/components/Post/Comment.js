import React from 'react';

const CommentStyle = {
  cntLike: '',
  text: '',
};

const Comment = (numOfComments) => (
  <div className={CommentStyle.cntLike}>
    <p className={CommentStyle.text}>
      {`Comments: ${numOfComments.numOfComments}`}
    </p>
  </div>
);

export default Comment;
