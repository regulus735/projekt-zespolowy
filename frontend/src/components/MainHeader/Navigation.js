import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        )}

        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>
              <Link to="/login">Logout</Link>
            </button>
          </li>
        )}
        {!ctx.isLoggedIn && !ctx.isSignIn && (
          <li>
            <button onClick={ctx.onSignIn}>
              <Link to="/sign">Sign in</Link>
            </button>
          </li>
        )}
        {!ctx.isLoggedIn && ctx.isSignIn && (
          <li>
            <button onClick={ctx.onSignOff}>
              <Link to="/login">Login</Link>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
