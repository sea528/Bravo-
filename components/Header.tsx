import React from 'react';
import { Coins } from 'lucide-react';

interface HeaderProps {
  points: number;
}

export const Header: React.FC<HeaderProps> = ({ points }) => {
  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-bravo-500 text-white p-1.5 rounded-lg">
          <span className="font-bold text-lg tracking-tight">Bravo</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">브라보 퀘스트</h1>
      </div>
      <div className="flex items-center gap-2 bg-active-500/10 px-3 py-1.5 rounded-full border border-active-500/20">
        <Coins className="text-active-500 w-5 h-5" />
        <span className="text-active-500 font-bold text-lg">{points.toLocaleString()} P</span>
      </div>
    </header>
  );
};