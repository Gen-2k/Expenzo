import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  LogOut,
  Wallet,
  Sparkles,
  TrendingUp,
  Plus, 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onAddClick }) => {
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Wallet, label: 'Accounts', path: '/accounts' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: TrendingUp, label: 'Budgets', path: '/budgets' },
    { icon: PieChart, label: 'Analytics', path: '/analytics' },
    { icon: Sparkles, label: 'AI Assistant', path: '/ai' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-8 py-8">
        <div className="p-2 bg-primary-600 rounded-xl shadow-lg shadow-primary-600/20">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Expenzo
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5 transition-colors" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-100 mb-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
