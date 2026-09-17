import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const AurevyaObjectRail: React.FC = () => {
  const { navigate, openTryOnForProduct } = useShop();

  const curatedPieces = PRODUCTS.filter(p => p.featured).slice(0, 6);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProduct = curatedPieces[activeIdx];

  // Mouse tilt / sheen state for the giant focal object
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const objectRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!objectRef.current) return;
    const rect = objectRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 20, y: y * 20, isHovered: true });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, isHovered: false });
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % curatedPieces.length);
  };

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + curatedPieces.length) % curatedPieces.length);
  };

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#272522]/10 overflow-hidden bg-[#FCFAF6]">
      {/* Background Soft Mineral Shimmer */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_65%_45%,rgba(169,139,88,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Editorial Section Header (Off-Center, Left-Aligned) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#272522]/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[8.5px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
                SCENE 03 • THE OBJECT
              </span>
              <span className="w-8 h-[1px] bg-[#A98B58]/30" />
              <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#6D655B] font-mono">
                NON-CATALOGUE ARCHITECTURE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#272522] font-light">
              The Aurevya Object
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-[#6D655B] mr-2">
              0{activeIdx + 1} / 0{curatedPieces.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] transition-colors"
              aria-label="Previous piece"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] transition-colors"
              aria-label="Next piece"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            GIANT PRODUCT OBJECT RAIL (NOT A 4-CARD GRID)
            Focal Piece + Next Piece Peeking ("There Is More")
           ========================================================================= */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Metadata Column: Tiny product name, secondary price, physical bench details */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="space-y-1">
              <span className="text-[8.5px] tracking-[0.3em] uppercase text-[#A98B58] font-mono block">
                {activeProduct.collection} • OBJECT Nº {activeProduct.id.toUpperCase()}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#272522] font-light leading-tight">
                {activeProduct.title}
              </h3>
            </div>

            {/* Micro Specs List */}
            <div className="p-4 bg-[#F7F3EC] border border-[#272522]/10 space-y-2 text-xs text-[#6D655B] font-light">
              <div className="flex justify-between py-1 border-b border-[#272522]/5">
                <span className="uppercase text-[8.5px] tracking-wider text-[#272522] font-medium">PRIMARY STONE</span>
                <span className="text-[#A98B58] font-medium">{activeProduct.specs[0]?.weight || activeProduct.primaryStone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#272522]/5">
                <span className="uppercase text-[8.5px] tracking-wider text-[#272522] font-medium">METALWORK</span>
                <span>{activeProduct.metal} ({activeProduct.goldPurity})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#272522]/5">
                <span className="uppercase text-[8.5px] tracking-wider text-[#272522] font-medium">BENCH HOURS</span>
                <span>{activeProduct.craftsmanshipHours} Atelier Hours</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="uppercase text-[8.5px] tracking-wider text-[#272522] font-medium">ACQUISITION</span>
                <span className="font-serif text-sm text-[#272522] font-medium">{activeProduct.formattedPrice}</span>
              </div>
            </div>

            {/* Action Suite */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openTryOnForProduct(activeProduct)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9.5px] tracking-[0.24em] uppercase font-sans font-medium transition-all shadow-xs"
                data-cursor="tryon"
              >
                <Sparkles size={12} className="text-[#C9B38A]" />
                <span>SEE IT ON YOU</span>
              </button>

              <button
                onClick={() => navigate(`/product/${activeProduct.slug}`)}
                className="inline-flex items-center gap-1.5 px-4 py-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] text-[9.5px] tracking-[0.2em] uppercase font-sans transition-all"
              >
                <span>VIEW PIECE</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Right Rail Stage: Focal Giant Object + Peeking Next Piece */}
          <div className="lg:col-span-8 relative flex items-center gap-6 overflow-x-hidden order-1 lg:order-2">
            
            {/* Focal Giant Object Container */}
            <div
              ref={objectRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate(`/product/${activeProduct.slug}`)}
              className="relative w-full aspect-[4/5] sm:aspect-square bg-[#F7F3EC] border border-[#272522]/15 p-6 sm:p-12 flex items-center justify-center cursor-pointer group shadow-xs overflow-hidden select-none"
            >
              {/* Traveling Fine Gold Line Around Image on Hover */}
              <div className="absolute inset-0 border border-[#A98B58]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Physical Interactive Jewel (Moves with pointer) */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
                style={{
                  transform: mousePos.isHovered
                    ? `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.02)`
                    : 'translate3d(0, 0, 0) scale(1)'
                }}
              >
                <ImageWithFallback
                  src={activeProduct.images[0]}
                  alt={activeProduct.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(39,37,34,0.14)]"
                />

                {/* Moving Light Reflection Sheen */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-500 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(255, 255, 255, 0.9) 0%, transparent 60%)`
                  }}
                />
              </div>

              {/* Floating Bottom Metadata */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[8px] font-mono tracking-wider text-[#6D655B] bg-[#FCFAF6]/90 backdrop-blur-xs p-2.5 border border-[#272522]/10 pointer-events-none">
                <span className="uppercase text-[#272522] font-semibold">{activeProduct.collection}</span>
                <span>DRAG OR TAP NEXT TO EXPAND ARCHIVE</span>
              </div>
            </div>

            {/* Next Peeking Product ("There Is More") */}
            {curatedPieces[(activeIdx + 1) % curatedPieces.length] && (
              <div
                onClick={handleNext}
                className="hidden md:block w-48 sm:w-64 h-[75%] flex-shrink-0 bg-[#F7F3EC] border border-[#272522]/10 p-4 cursor-pointer opacity-60 hover:opacity-100 transition-all hover:scale-103 group"
              >
                <div className="w-full h-4/5 flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={curatedPieces[(activeIdx + 1) % curatedPieces.length].images[0]}
                    alt="Next piece preview"
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="pt-2 border-t border-[#272522]/10">
                  <span className="text-[7.5px] tracking-widest uppercase font-mono text-[#A98B58] block">NEXT CREATION</span>
                  <p className="font-serif text-xs text-[#272522] truncate font-light">
                    {curatedPieces[(activeIdx + 1) % curatedPieces.length].title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
