import React from 'react';
import HomeStyles from './HomeStyles';
import Post from '../Post';

const Home = () => {
  const post = {
    title: '1k mix',
    date: new Date('August 19, 2020 16:05:00'),
    numOfLikes: 12,
    numOfComments: 13,
    link: 'www.souncloud.com',
    tag: 'dnb',
  };
  return (
    <div className={HomeStyles}>
      <Post post={post} />
    </div>
  );
};

export default Home;
