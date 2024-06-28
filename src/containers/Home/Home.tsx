import React from 'react';
import {Post} from '../../types';
import PostsList from '../../components/PostsList/PostsList';

interface Props {
  posts: Post[];
}
const Home:React.FC<Props> = ({posts}) => {

  const click = (id: string) => {
    console.log(id);
  };

  return (
    <div>
      <PostsList posts={posts} onClick={click} />
    </div>
  );
};

export default Home;