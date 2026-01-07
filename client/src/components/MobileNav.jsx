import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, Sparkles, Settings, Plus } from 'lucide-react';

const MobileNav = ({ onAddClick }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Wallet, label: 'Wallet', path: '/accounts' },
    { icon: Sparkles, label: 'AI', path: '/ai' },
    { icon: Settings, label: 'Menu', path: '/settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 h-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 z-50 flex items-center justify-between px-6">
       {/* Left Items */}
       <div className="flex gap-1">
        {navItems.slice(0, 2).map((item) => (
            <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center w-12 h-full transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`
            }
            >
            <item.icon className="w-6 h-6" />
            </NavLink>
        ))}
       </div>

      {/* Floating Add Button */}
      <div className="relative -top-6">
        <button 
          onClick={onAddClick}
          className="flex items-center justify-center w-14 h-14 bg-primary-600 rounded-full shadow-lg shadow-primary-600/30 text-white hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

       {/* Right Items */}
       <div className="flex gap-1">
        {navItems.slice(2, 4).map((item) => (
            <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center w-12 h-full transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`
            }
            >
            <item.icon className="w-6 h-6" />
            </NavLink>
        ))}
       </div>
    </div>
  );
};

export default MobileNav;
