import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import authService from '../../services/auth.service';
import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {
// get and set current user
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

// logout
  const signOut = () => {
    authService.signout();
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/private"} className="nav-link">
                Private
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/signin" className="nav-link" onClick={signOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/signin"} className="nav-link">
                Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </>
    
  )
}

export default Navbar