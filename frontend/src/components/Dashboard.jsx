import React, { useState } from 'react';
import {
  Home,
  Users,
  FileText,
  Ticket,
  Menu,
  X
} from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const Sidebar = ({ role }) => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar items based on user role
  const getSidebarItems = () => {
    switch (role) {
      case 'Admin':
        return [
          { icon: <Home />, label: 'Dashboard', link: '/admin' },
          { icon: <Users />, label: 'User Management', link: '/admin/allUsers' },
          { icon: <Users />, label: 'Create Account', link: '/admin/createUser' },
        ];
      case 'Financial Planner':
      case 'Mortgage Broker':
        return [
          { icon: <Home />, label: 'Dashboard', link: '/users' },
          { icon: <Ticket />, label: 'Create Ticket', link: '/users/createTicket' },
          { icon: <FileText />, label: 'My Tickets', link: '/users/myTickets' },
          { icon: <Ticket />, label: 'Received Tickets', link: '/users/receivedTickets' },
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();


  return (
    <div className="flex">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-100 p-2 rounded-md"
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <div className="hidden md:block w-64 bg-slate-700 border-r border-gray-200 h-screen">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-white">CRM System</h2>
        </div>
        <nav>
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="hover:bg-gray-100">
                <Link
                  to={item.link}
                  className="flex items-center p-4 text-white hover:text-blue-600"
                >
                  <span className="mr-4">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="
            fixed inset-0 bg-slate-700 z-40 
            md:hidden 
            overflow-y-auto 
            pt-16
          "
        >
          <nav>
            <ul>
              {sidebarItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 border-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link
                    to={item.link}
                    className="flex items-center p-4 text-white hover:text-blue-600"
                  >
                    <span className="mr-4">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <div className="flex-1 w-full bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;