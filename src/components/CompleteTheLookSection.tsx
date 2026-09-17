import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, Plus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CompleteTheLookSectionProps {
  currentProduct: Product;
}

export const CompleteTheLookSection: React.FC = () => {
  const { activeTryOnProduct, openTryOnForProduct, addToCart, showToast } = useShop();

  // Find complementary pieces (earrings, bangles/cuff, ring)
  const complementaryEarring = PRODUCTS.find(p => p.category === 'earrings' && p.primaryStone === activeTryOnProduct.primaryStone) || PRODUCTS.find(p => p.category === 'earrings')!;
  const complementaryBangle = PRODUCTS.find(p => p.category === 'bangles') || PRODUCTS[3];
  const complementaryRing = PRODUCTS.find(p => p.category === 'rings' && (p.primaryStone === activeTryOnProduct.primaryStone || p.primaryStone === 'Diamond')) || PRODUCTS[4];

  const defaultItems = [activeTryOnProduct, complementaryEarring, complementaryBangle, complementaryRing];

  const [selectedPieceIds, setSelectedPieceIds] = useState<string[]>([
    activeTryOnProduct.id,
    complementaryEarring.id,
    complementaryRing.id
  ]);

  const togglePiece = (id: string) => {
    if (id === activeTryOnProduct.id) return; // Keep anchor piece
    setSelectedPieceIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedPieces = defaultItems.filter(p => selectedPieceIds.includes(p.id));
  const combinedTotal = selectedPieces.reduce((sum, p) => sum + p.price, 0);

  const formattedCombinedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(combinedTotal);

  return (
    <section className="py-20 px-6 md:px-12 bg-[#FCFAF6] border-t border-[#272522]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#272522]/10 gap-4">
          <div>
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
              CURATED HIGH JEWELLERY PARURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light">
              Complete the Look
            </h2>
            <p className="text-xs text-[#6D655B] font-light mt-1">
              Harmonized architectural balance across necklace, chandelier drops, sculpted bangle, and solitary ring.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-[#6D655B] block font-sans">
              ENSEMBLE VALUATION ({selectedPieces.length} PIECES)
            </span>
            <span className="font-serif text-2xl text-[#272522] font-medium">
              {formattedCombinedTotal}
            </span>
          </div>
        </div>

        {/* Visual Styling Composition (Not a generic grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {defaultItems.map((piece, idx) => {
            const isSelected = selectedPieceIds.includes(piece.id);
            const roleLabels = ['ANCHOR COLLAR', 'CHANDELIER DROPS', 'SCULPTED CUFF', 'SOLITAIRE RING'];

            return (
              <div
                key={piece.id}
                className={`relative border p-4 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#A98B58] bg-[#F7F3EC] shadow-sm'
                    : 'border-[#272522]/10 bg-[#FCFAF6] opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium">
                      {roleLabels[idx]}
                    </span>
                    <button
                      onClick={() => togglePiece(piece.id)}
                      disabled={piece.id === activeTryOnProduct.id}
                      className={`text-[8px] tracking-wider uppercase font-sans px-2 py-0.5 border transition-all ${
                        isSelected
                          ? 'bg-[#272522] text-[#FCFAF6] border-[#272522]'
                          : 'bg-[#FCFAF6] text-[#6D655B] border-[#272522]/20 hover:border-[#272522]'
                      }`}
                    >
                      {piece.id === activeTryOnProduct.id ? 'ANCHOR' : isSelected ? 'INCLUDED' : 'ADD TO LOOK'}
                    </button>
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-[#EEE8DE] mb-3">
                    <ImageWithFallback
                      src={piece.images[0]}
                      alt={piece.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-serif text-base text-[#272522] font-normal truncate">
                    {piece.title}
                  </h3>
                  <p className="font-serif text-xs text-[#272522] font-medium mt-0.5">
                    {piece.formattedPrice}
                  </p>
                  <p className="text-[10px] text-[#6D655B] font-light mt-1 line-clamp-1">
                    {piece.specs[0]?.weight} • {piece.metal}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#272522]/10 flex items-center justify-between text-[8px] text-[#6D655B] font-sans">
                  <span>{piece.craftsmanshipHours}h hand fabrication</span>
                  <span className="text-[#A98B58]">{piece.primaryStone}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls for Complete Look */}
        <div className="p-6 bg-[#F7F3EC] border border-[#272522]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FCFAF6] border border-[#A98B58] flex items-center justify-center text-[#A98B58] flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#272522]">
                Test the Entire Parure on Your Silhouette
              </h4>
              <p className="text-xs text-[#6D655B] font-light">
                Our Virtual Mirror calibrates the complete set simultaneously to preview anatomical harmony.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={() => openTryOnForProduct(activeTryOnProduct)}
              className="flex-1 md:flex-none px-7 py-3.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-[0.25em] uppercase font-sans font-medium flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Sparkles size={12} className="text-[#C9B38A]" />
              <span>SEE THE COMPLETE LOOK ON YOU</span>
            </button>

            <button
              onClick={() => {
                selectedPieces.forEach(p => addToCart(p, 1));
                showToast(`Complete ${selectedPieces.length}-piece Parure added to Salon Bag`);
              }}
              className="flex-1 md:flex-none px-6 py-3.5 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] text-[9px] tracking-[0.2em] uppercase font-sans font-medium transition-all"
            >
              ACQUIRE ENSEMBLE ({formattedCombinedTotal})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
