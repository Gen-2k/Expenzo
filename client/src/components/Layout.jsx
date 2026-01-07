import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { Menu, Wallet } from 'lucide-react';
import AddExpenseModal from './AddExpenseModal'; // We'll create this next

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Top Bar (Optional, for brand visibility) */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
           <div className="p-1.5 bg-primary-600 rounded-lg">
             <Wallet className="w-4 h-4 text-white" />
           </div>
           <span className="text-lg font-bold text-gray-900">Expenzo</span>
        </div>
        <button className="p-2 text-gray-600">
           <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="md:pl-64 p-6 md:p-10 pb-28 md:pb-10 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav onAddClick={() => setIsModalOpen(true)} />

      {/* Add Expense Modal */}
      {isModalOpen && (
        <AddExpenseModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
