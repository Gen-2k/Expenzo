import React from 'react';
import Layout from '../components/Layout';
import { CreditCard, Plus, Wallet, ShieldCheck, MoreVertical, Smartphone } from 'lucide-react';

const Accounts = () => {
  const accounts = [
    { id: 1, name: 'HDFC Savings', type: 'Bank Account', balance: 24500, number: '**** 8892', theme: 'bg-gradient-to-br from-blue-600 to-blue-800', icon: Wallet },
    { id: 2, name: 'SBI Credit Card', type: 'Credit Card', balance: -12400, number: '**** 4545', theme: 'bg-gradient-to-br from-gray-800 to-gray-900', icon: CreditCard },
    { id: 3, name: 'Paytm Wallet', type: 'Digital Wallet', balance: 850, number: '98765xxxxx', theme: 'bg-gradient-to-br from-sky-400 to-blue-500', icon: Smartphone },
    { id: 4, name: 'Cash', type: 'Cash', balance: 4200, number: '-', theme: 'bg-gradient-to-br from-green-500 to-emerald-600', icon: Wallet },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="mb-2">Accounts & Wallets</h1>
                <p>Manage all your payment sources in one place.</p>
            </div>
            <button className="flex items-center gap-2 btn-secondary bg-gray-900 text-white hover:bg-gray-800">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add New</span>
            </button>
        </div>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((acc) => (
                <div key={acc.id} className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl transition-all ${acc.theme}`}>
                    
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                        <div className="flex justify-between items-start">
                            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                                <acc.icon className="w-6 h-6 text-white" />
                            </div>
                            <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <MoreVertical className="w-5 h-5 text-white/80" />
                            </button>
                        </div>

                        <div>
                            <p className="text-white/80 text-sm font-medium tracking-wide">{acc.name}</p>
                            <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">
                                {acc.balance < 0 ? '-' : ''}₹{Math.abs(acc.balance).toLocaleString()}
                            </h3>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                             <div className="flex items-center gap-1.5 text-xs text-white/70">
                                <ShieldCheck className="w-3 h-3" />
                                <span>{acc.type}</span>
                             </div>
                             <span className="font-mono text-sm tracking-wider opacity-80">{acc.number}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add New Placeholder */}
            <button className="rounded-3xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50/50 transition-all group min-h-[180px]">
                <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-all">
                    <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium">Link New Account</span>
            </button>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Transfers</h3>
            <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100/50 hover:border-gray-200 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Transfer to Savings</p>
                                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                            </div>
                        </div>
                        <span className="font-bold text-gray-900">-₹2,000</span>
                     </div>
                 ))}
                 <div className="text-center pt-2">
                    <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">View All Activity</button>
                 </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
