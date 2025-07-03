import React from 'react';
import Navbar from './components/Navbar';

export default function AppLayout({ children, currentPath }) {
  return (
    <div className="flex w-full min-h-screen bg-black">
      {/* Permanent Side Navigation */}
      <Navbar currentPath={currentPath} />

      {/* Main Content Area */}
      <div className="flex-1 bg-white min-h-screen overflow-auto ml-80">
        <main className="px-10 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
