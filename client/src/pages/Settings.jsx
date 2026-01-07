import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Bell,
  Shield,
  Moon,
  Globe,
  LogOut,
  ChevronRight,
  CreditCard,
  HelpCircle,
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();

  // --- Constants (Settings Configuration) ---
  const SETTINGS_SECTIONS = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Personal Information',
          desc: 'Name, Email, Profile Photo',
        },
        {
          icon: CreditCard,
          label: 'Payment Methods',
          desc: 'Manage your connected cards',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          desc: 'Customize your alerts',
          toggle: true,
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          desc: 'Switch to dark theme',
          toggle: true,
        },
        { icon: Globe, label: 'Language', desc: 'English (US)' },
      ],
    },
    {
      title: 'Security & Support',
      items: [
        { icon: Shield, label: 'Security', desc: 'Password, 2FA' },
        { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ, Contact Us' },
      ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        {/* --- SECTION 1: USER PROFILE --- */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-primary-500/30">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-4 flex gap-3 justify-center md:justify-start">
              <button className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
                Edit Profile
              </button>
              <button className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Change Plan
              </button>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: SETTINGS GROUPS --- */}
        <div className="grid grid-cols-1 gap-6">
          {SETTINGS_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Section Header */}
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                <h3 className="font-bold text-gray-900">{section.title}</h3>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-50">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 md:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-gray-100 text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-500 md:hidden">
                          {item.desc}
                        </p>
                        <p className="text-sm text-gray-500 hidden md:block">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {item.toggle ? (
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700">
                        <div className="absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all"></div>
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION 3: LOGOUT --- */}
        <div className="pt-4 pb-12">
          <button
            onClick={logout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 border border-red-100"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
