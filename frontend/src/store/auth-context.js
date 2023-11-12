import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isSignIn: false,
  onLogout: () => {},
  onSignIn: () => {},
  onSignOff: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("isSignedIn", "0");
    setIsLoggedIn(false);
  };

  //const navigate = useNavigate();
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    //navigate("/home");
  };

  const signInHandler = () => {
    localStorage.setItem("isSignedIn", "1");
    setIsSignedIn(true);
  };

  const signOffHandler = () => {
    localStorage.setItem("isSignedIn", "0");
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        isSignIn: isSignedIn,
        onSignIn: signInHandler,
        onSignOff: signOffHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
