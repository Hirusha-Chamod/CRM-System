import React, { useState } from 'react';
import {
  Home,
  Users,
  FileText,
  Ticket,
  Settings,
  LogOut,
  User,
  CreditCard
} from 'lucide-react';
import { Outlet } from 'react-router-dom';

const Sidebar = ({ userType, onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Sidebar menu items based on user type
  const getSidebarItems = () => {
    switch (userType) {
      case 'admin':
        return [
          { icon: <Home />, label: 'Dashboard', link: '/dashboard' },
          { icon: <Users />, label: 'User Management', link: '/admin/allUsers' },
          { icon: <Users />, label: 'User Management', link: '/admin/createUser' },
          { icon: <Settings />, label: 'System Settings', link: '/settings' }
        ];
      case 'Financial Planner':
        return [
          { icon: <Home />, label: 'Dashboard', link: '/dashboard' },
          { icon: <Ticket />, label: 'Create Ticket', link: '/create-ticket' },
          { icon: <FileText />, label: 'My Tickets', link: '/my-tickets' },
          { icon: <User />, label: 'Client Management', link: '/clients' }
        ];
      case 'Mortgage Broker':
        return [
          { icon: <Home />, label: 'Dashboard', link: '/dashboard' },
          { icon: <Ticket />, label: 'Received Tickets', link: '/received-tickets' },
          { icon: <CreditCard />, label: 'Mortgage Analysis', link: '/mortgage-analysis' }
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="flex">
      <div
        className={`
        bg-white border-r border-gray-200 h-screen 
        flex flex-col transition-all duration-300 
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isExpanded && (
            <h2 className="text-xl font-bold text-gray-800">
              CRM System
            </h2>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              {isExpanded ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className="
                hover:bg-gray-100 
                transition-colors 
                duration-200 
                cursor-pointer
              "
              >
                <a
                  href={item.link}
                  className="
                  flex items-center 
                  p-4 
                  text-gray-700 
                  hover:text-blue-600
                "
                >
                  <span className="mr-4">{item.icon}</span>
                  {isExpanded && (
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="border-t p-4">
          <button
            onClick={onLogout}
            className="
            w-full 
            flex items-center 
            text-red-600 
            hover:bg-red-50 
            p-2 
            rounded 
            transition-colors 
            duration-200
          "
          >
            <LogOut className="mr-4" />
            {isExpanded && <span className="text-sm">Logout</span>}
          </button>
        </div>
        <div className="flex-1 p-4">
          <Outlet /> {/* This is where the nested route will render */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;