import { Route, Routes, useNavigate} from 'react-router-dom';
import Home from './containers/Home/Home';
import {useCallback, useEffect, useState} from 'react';
import {PostApi, Post} from './types';
import PostForm from './containers/PostForm/PostForm';
import axiosApi from './axiosApi';
import SinglePost from './containers/SinglePost/SinglePost';
import ToolBar from './components/ToolBar/ToolBar';

interface ApiPosts {
  [key: string]: PostApi;
}

const App = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  const getPostsApi = useCallback(async () => {
    const {data} = await axiosApi.get<ApiPosts>('/posts.json');
    console.log(data);

    if (data !== null) {
      const arrayApiPosts: Post[] = Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key,
        };
      });

      setPostsData(arrayApiPosts);
    }
  }, []);

  useEffect(() => {
    void getPostsApi();
  }, [getPostsApi]);

  const postsRequest = async (post: PostApi) => {
    try {
      await axiosApi.post('/posts.json', post);
    } catch (e) {
      const result = e as Error;
      console.error(result.message);
    }
  };

  const getCurrentPost = (post: Post) => {
    setCurrentPost(post);
  };

  const removePost = async (id: string) => {
    await axiosApi.delete(`/posts/${id}.json`);
    setPostsData((prevState) => {
      return prevState.filter((post) => post.id !== id);
    });
    navigate('/');
  };

  const onEdit = (id: string) => {
    navigate(`/posts/:id${id}/edit`);
  };

  const changePost = (currentPost: Post) => {
    setPostsData((prevState) => {
      return prevState.map((post) => post.id === currentPost.id ? currentPost : post);
    });
    navigate('/');
  };

  return (
    <>
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-xl py-5 vh-100 border border-primary">
        <Routes>
          <Route path="/" element={<Home posts={postsData} singlePost={getCurrentPost}/>}/>
          <Route path="/posts/:id" element={<SinglePost onEdit={onEdit} onDelete={removePost} post={currentPost}/>}/>
          <Route path="/posts/:id/edit"
                 element={<PostForm changePost={changePost} onSubmit={postsRequest} post={currentPost}/>}/>
          <Route path="/new-post" element={<PostForm changePost={changePost} onSubmit={postsRequest} post={null}/>}/>
          <Route path="*" element={<h1 className="text-center my-5 text-danger">Sorry page not a found!</h1>}/>
        </Routes>
      </main>
      <footer className="navbar navbar-expand-lg p-0 bg-warning">
        <div className="container-xl text-white py-5 pb-4 d-flex justify-content-center flex-column align-items-center">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda,
            debitis esse ex expedita laboriosam modi nihil officiis porro vero!</p>
          <p>Lorem ipsum dolor sit amet, consectetur.</p>
        </div>
      </footer>
    </>
  );
};

export default App;