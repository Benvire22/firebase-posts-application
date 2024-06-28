import React from 'react';
import {Post} from '../../types';
import PostsList from '../../components/PostsList/PostsList';
import {useNavigate} from 'react-router-dom';

interface Props {
  posts: Post[];
  singlePost: (post: Post) => void;
}

const Home: React.FC<Props> = ({posts, singlePost}) => {
  const navigate = useNavigate();

  const readMorePost = (id: string) => {
    navigate('/posts/:id' + id);

    const post = posts.find((post) => post.id === id);
    if (post) {
      singlePost(post);
    }
  };

  return (
    <>
      <PostsList posts={posts} onClick={readMorePost}/>
    </>
  );
};

export default Home;