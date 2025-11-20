import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { verifyHobbyImage } from '../../services/geminiService';
import { HobbyPost } from '../../types';

interface HobbyCertProps {
  addPoints: (amount: number) => void;
}

export const HobbyCert: React.FC<HobbyCertProps> = ({ addPoints }) => {
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState<HobbyPost[]>([
    {
      id: 1,
      user: '산토끼',
      type: '등산',
      imageUrl: 'https://picsum.photos/seed/hike/400/300',
      likes: 24,
      description: '오늘 아침 관악산 정상입니다. 공기가 상쾌하네요!',
      verified: true,
    },
    {
      id: 2,
      user: '나이스샷',
      type: '파크골프',
      imageUrl: 'https://picsum.photos/seed/golf/400/300',
      likes: 15,
      description: '친구들과 오랜만에 파크골프 한 게임!',
      verified: true,
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1]; // Remove header

      // Simulate analyzing specific hobby (defaulting to general outdoor/hobby for this demo)
      const result = await verifyHobbyImage(base64Data, "등산, 골프, 또는 식물 키우기");

      if (result.verified) {
        const newPost: HobbyPost = {
          id: Date.now(),
          user: '나(사용자)',
          type: '기타',
          imageUrl: base64String,
          likes: 0,
          description: result.message,
          verified: true
        };
        setPosts([newPost, ...posts]);
        addPoints(100); // Reward points
        alert(`인증 성공! 100 포인트가 적립되었습니다.\nAI 코멘트: ${result.message}`);
      } else {
        alert("사진에서 취미 활동을 확인할 수 없습니다. 다시 시도해주세요.");
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pb-24">
      {/* Upload Section */}
      <section className="p-4 bg-white shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">오늘의 취미 인증하기</h2>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-bravo-300 bg-bravo-50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer active:bg-bravo-100 transition"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload}
          />
          {uploading ? (
            <div className="flex flex-col items-center animate-pulse">
              <Camera className="w-12 h-12 text-bravo-500 mb-2" />
              <p className="text-bravo-700 font-bold">AI가 사진을 분석 중입니다...</p>
            </div>
          ) : (
            <>
              <Camera className="w-12 h-12 text-bravo-500 mb-2" />
              <p className="text-lg font-bold text-gray-700">사진 촬영 / 앨범 선택</p>
              <p className="text-sm text-gray-500 mt-1">등산, 파크골프, 반려식물 등</p>
            </>
          )}
        </div>
      </section>

      {/* Community Feed */}
      <section className="px-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">우리 동네 챌린지</h3>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {post.user[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{post.user}</p>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {post.type}
                  </span>
                </div>
                {post.verified && (
                  <div className="ml-auto flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                    <CheckCircleIcon /> 인증됨
                  </div>
                )}
              </div>
              
              <div className="relative aspect-video bg-gray-100">
                <img src={post.imageUrl} alt="Hobby" className="w-full h-full object-cover" />
              </div>

              <div className="p-4">
                <p className="text-gray-800 mb-3 leading-relaxed">{post.description}</p>
                <div className="flex items-center gap-4 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition">
                    <Heart size={20} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition">
                    <MessageCircle size={20} />
                    <span className="text-sm">댓글 달기</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);