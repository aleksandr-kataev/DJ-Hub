import React from 'react';
import PostStyles from './PostStyles';
import Interaction from './Like';

const Post = (post) => {
  const { cntStyle, cntLink } = PostStyles;
  const {
    title,
    date,
    numOfLikes,
    numOfComments,
    comments,
    link,
    tag,
  } = post;
  return (
    <div className={cntStyle}>
      <p>{title}</p>
      <Interaction type='like' numOfLikes={numOfLikes} />
      <Interaction
        type='comment'
        numOfComments={numOfComments}
      />
    </div>
  );
};

export default Post;
