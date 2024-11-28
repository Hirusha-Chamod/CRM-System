import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from './features/user';
import Login from './pages/Auth/Login';
import Sidebar from './components/Dashboard';
import CreateUsers from './pages/Admin/CreateUsers';
import AllUsers from './pages/Admin/AllUsers';

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

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? (
          user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/users" />
        ) : <Navigate to="/login" />}
      />
      {/* Admin and User routes with Sidebar */}
      <Route path="/admin/*" element={<Sidebar role="admin" />}>
        <Route path="createUser" element={<CreateUsers />} />
        <Route path="allUsers" element={<AllUsers />} />
      </Route>

      <Route path="/users/*" element={<Sidebar role={user?.role} />} />

      {/* Login route */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
