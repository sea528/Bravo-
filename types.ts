export enum View {
  HOME = 'HOME',
  BRAIN_QUEST = 'BRAIN_QUEST',
  HOBBY_CERT = 'HOBBY_CERT',
  REWARD_MALL = 'REWARD_MALL',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface HobbyPost {
  id: number;
  user: string;
  type: '등산' | '파크골프' | '반려식물' | '기타';
  imageUrl: string;
  likes: number;
  description: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number; // In points
  category: string;
  imageUrl: string;
}
