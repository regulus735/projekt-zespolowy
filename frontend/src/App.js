import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import Sign from './components/Sign/Sign';
import Projects from './components/Projects/Projects';
import { ProjectContextProvider } from './store/projectContext/projectContext';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="styleAll">
        <MainHeader />
        <ProjectContextProvider>
          <Routes>
            {!ctx.isLoggedIn && !ctx.isSignIn && <Route path="/login" element={<Login />}></Route>}

            {!ctx.isLoggedIn && ctx.isSignIn && <Route path="/sign" element={<Sign />}></Route>}
            {ctx.isLoggedIn && (
              <>
                <Route path="/home/:id" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="projects" element={<Projects />} />
              </>
            )}
          </Routes>
        </ProjectContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

//<Route path="home" element={ctx.isLoggedIn && <Home />} />

/*
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Login />}>
          <Route
            path="header"
            element={!ctx.isLoggedIn & !ctx.isSignIn ? <Login /> : ""}
          />
          <Route
            path="login"
            element={!ctx.isLoggedIn & !ctx.isSignIn ? <Login /> : ""}
          />
          <Route
            path="sign"
            element={!ctx.isLoggedIn & ctx.isSignIn ? <Sign /> : ""}
          />
          <Route path="home" element={ctx.isLoggedIn && <Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    */
