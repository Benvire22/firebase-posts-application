import React from 'react';
import PostItem from './PostItem';
import {Post} from '../../types';

interface Props {
  posts: Post[];
  onClick: (id: string) => void;
}

const PostsList: React.FC<Props> = ({posts, onClick}) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          heading={post.title}
          datetime={post.datetime}
          onClick={() => onClick(post.id)}
        />
      ))}
    </div>
  );
};

export default PostsList;