import React from 'react';
import HomeStyles from './HomeStyles';
import Post from '../Post';

const Home = () => {
  const date = new Date();
  return (
    <div className={HomeStyles}>
      <Post
        title='1k mix'
        date={date}
        numofLikes={12}
        numofComments={13}
        link='www.souncloud.com'
        tag='dng'
      />
    </div>
  );
};

export default Home;
