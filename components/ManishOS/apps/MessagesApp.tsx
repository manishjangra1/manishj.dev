'use client';

import React from 'react';

const MessagesApp: React.FC = () => {
  return (
    <div className="h-full bg-zinc-900/50 flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-white/10 p-4 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm font-medium">Unknown Subject {i}</div>
            <div className="text-xs text-gray-500 mt-1">Encrypted transmission...</div>
          </div>
        ))}
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">🔒</div>
        <div>
          <h3 className="text-lg font-medium">Secure Communication</h3>
          <p className="text-sm text-gray-500 mt-1">Establishing peer-to-peer connection...</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesApp;
