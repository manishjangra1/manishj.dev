'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';

const MessagesApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full flex transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      {/* Sidebar */}
      <div className={`w-1/3 border-r p-4 space-y-4 transition-colors duration-500 ${
        resolvedTheme === 'dark' ? 'border-white/10' : 'border-black/5'
      }`}>
        {[1, 2, 3].map(i => (
          <div key={i} className={`p-3 rounded-xl border transition-all ${
            resolvedTheme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-black/5 border-black/5'
          }`}>
            <div className="text-sm font-medium">Unknown Subject {i}</div>
            <div className={`text-xs mt-1 ${
              resolvedTheme === 'dark' ? 'text-gray-500' : 'text-zinc-500'
            }`}>Encrypted transmission...</div>
          </div>
        ))}
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-colors ${
          resolvedTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'
        }`}>🔒</div>
        <div>
          <h3 className="text-lg font-medium">Secure Communication</h3>
          <p className={`text-sm mt-1 ${
            resolvedTheme === 'dark' ? 'text-gray-500' : 'text-zinc-500'
          }`}>Establishing peer-to-peer connection...</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesApp;
