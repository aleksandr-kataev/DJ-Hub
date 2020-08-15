import React from 'react';

const LikeStyle = {
  cntLike: '',
  text: '',
};

const Like = (numOfLikes) => (
  <div className={LikeStyle.cntInteraction}>
    <p className={LikeStyle.text}>{numOfLikes}</p>
  </div>
);

export default Like;