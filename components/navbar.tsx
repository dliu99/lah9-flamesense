"use client"; // Needs client-side interaction for clicks

import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onToggleDemo: () => void;
  isDemoMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onToggleDemo, isDemoMode }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm flex items-center justify-between p-3 px-5 z-50 shadow-lg">
      <div
        className="text-xl md:text-2xl font-bold text-neutral-100 cursor-pointer bg-neutral-800/70 px-3 py-1 rounded-lg hover:bg-neutral-700 transition-colors"
        onClick={() => onNavigate('hero')}
      >
        <span role="img" aria-label="fire" className="inline-block mr-2">🔥</span>
        FireSpace
      </div>
      <ul className="flex items-center space-x-2 md:space-x-4">
        <li>
          <Button variant="ghost" size="sm" className="text-neutral-200 hover:bg-neutral-700 hover:text-white" onClick={() => onNavigate('hero')}>
            About
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="sm" className="text-neutral-200 hover:bg-neutral-700 hover:text-white" onClick={() => onNavigate('how')}>
            How It Works
          </Button>
        </li>
        <li>
          {/* Use Shadcn Button - style it orange-like */}
          <Button
            size="sm"
            className="bg-orange-600 text-white hover:bg-orange-700"
            onClick={onToggleDemo}
          >
            {isDemoMode ? 'Close Demo' : 'Demo'}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;