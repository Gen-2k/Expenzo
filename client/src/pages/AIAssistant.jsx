import React from 'react';
import Layout from '../components/Layout';
import { Sparkles, Bot, LineChart, BrainCircuit, MessageSquare, Zap } from 'lucide-react';

const AIAssistant = () => {
  return (
    <Layout>
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl bg-gray-900 text-white">
         
         {/* Background Effects */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
         </div>

         <div className="relative z-10 max-w-2xl mx-auto space-y-8 p-8">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/20 mb-4 animate-bounce-slow">
               <Bot className="w-12 h-12 text-blue-300" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
               Expenzo AI
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
               Your personal financial genius is almost here. AI-driven insights, smart budgeting, and chat-based analysis.
            </p>

            {/* Feature Teasers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <BrainCircuit className="w-6 h-6 text-purple-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">Smart Insights</h3>
                  <p className="text-xs text-gray-400">Detect spending patterns automatically.</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <MessageSquare className="w-6 h-6 text-blue-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">Chat Analysis</h3>
                  <p className="text-xs text-gray-400">Ask "How much did I spend on food?"</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Zap className="w-6 h-6 text-yellow-400 mb-3" />
                  <h3 className="font-bold text-white mb-1">Auto Budget</h3>
                  <p className="text-xs text-gray-400">AI suggested limits based on income.</p>
               </div>
            </div>

            <div className="pt-8">
               <button className="px-8 py-3 rounded-full bg-white text-gray-900 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center gap-2 mx-auto">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Join Waitlist
               </button>
            </div>
         </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
