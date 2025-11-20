import React from 'react';
import { View } from '../types';
import { Home, BrainCircuit, Camera, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: View.HOME, label: '홈', icon: Home },
    { view: View.BRAIN_QUEST, label: '두뇌 훈련', icon: BrainCircuit },
    { view: View.HOBBY_CERT, label: '취미 인증', icon: Camera },
    { view: View.REWARD_MALL, label: '보상 몰', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-bravo-600' : 'text-gray-400'
              }`}
            >
              <Icon size={isActive ? 28 : 24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};