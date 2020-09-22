import React, { useState, useEffect } from 'react';
import { DateProps } from '../../types/index';
import dateDiff from './DateDiff';

const Date = ({ datePosted }) => {
  const [date, setDate] = useState(dateDiff(datePosted));
  useEffect(() => {
    const check = setInterval(() => {
      setDate(dateDiff(datePosted));
    }, 10000);
    return () => clearInterval(check);
  });

  return <span>{date}</span>;
};

Date.propTypes = DateProps;

export default Date;
