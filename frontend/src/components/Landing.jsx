import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';

const TypewriterText = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const AIProductLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-8 relative overflow-hidden">
      {/* Background dots/stars effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 1}s infinite`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto relative">
        {/* Navigation arrows */}
        <div className="absolute right-0 -top-4 flex gap-2">
          <button className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hero section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            Build an AI product{' '}
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
              <TypewriterText text="faster than ever." />
            </div>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Design and develop your AI product in the era of spatial computing.
          </p>
          <button className="bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
            Get started
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat card */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-400 rounded-full" />
              <div className="space-y-2">
                <div className="w-32 h-2 bg-gray-700 rounded" />
                <div className="w-24 h-2 bg-gray-700 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-2">
              <span className="text-gray-400">Ask AI anything</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Code card */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="font-mono text-sm text-purple-300">
              <div>const predictWeather =</div>
              <div>(temperature) = {'{'}</div>
              <div className="ml-4">return temperature = 30 ? "Hot"</div>
              <div className="ml-4">: "Cold";</div>
              <div>{'}'}</div>
              <div className="text-gray-400">
                console.log(predictWeather(35));
              </div>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-400 rounded-full" />
                <div className="w-full h-2 bg-gray-700 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-400 rounded-full" />
                <div className="w-full h-2 bg-gray-700 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-400 rounded-full" />
                <div className="w-full h-2 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for twinkling stars */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIProductLanding;