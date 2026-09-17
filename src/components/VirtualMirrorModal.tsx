import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { VirtualMirrorExperience } from './VirtualMirrorExperience';

export const VirtualMirrorModal: React.FC = () => {
  const { isTryOnOpen, setIsTryOnOpen, activeTryOnProduct } = useShop();

  useEffect(() => {
    if (isTryOnOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTryOnOpen]);

  if (!isTryOnOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-7xl max-h-[96vh] bg-[#FCFAF6] border border-[#272522]/20 shadow-2xl overflow-y-auto my-auto">
        <VirtualMirrorExperience
          initialProduct={activeTryOnProduct || PRODUCTS[0]}
          onClose={() => setIsTryOnOpen(false)}
          isStandalonePage={false}
        />
      </div>
    </div>
  );
};
