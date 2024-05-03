import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import authService from './services/auth.service';

import Home from './pages/home/Home'
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Event from './pages/event/Event';
import User from './pages/user/User';
import Manager from './pages/manager/Manager';
import Admin from './pages/admin/Admin';
import NotFound from './pages/notFound/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/event" element={<Event />} />
          <Route path="/user/:username" element={<authService.RequireAuth requiredRoles={["ROLE_USER"]}><User /></authService.RequireAuth>} />
          <Route path="/manager/:username" element={<authService.RequireAuth requiredRoles={["ROLE_MANAGER"]}><Manager /></authService.RequireAuth>} />
          <Route path="/admin/:username" element={<authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}><Admin /></authService.RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;