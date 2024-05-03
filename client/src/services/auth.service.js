import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';

const signUp = async (username, email, password) => {
  try {
    const response = await axios.post('/signup', {
      username,
      email,
      password,
    });

    if (response.data.message) {
      return response.data;
    }
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

const signIn = async (username, password) => {
  try {
    const response = await axios.post('/signin', {
      username,
      password,
    });

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

const signout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Protecting Routes by checking roles
const RequireAuth = ({ children, requiredRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !requiredRoles.some(role => user.roles.includes(role))) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }
  return children;
};

const authService = {
  signUp,
  signIn,
  signout,
  getCurrentUser,
  RequireAuth,
};

export default authService;
