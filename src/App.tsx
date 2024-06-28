import {NavLink, Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import {useCallback, useEffect, useState} from 'react';
import {PostApi, Post} from './types';
import NewPost from './containers/NewPost/NewPost';
import axiosApi from './axiosApi';

interface ApiPosts {
  [key: string]: PostApi;
}

const App = () => {
  const [postsData, setPostsData] = useState<Post[]>([
  ]);

  const getPostsApi = useCallback( async () => {
    const {data} = await axiosApi.get<ApiPosts>('/posts.json');
    console.log(data);

    const arrayApiPosts: Post[]  = Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key,
        };
    });

    setPostsData(arrayApiPosts);
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

    return (
        <>
          <header>
            <nav className="navbar py-3 navbar-expand-lg p-0 bg-warning" data-bs-theme="dark">
              <div className="container-xl">
                <NavLink to="/" className="navbar-brand">
                  Logo
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto gap-4 fs-4">
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/new-post" className="nav-link">Add</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/about" className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/contacts" className="nav-link">Contacts</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
          <main className="container-xl py-5">
            <Routes>
              <Route path="/" element={<Home posts={postsData} />} />
              <Route path="/new-post" element={<NewPost onSubmit={postsRequest} />} />
              <Route path="*" element={<h1 className="text-center my-5 text-danger">Sorry page not a found!</h1>} />
            </Routes>
          </main>
        </>
    );
};

export default App;