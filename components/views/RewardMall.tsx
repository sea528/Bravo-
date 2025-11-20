import React from 'react';
import { Product } from '../../types';
import { ShoppingCart } from 'lucide-react';

interface RewardMallProps {
  currentPoints: number;
}

export const RewardMall: React.FC<RewardMallProps> = ({ currentPoints }) => {
  const products: Product[] = [
    { id: 1, name: '스타벅스 아메리카노', price: 4500, category: '카페', imageUrl: 'https://picsum.photos/seed/coffee/200/200' },
    { id: 2, name: '안마의자 1개월 렌탈권', price: 50000, category: '건강', imageUrl: 'https://picsum.photos/seed/chair/200/200' },
    { id: 3, name: '프리미엄 골프장 할인권', price: 30000, category: '취미', imageUrl: 'https://picsum.photos/seed/golfcourse/200/200' },
    { id: 4, name: '종합 비타민 세트', price: 25000, category: '건강', imageUrl: 'https://picsum.photos/seed/vitamin/200/200' },
    { id: 5, name: '등산용품 1만원 상품권', price: 10000, category: '취미', imageUrl: 'https://picsum.photos/seed/hiking/200/200' },
    { id: 6, name: '편의점 5천원권', price: 5000, category: '생활', imageUrl: 'https://picsum.photos/seed/store/200/200' },
  ];

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">보상 몰</h2>
        <p className="text-gray-500">열심히 모은 포인트로 건강을 선물하세요.</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        {['전체', '건강', '취미', '카페/푸드', '생활'].map((cat, i) => (
          <button 
            key={i} 
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold ${
              i === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => {
          const canBuy = currentPoints >= product.price;
          return (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
              <div className="relative aspect-square">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 h-12">
                  {product.name}
                </h3>
                <div className="mt-auto">
                  <p className="text-orange-500 font-extrabold text-lg mb-2">{product.price.toLocaleString()} P</p>
                  <button 
                    disabled={!canBuy}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                      canBuy 
                        ? 'bg-bravo-600 text-white hover:bg-bravo-700' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {canBuy ? '구매하기' : '포인트 부족'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};