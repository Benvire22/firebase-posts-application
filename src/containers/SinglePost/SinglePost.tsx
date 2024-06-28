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
    <div className="fs-5 py-2 px-3 text-primary-emphasis">
      <span className="fs-4">Creation date: <strong className="text-success">{post.datetime}</strong></span>
      <h1 className="text-primary-emphasis text-center my-3 mb-5"> {post.title}</h1>
      <p className="fs-4 mb-5 border border-primary p-5 px-3 rounded">{post.description}</p>
      <div className="border-top border-bottom py-4 border-primary">
        <button onClick={() => onEdit(post.id)} className="btn btn-outline-success px-4 me-3 fs-3" >Edit post</button>
        <button onClick={() => onDelete(post.id)} className="btn btn-danger px-4 fs-3" >Delete post</button>
      </div>
    </div>
  );
};

export default SinglePost;