import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Animated top photo using framer-motion
function Animated({ src, alt }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="rounded-xl shadow-lg mb-[-60px] border-4 border-white rotate-[-8deg] z-30"
      style={{ width: 300, position: 'relative' }}
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
    />
  );
}

// Replace with your real images
const photoStack = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg',
];

const scenes = [
  {
    id: 1,
    label: 'Scene 1',
    title: 'Where it all began',
    content: (
      <>
        <p>
          Vishal Punjabi, a Bollywood film-maker, discovers small-format cameras and a new way to tell stories. 
          He moves from Ghana to India, landing his dream job as a creative director at Red Chillies. 
          After filming his own wedding, he falls in love with the process and chooses to create wedding films instead of ads and movies.
        </p>
        <ul className="mt-4 text-gray-700">
          <li><strong>Place of Birth:</strong> Ghana</li>
          <li><strong>D.O.B:</strong> 10th July 1980</li>
          <li><strong>Currently:</strong> Mumbai, India</li>
        </ul>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-red-600 underline">Wikipedia</a>
          <a href="#" className="text-red-600 underline">Instagram</a>
        </div>
        <div className="mt-8 text-gray-500 text-sm">
          2001 - 2009: Ghana → India → Red Chillies → First viral wedding film
        </div>
      </>
    ),
  },
  {
    id: 2,
    label: 'Scene 2',
    title: 'The Birth',
    content: (
      <>
        <p>
          At Nanavati Hospital, Mumbai, little Sufi is born, giving The Wedding Filmer new direction and purpose.
          Sufi becomes a big part of our journey. With his mark and Vishal's love, the TWF logo takes shape—a couple's delicate dance morphs into a whirling dervish, symbolizing eternal love and artistry.
        </p>
        <div className="mt-8 text-gray-500 text-sm">
          The birth of a logo.
        </div>
      </>
    ),
  },
  {
    id: 3,
    label: 'Scene 3',
    title: 'Exploring New Horizons',
    content: (
      <>
        <p>
          TWF travels to over <span className="font-bold text-red-600">200</span> cities, and the team grows bigger. The first TWF studio opens its doors in 2012, marking the start of a global wedding film legacy.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-xl font-bold uppercase">We have travelled to over</h4>
            <p className="text-5xl font-bold text-red-600">200</p>
            <p className="text-base">cities</p>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase">The team gets</h4>
            <p className="text-5xl font-bold text-red-600">Bigger</p>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase">The first TWF studio</h4>
            <p className="text-base">opens its doors in 2012</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 4,
    label: 'Scene 4',
    title: 'A Comeback to Bollywood',
    content: (
      <>
        <p>
          In 2013, Dharma Productions turns to The Wedding Filmer to create the iconic "Kabira" in YJHD, bringing TWF magic to the silver screen.
        </p>
        <blockquote className="my-6 p-4 bg-gray-100 border-l-4 border-red-600 text-gray-700 italic">
          "When the time comes for my wedding, I'd be honored if you would be the one to capture it" <br />
          <span className="block text-xs mt-2 text-gray-500">— Deepika to Vishal, on the set of YJHD</span>
        </blockquote>
        <p>
          Not just Deepika & Ranveer, countless celebrities entrust us with their weddings because of our unparalleled artistry and exceptional crew.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400">2024</div>
            <div className="font-semibold uppercase">Rakul & Jackky</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">2023</div>
            <div className="font-semibold uppercase">Sidharth & Kiara</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">2021</div>
            <div className="font-semibold uppercase">Vicky & Katrina</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">2019</div>
            <div className="font-semibold uppercase">Priyanka & Nick</div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 5,
    label: 'Scene 5',
    title: 'Empowering Future Storytellers',
    content: (
      <>
        <p>
          We can only film a limited number of weddings each year, but what if every bride could have her own fairytale? 
          We have conducted workshops in over 12 cities, creating over 500 jobs and educating thousands. 
          TWF has laid a new foundation with the goal of seeing it grow.
        </p>
        <div className="mt-6 text-center">
          <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full font-bold">
            12+ Cities & 500+ Jobs Created
          </span>
        </div>
      </>
    ),
  },
  {
    id: 6,
    label: 'Scene 6',
    title: 'Becoming Pop Culture',
    content: (
      <>
        <p>
          Revolutionizing wedding trends, our crew has become synonymous with pop culture. 
          This is the crew you want at your wedding! TWF's success is not one person's alone. 
          It has taken relentless passion, dedication, and determination from an entire crew of people to do what they love the most.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="bg-black text-white px-6 py-2 rounded-full border border-black hover:bg-red-600 hover:text-white transition">
            Return to home
          </button>
          <button className="border border-black px-6 py-2 rounded-full text-black hover:bg-black hover:text-white transition">
            About our crew
          </button>
        </div>
      </>
    ),
  },
];

export default function Photos() {
  const [activeScene, setActiveScene] = useState(1);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center pt-10">
        <div className="text-xs tracking-widest mb-8 font-serif">TWF's Story//</div>
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene.id)}
            className={`mb-4 text-lg font-light transition 
              ${activeScene === scene.id ? 'text-red-600 font-semibold flex items-center' : 'text-black'}
            `}
          >
            {activeScene === scene.id && (
              <span className="mr-2 text-red-600 text-base">&#9654;</span>
            )}
            {scene.label}
          </button>
        ))}
        <button className="mt-auto mb-8 text-xs text-black opacity-80 hover:underline">exit</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 pb-20">
        {/* Scene Title and Content */}
        <div className="w-full text-center mt-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-wide">
            <span className="text-red-600">{scenes[activeScene - 1].title}</span>
          </h2>
          <div className="text-black text-xl font-cursive mb-8 max-w-2xl mx-auto">
            {scenes[activeScene - 1].content}
          </div>
        </div>

        {/* Designer Section: Red Paper Tear (Scene 3 only for demo, you can show/hide per scene) */}
        {activeScene === 3 && (
          <div className="relative w-full flex justify-center mt-12 mb-16" style={{ minHeight: 180 }}>
            <img
              src="/images/torn-paper-top.png"
              alt=""
              className="torn-paper-top absolute top-0 left-0 w-full pointer-events-none"
              style={{ zIndex: 2 }}
            />
            <div className="bg-[#e63939] w-full py-20 flex flex-col items-center justify-center relative" style={{ zIndex: 1 }}>
              <div className="text-white text-3xl md:text-5xl font-bold italic font-cursive">
                Exploring New Horizons
              </div>
              <div className="absolute right-8 top-8">
                <img src="/images/balloon.png" alt="TWF Balloon" className="w-24" />
              </div>
            </div>
            <img
              src="/images/torn-paper-bottom.png"
              alt=""
              className="torn-paper-bottom absolute bottom-0 left-0 w-full pointer-events-none"
              style={{ zIndex: 2 }}
            />
          </div>
        )}

        {/* Photo Stack with Camera (Scene 3 only for demo, you can show/hide per scene) */}
        {activeScene === 3 && (
          <div className="relative w-full flex flex-col items-center mt-12">
            {/* Photo stack */}
            <div className="relative z-10 flex flex-col items-center mb-16">
              {/* Animated top photo */}
              <Animated
                src={photoStack[0]}
                alt="TWF Studio 1"
              />
              {/* Static photos underneath */}
              <img
                src={photoStack[1]}
                alt="TWF Studio 2"
                className="rounded-xl shadow-lg mb-[-60px] border-4 border-white rotate-[5deg] z-20"
                style={{ width: 300, position: 'relative' }}
              />
              <img
                src={photoStack[2]}
                alt="TWF Studio 3"
                className="rounded-xl shadow-lg mb-[-60px] border-4 border-white rotate-[12deg] z-10"
                style={{ width: 300, position: 'relative' }}
              />
            </div>
            {/* Camera illustration */}
            <img
              src="/images/camera.png"
              alt="Camera"
              className="w-64 z-20"
              style={{ marginTop: '-80px' }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
