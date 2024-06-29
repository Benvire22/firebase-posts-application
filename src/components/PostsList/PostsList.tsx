import React from 'react';
import PostItem from './PostItem';
import {Post} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  posts: Post[];
  onClick: (id: string) => void;
}

const PostsList: React.FC<Props> = ({posts, onClick}) => {
  return (
    <>
      <h1 className="text-center text-primary-emphasis mb-5">Posts</h1>
      <div className="px-3">
        {posts.length > 0 ? posts.map((post) => (
          <PostItem
            key={post.id}
            heading={post.title}
            datetime={post.datetime}
            onClick={() => onClick(post.id)}
          />
        )) : (
          <div className="d-flex flex-column">
            <h4 className="text-center fs-4 text-secondary-emphasis my-4">Empty...</h4>
            <Link to="/new-post" className="btn btn-success fs-4 px-4 mx-auto">Create post</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PostsList;