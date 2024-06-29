import React from 'react';
import {Post} from '../../types';
import PostsList from '../../components/PostsList/PostsList';
import {useNavigate} from 'react-router-dom';

interface Props {
  posts: Post[];
  getCurrentPost: (post: Post) => void;
}

const Home: React.FC<Props> = ({posts, getCurrentPost}) => {
  const navigate = useNavigate();

  const readMorePost = (id: string) => {
    navigate('/posts/:id' + id);

    const post = posts.find((post) => post.id === id);
    if (post) {
      getCurrentPost(post);
    }
  };

  return (
    <>
      <PostsList posts={posts} onClick={readMorePost}/>
    </>
  );
};

export default Home;