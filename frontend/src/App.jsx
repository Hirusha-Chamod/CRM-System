import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from './features/user';
import Login from './pages/Auth/Login';
import AdminRoutes from './views/Admin';
import UserRoutes from './views/Users';
import Sidebar from './components/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Dispatching authCheck...');
    dispatch(authCheck());
  }, [dispatch]);

  const { user, isAuthenticated = false, loading = false } = useSelector((state) => state.user || {});

  useEffect(() => {
    console.log('User:', user);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('Loading:', loading);
  }, [user, isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render routes based on the user role (admin or other)
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? (
          user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/users" />
        ) : <Navigate to="/login" />}
      />
      {/* Admin and User routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/users/*" element={<UserRoutes />} />

      {/* Login route */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
