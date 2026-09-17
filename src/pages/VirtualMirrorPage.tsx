import React from 'react';
import { VirtualMirrorExperience } from '../components/VirtualMirrorExperience';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const VirtualMirrorPage: React.FC = () => {
  const { navigate, activeTryOnProduct } = useShop();

  return (
    <div className="bg-[#FCFAF6] text-[#272522] min-h-screen pt-24 pb-20">
      {/* Studio Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs text-[#6D655B] hover:text-[#272522] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO FLAGSHIP</span>
        </button>

        <div className="text-center">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block">
            AUREVYA DIGITAL SALON
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-[#272522] font-light">
            The Virtual Mirror Studio
          </h1>
        </div>

        <div className="w-24 hidden sm:block" />
      </div>

      {/* Main Experience Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="border border-[#272522]/15 shadow-sm bg-[#FCFAF6] overflow-hidden">
          <VirtualMirrorExperience
            initialProduct={activeTryOnProduct || PRODUCTS[0]}
            isStandalonePage={false}
          />
        </div>
      </div>
    </div>
  );
};
