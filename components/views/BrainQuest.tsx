import React, { useState, useEffect } from 'react';
import { generateDailyQuiz } from '../../services/geminiService';
import { QuizQuestion } from '../../types';
import { Brain, CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';

interface BrainQuestProps {
  addPoints: (amount: number) => void;
}

export const BrainQuest: React.FC<BrainQuestProps> = ({ addPoints }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    const data = await generateDailyQuiz();
    setQuestions(data);
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer

    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setCompleted(true);
      addPoints(score * 30); // 30 points per correct answer
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center">
        <Loader2 className="w-16 h-16 text-bravo-500 animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">오늘의 두뇌 퀘스트 생성 중...</h2>
        <p className="text-gray-500">AI가 맞춤형 문제를 만들고 있습니다.</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center space-y-6">
        <div className="bg-yellow-100 p-6 rounded-full">
          <Brain className="w-20 h-20 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">퀘스트 완료!</h2>
          <p className="text-xl text-gray-600">
            총 <span className="font-bold text-bravo-600">{score} / {questions.length}</span> 문제를 맞추셨습니다.
          </p>
        </div>
        <div className="bg-bravo-50 p-6 rounded-2xl border border-bravo-100 w-full">
           <p className="text-gray-500 mb-1">획득 포인트</p>
           <p className="text-4xl font-bold text-bravo-600">+{score * 30} P</p>
        </div>
        <button onClick={() => window.location.reload()} className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-lg">
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="px-4 py-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="text-bravo-600" />
          문제 {currentQuestion + 1}
        </h2>
        <span className="text-gray-400 font-medium text-lg">{currentQuestion + 1} / {questions.length}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6 min-h-[160px] flex items-center justify-center">
        <h3 className="text-2xl font-medium text-center leading-relaxed break-keep">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let btnClass = "w-full p-5 rounded-xl border-2 text-left text-lg font-medium transition-all flex justify-between items-center ";
          
          if (selectedAnswer === null) {
            btnClass += "bg-white border-gray-200 hover:border-bravo-400 hover:bg-bravo-50 active:scale-95";
          } else if (idx === question.correctAnswerIndex) {
            btnClass += "bg-green-50 border-green-500 text-green-700";
          } else if (idx === selectedAnswer && idx !== question.correctAnswerIndex) {
            btnClass += "bg-red-50 border-red-500 text-red-700";
          } else {
            btnClass += "bg-gray-50 border-gray-100 text-gray-400";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
              className={btnClass}
            >
              <span>{idx + 1}. {option}</span>
              {selectedAnswer !== null && idx === question.correctAnswerIndex && <CheckCircle2 className="text-green-600" />}
              {selectedAnswer === idx && idx !== question.correctAnswerIndex && <XCircle className="text-red-600" />}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="mt-6 animate-fade-in-up">
          <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-bold mb-1">{isCorrect ? '정답입니다!' : '아쉽네요!'}</p>
            <p className="text-sm">{question.explanation}</p>
          </div>
          <button 
            onClick={nextQuestion}
            className="w-full py-4 bg-bravo-600 text-white rounded-xl font-bold text-xl shadow-lg flex items-center justify-center gap-2 hover:bg-bravo-700 transition"
          >
            {currentQuestion < questions.length - 1 ? '다음 문제' : '결과 보기'} <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};