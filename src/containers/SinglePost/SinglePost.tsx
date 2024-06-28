import React from 'react';
import {Post} from '../../types';
import {useNavigate} from 'react-router-dom';

interface Props {
  post: Post | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SinglePost: React.FC<Props> = ({post, onDelete, onEdit}) => {
  const navigate = useNavigate();

  if (!post) {
    navigate('/');
  }

  return post && (
    <div>
      <h1>{post.title}</h1>
      <span>{post.datetime}</span>
      <p>{post.description}</p>
      <div>
        <button onClick={() => onEdit(post.id)}>Edit post</button>
        <button onClick={() => onDelete(post.id)}>Delete post</button>
      </div>
    </div>
  );
};

export default SinglePost;