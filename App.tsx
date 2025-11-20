import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Home } from './components/views/Home';
import { BrainQuest } from './components/views/BrainQuest';
import { HobbyCert } from './components/views/HobbyCert';
import { RewardMall } from './components/views/RewardMall';
import { View } from './types';

const App: React.FC = () => {
  // App State
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [points, setPoints] = useState<number>(1250);
  const [stepCount, setStepCount] = useState<number>(3420);

  // Simulate real-time steps (Pedometer effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home points={points} stepCount={stepCount} onChangeView={setCurrentView} />;
      case View.BRAIN_QUEST:
        return <BrainQuest addPoints={handleAddPoints} />;
      case View.HOBBY_CERT:
        return <HobbyCert addPoints={handleAddPoints} />;
      case View.REWARD_MALL:
        return <RewardMall currentPoints={points} />;
      default:
        return <Home points={points} stepCount={stepCount} onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl border-x border-gray-200">
      <Header points={points} />
      
      <main className="min-h-screen">
        {renderView()}
      </main>

      <Navbar currentView={currentView} onChangeView={setCurrentView} />
    </div>
  );
};

export default App;