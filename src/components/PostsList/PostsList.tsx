import React from 'react';
import PostItem from './PostItem';
import {Post} from '../../types';

interface Props {
  posts: Post[];
  onClick: (id: string) => void;
}

const PostsList: React.FC<Props> = ({posts, onClick}) => {
  return (
    <>
      <h1 className="text-center text-primary-emphasis mb-5">Posts</h1>
      <div className="border border-primary p-3 rounded">
        {posts.length > 0 ? posts.map((post) => (
          <PostItem
            key={post.id}
            heading={post.title}
            datetime={post.datetime}
            onClick={() => onClick(post.id)}
          />
        )) : <h4 className="text-center fs-4 text-secondary-emphasis my-4">Empty..</h4>}
      </div>
    </>
  );
};

export default PostsList;