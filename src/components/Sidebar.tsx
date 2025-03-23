import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, LogOut, LayoutDashboard, PieChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <PieChart className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">AnyRH Analytics</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="px-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive('/') 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Tableau de bord
          </Link>
          
          <Link
            to="/employees"
            className={`flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive('/employees') 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="mr-3 h-5 w-5" />
            Analyse par employé
          </Link>
          
          <Link
            to="/reports"
            className={`flex items-center px-4 py-3 text-sm rounded-lg ${
              isActive('/reports') 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            Rapports
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
