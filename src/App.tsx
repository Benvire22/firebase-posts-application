import {NavLink, Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import {useState} from 'react';
import {Post} from './types';

const App = () => {
  const [postsData, setPostsData] = useState<Post[]>([
    {id: '1', datetime: Date.now(), title: 'Hello1'},
    {id: '2', datetime: Date.now(), title: 'Hello2'},
    {id: '3', datetime: Date.now(), title: 'Hello3'},
    {id: '4', datetime: Date.now(), title: 'Hello4'},
  ]);

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
              <Route path="*" element={<h1 className="text-center my-5 text-danger">Sorry page not a found!</h1>} />
            </Routes>
          </main>
        </>
    );
};

export default App;