import React from 'react';
import { Activity, ArrowRight, Brain, Award } from 'lucide-react';
import { View } from '../../types';

interface HomeProps {
  points: number;
  stepCount: number;
  onChangeView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ points, stepCount, onChangeView }) => {
  const stepGoal = 6000;
  const progress = Math.min((stepCount / stepGoal) * 100, 100);

  return (
    <div className="space-y-6 pb-24">
      {/* Greeting Section */}
      <section className="bg-gradient-to-r from-bravo-500 to-bravo-700 text-white p-6 rounded-2xl shadow-lg mx-4 mt-4">
        <p className="opacity-90 text-lg mb-1">오늘도 활기차게!</p>
        <h2 className="text-3xl font-bold mb-4">김철수님, 안녕하세요.</h2>
        <p className="text-sm opacity-80 bg-black/20 inline-block px-3 py-1 rounded-full">
          "당신의 오늘을 기록하면, 더 젊은 내일이 됩니다."
        </p>
      </section>

      {/* Main Activity: Walking + Brain */}
      <section className="px-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Activity size={100} />
          </div>
          
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-gray-500 font-medium">오늘의 걸음</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{stepCount.toLocaleString()}</span>
                <span className="text-gray-500">/ {stepGoal.toLocaleString()} 보</span>
              </div>
            </div>
            <div className="bg-bravo-100 text-bravo-700 px-3 py-1 rounded-lg text-sm font-bold">
              +50 P 획득 가능
            </div>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-4 mb-4">
            <div 
              className="bg-bravo-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 border border-blue-100">
             <Brain className="text-blue-500 w-8 h-8 shrink-0" />
             <div className="flex-1">
                <h4 className="font-bold text-gray-900">두뇌 퀴즈 보너스</h4>
                <p className="text-sm text-gray-600">퀴즈 풀고 걸음 포인트 2배 받기</p>
             </div>
             <button 
               onClick={() => onChangeView(View.BRAIN_QUEST)}
               className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm shrink-0 hover:bg-blue-600 transition"
             >
               GO
             </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4 px-4">
        <button 
          onClick={() => onChangeView(View.HOBBY_CERT)}
          className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex flex-col items-center text-center space-y-2 hover:bg-orange-100 transition"
        >
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <Award size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">취미 인증하기</h3>
            <p className="text-xs text-gray-500">사진 올리고 포인트 받기</p>
          </div>
        </button>

        <button 
           onClick={() => onChangeView(View.REWARD_MALL)}
           className="bg-purple-50 p-5 rounded-2xl border border-purple-100 flex flex-col items-center text-center space-y-2 hover:bg-purple-100 transition"
        >
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <Activity size={28} />
          </div>
          <div>
             <h3 className="font-bold text-gray-900">건강 리포트</h3>
             <p className="text-xs text-gray-500">나의 활동 분석 보기</p>
          </div>
        </button>
      </section>
    </div>
  );
};