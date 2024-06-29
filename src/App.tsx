import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import axiosApi from './axiosApi';
import {PostApi, Post} from './types';
import Home from './containers/Home/Home';
import PostForm from './containers/PostForm/PostForm';
import SinglePost from './containers/SinglePost/SinglePost';
import ToolBar from './components/ToolBar/ToolBar';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import NotFound from './containers/NotFound/NotFound';
import handleError from './lib/handleError';
import './App.css';

interface ApiPosts {
  [key: string]: PostApi;
}

const App = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getPostsApi = useCallback(async () => {
    try {
      const {data} = await axiosApi.get<ApiPosts>('/posts.json');

      if (data !== null) {
        const arrayApiPosts: Post[] = Object.keys(data).map((key) => {
          return {
            ...data[key],
            id: key,
          };
        });
        setPostsData(arrayApiPosts);
      }
    } catch (e) {
      handleError(e as Error);
      setError(true);
    }
  }, []);

  useEffect(() => {
    void getPostsApi();
  }, [getPostsApi]);

  const postsRequest = async (post: PostApi) => {
    try {
      await axiosApi.post('/posts.json', post);
    } catch (e) {
      handleError(e as Error);
      setError(true);
    }
  };

  const getCurrentPost = (post: Post) => {
    setCurrentPost(post);
  };

  const removePost = async (id: string) => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
      setPostsData((prevState) => prevState.filter((post) => post.id !== id));
      navigate('/');
    } catch (e) {
      handleError(e as Error);
      setError(true);
    }
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
        <ToolBar/>
      </header>
      <main className="container-xl py-5 rounded border h-600 border-primary">
        {error ? (
          <h2 className="text-center fs-1 mb-5 text-danger">Sorry, unexpected Error was occurred!</h2>
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={postsData}
                getCurrentPost={getCurrentPost}
              />
            }/>
          <Route
            path="/posts/:id"
            element={
              <SinglePost
                onEdit={onEdit}
                onDelete={removePost}
                post={currentPost}
              />}
          />
          <Route
            path="/posts/:id/edit"
            element={
              <PostForm
                changePost={changePost}
                onSubmit={postsRequest}
                post={currentPost}
                isError={setError}
              />}
          />
          <Route
            path="/new-post"
            element={
              <PostForm
                changePost={changePost}
                onSubmit={postsRequest}
                post={null}
              />}
          />
          <Route
            path="/about"
            element={<About/>}
          />
          <Route
            path="/contacts"
            element={<Contacts/>}
          />
          <Route
            path="*"
            element={<NotFound/>}/>
        </Routes>
      </main>
      <footer className="navbar navbar-expand-lg p-0 mt-5 bg-warning">
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