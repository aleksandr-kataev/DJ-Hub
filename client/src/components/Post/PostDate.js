import React, { useState, useEffect } from 'react';
import { PostDateProps } from '../../types/index';
import dateDiff from './helper';

const PostDate = (props) => {
  const { datePosted } = props;

  const [date, setDate] = useState(dateDiff(datePosted));

  useEffect(() => {
    const check = setInterval(() => {
      setDate(dateDiff(datePosted));
    }, 10000);
    return () => clearInterval(check);
  });

  return <span>{date}</span>;
};

PostDate.propTypes = PostDateProps;

export default PostDate;
