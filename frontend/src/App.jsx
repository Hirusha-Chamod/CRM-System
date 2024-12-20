import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from './features/user';
import Login from './pages/Auth/Login';
import Sidebar from './components/Dashboard';
import CreateUsers from './pages/Admin/CreateUsers';
import AllUsers from './pages/Admin/AllUsers';
import CreateTicket from './pages/Users/CreateTicket';
import MyTickets from './pages/Users/MyTickets';
import ReceivedTickets from './pages/Users/ReceivedTickets';
import Homepage from './pages/HomePage';
import AdminRegister from './pages/Admin/AdminRegister';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated = false, loading = false } = useSelector((state) => state.user || {});

  useEffect(() => {
    console.log('Dispatching authCheck...');
    dispatch(authCheck());
  }, [dispatch]);



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
          user?.role === 'Admin' ? <Navigate to="/admin" /> : <Navigate to="/users" />
        ) : <Navigate to="/login" />}
      />


      <Route path="/admin/*" element={<Sidebar role="Admin" />}>
        <Route path="" element={<Homepage />} />

        <Route path="createUser" element={<CreateUsers />} />
        <Route path="allUsers" element={<AllUsers />} />
      </Route>

      <Route path="/users/*" element={<Sidebar role={user?.role} />} >
        <Route path="" element={<Homepage />} />
        <Route path="createTicket" element={<CreateTicket />} />
        <Route path="myTickets" element={<MyTickets />} />
        <Route path="receivedTickets" element={<ReceivedTickets />} />
      </Route>

      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route path='admin/register' element={<AdminRegister />} />
    </Routes>
  );
}

export default App;
