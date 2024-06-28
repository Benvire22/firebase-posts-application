import React from 'react';

interface Props {
  heading: string;
  datetime: string;
  onClick: () => void;
}

const PostItem: React.FC<Props> = ({heading, datetime, onClick}) => {
  return (
    <div className="border rounded mb-3 border-primary fs-5 py-3 px-3">
      <span className="text-primary-emphasis">Created on: {datetime}</span>
      <h5 className="text-warning fs-3 py-3">{heading}</h5>
      <button type="button" className="btn btn-outline-primary fs-3" onClick={onClick}>Read more {'>>'}</button>
    </div>
  );
};

export default PostItem;