/* AboutUsPage.jsx - Wedding Filmer Style */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Photos from '../assets/Photos';
import Animated from '../assets/Animated';

export default function AboutUsPage({
  companyName = 'The Wedding Filmer',
  tagline = 'based on a true story',
  founders = [],
  scenes = [],
  celebrities = [],
  originals = [],
  achievements = [],
  onContact = () => {},
}) {
  const [activeScene, setActiveScene] = useState(1);

  // Scene navigation data
  const sceneNavigation = [
    { id: 1, label: 'Scene 1' },
    { id: 2, label: 'Scene 2' },
    { id: 3, label: 'Scene 3' },
    { id: 4, label: 'Scene 4' },
    { id: 5, label: 'Scene 5' },
    { id: 6, label: 'Scene 6' },
  ];

  return (
    <main className="bg-black text-white min-h-screen font-sans">
      {/* Scene Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-sm font-light tracking-widest">TWF's Story//</div>
          <div className="flex items-center space-x-8">
            {sceneNavigation.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene.id)}
                className={`text-sm transition-colors duration-200 ${
                  activeScene === scene.id 
                    ? 'text-white font-medium' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {scene.label}
              </button>
            ))}
            <button className="text-gray-400 hover:text-white text-sm">exit</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider">
            {companyName}
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest opacity-80 uppercase">
            {tagline}
          </p>
        </motion.div>
      </section>
      <section>
        <Photos />
      </section>
    </main>
  );
}
