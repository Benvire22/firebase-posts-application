import React from 'react';

interface Props {
  heading: string
  datetime: string
  onClick: () => void;
}

const PostItem: React.FC<Props> = ({heading, datetime, onClick}) => {
  const date = new Date(datetime),
    dFormat = [
        date.getDate(),
        date.getMonth()+1,
        date.getFullYear()].join('.') + ' ' +
      [date.getHours(),
        date.getMinutes(),
        date.getSeconds()].join(':');

  return (
    <div>
      <span>Created on: {dFormat}</span>
      <h5>{heading}</h5>
      <button type="button" onClick={onClick}>Read more {'>>'}</button>
    </div>
  );
};

export default PostItem;