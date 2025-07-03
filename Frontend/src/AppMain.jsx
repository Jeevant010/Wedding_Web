import React from 'react';
import Navbar from './components/Navbar';

export default function AppLayout({ children, currentPath }) {
  return (
    <div className="flex w-full min-h-screen">
      {/* Permanent Side Navigation */}
      <Navbar currentPath={currentPath} />

      {/* Main Content Area */}
      <div className="flex-1 bg-white min-h-screen overflow-auto ml-1 mr-1 lg:ml-28">
        <main className="px-1 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
