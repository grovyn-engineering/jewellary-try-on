import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const HeroAlive: React.FC = () => {
  const { navigate, openTryOnForProduct, setAtmosphereGemstone } = useShop();

  const heroCampaigns = [
    {
      id: '01',
      editionCode: 'AUREVYA / 01',
      product: PRODUCTS.find(p => p.slug === 'noor') || PRODUCTS[0],
      colorBlock: '#073B32', // Emerald
      colorName: 'Muzo Emerald',
      gemstone: 'Emerald' as const,
      stoneHighlight: '14.82 CT Muzo Emerald'
    },
    {
      id: '02',
      editionCode: 'AUREVYA / 02',
      product: PRODUCTS.find(p => p.slug === 'maharani') || PRODUCTS[1],
      colorBlock: '#8C1732', // Ruby / Crimson
      colorName: 'Basra Jadau',
      gemstone: 'Polki' as const,
      stoneHighlight: 'Basra Pearls & 22K Jadau'
    },
    {
      id: '03',
      editionCode: 'AUREVYA / 03',
      product: PRODUCTS.find(p => p.slug === 'golconda-bloom-pendant') || PRODUCTS[4] || PRODUCTS[0],
      colorBlock: '#163B70', // Sapphire
      colorName: 'Cold Fire Diamond',
      gemstone: 'Diamond' as const,
      stoneHighlight: 'Type IIa Golconda Water'
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const current = heroCampaigns[activeIdx];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({
      x: nx * 18,
      y: ny * 18
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    setAtmosphereGemstone(current.gemstone);
  }, [activeIdx]);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#F8F5EE] text-[#171717] overflow-hidden select-none flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 lg:px-16"
    >
      {/* Editorial Color Field Behind Jewel */}
      <div
        className="absolute top-0 right-0 w-[55vw] lg:w-[48vw] h-full transition-all duration-1000 ease-out pointer-events-none hidden md:block"
        style={{
          backgroundColor: current.colorBlock,
          clipPath: 'polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 0.96
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Top Subtle Brand Marks */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between text-[#5F5A52] text-[10px] tracking-[0.28em] uppercase font-sans">
        <div className="flex items-center gap-3">
          <span className="font-medium text-[#171717]">{current.editionCode}</span>
          <span className="w-8 h-[1px] bg-[#171717]/20" />
          <span>{current.stoneHighlight}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#5F5A52]">
          <span>HAUTE JOAILLERIE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#A98B58]" />
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Main Campaign Stage: Massive Typography Overlapping Massive Cropped Jewel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Monumental Headline, Copy, and One Strong CTA */}
          <div
            className="lg:col-span-6 space-y-8 z-30 transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px, 0)`
            }}
          >
            {/* Monumental Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-[#171717] font-light leading-[0.88] tracking-tight">
                WEAR
              </h1>
              <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-[#171717] font-light leading-[0.88] tracking-tight">
                THE
              </h2>
              <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-[#073B32] font-light italic leading-[0.88] tracking-tight">
                MEMORY.
              </h2>
            </div>

            {/* Human Editorial Supporting Line */}
            <p className="font-sans text-base sm:text-lg text-[#5F5A52] font-light max-w-md leading-relaxed">
              Haute jewellery, composed for the moments that stay.
            </p>

            {/* Primary CTA + Secondary Try-On Action */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/collections')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#171717] hover:bg-[#272522] text-[#F8F5EE] text-[10px] tracking-[0.28em] uppercase font-sans font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <span>SEE THE COLLECTION</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openTryOnForProduct(current.product)}
                className="inline-flex items-center gap-2.5 px-6 py-4 border border-[#171717]/30 hover:border-[#171717] bg-[#F8F5EE]/80 backdrop-blur-xs text-[#171717] text-[10px] tracking-[0.24em] uppercase font-sans font-medium transition-all duration-300"
              >
                <Sparkles size={13} className="text-[#A98B58] animate-pulse" />
                <span>SEE IT ON YOU</span>
              </button>
            </div>
          </div>

          {/* Center/Right: Massive Cropped Jewellery Image Overlapping */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[380px] sm:min-h-[500px] lg:min-h-[640px]">
            <div
              onClick={() => navigate(`/product/${current.product.slug}`)}
              className="relative w-[115%] sm:w-[105%] max-w-[650px] lg:max-w-[720px] aspect-square flex items-center justify-center cursor-pointer group"
              style={{
                transform: `translate3d(${mousePos.x * 0.75}px, ${mousePos.y * 0.75}px, 0)`
              }}
            >
              {/* Soft ambient jewel halo */}
              <div
                className="absolute inset-6 rounded-full opacity-40 filter blur-3xl pointer-events-none transition-colors duration-1000"
                style={{
                  background: current.gemstone === 'Emerald'
                    ? 'radial-gradient(circle, rgba(7,59,50,0.5) 0%, transparent 70%)'
                    : current.gemstone === 'Polki'
                    ? 'radial-gradient(circle, rgba(140,23,50,0.4) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(22,59,112,0.4) 0%, transparent 70%)'
                }}
              />

              {/* Massive Jewelled Campaign Object - Intentionally Cropped at Edge */}
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-104">
                <ImageWithFallback
                  src={current.product.images[0]}
                  alt={current.product.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all duration-700"
                />
              </div>

              {/* Subtle Haute Tag */}
              <div className="absolute -bottom-2 left-4 sm:left-auto sm:right-6 bg-[#FCFAF6] border border-[#171717]/12 px-4 py-3 shadow-md backdrop-blur-md">
                <span className="text-[8px] tracking-[0.28em] uppercase text-[#A98B58] block font-sans font-medium">
                  {current.product.collection}
                </span>
                <p className="font-serif text-base text-[#171717] font-light leading-snug">
                  {current.product.title}
                </p>
                <p className="text-[10px] text-[#5F5A52] font-sans mt-0.5">
                  {current.product.formattedPrice}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Campaign Controls: Refined Human Selector */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-[#171717]/10 text-[#5F5A52] text-[10px] tracking-[0.25em] font-sans">
        <div className="flex items-center gap-3">
          <span className="uppercase text-[9px] text-[#5F5A52] font-medium">CAMPAIGN:</span>
          {heroCampaigns.map((camp, idx) => (
            <button
              key={camp.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-3 py-1 border text-[9px] tracking-wider uppercase transition-all ${
                activeIdx === idx
                  ? 'border-[#171717] bg-[#171717] text-[#F8F5EE] font-medium'
                  : 'border-[#171717]/15 bg-[#FCFAF6] text-[#5F5A52] hover:border-[#171717]'
              }`}
            >
              0{idx + 1} {camp.colorName}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 text-[9px] text-[#5F5A52]">
          <span>MUSEUM ARCHIVE</span>
          <span className="w-1 h-1 rounded-full bg-[#171717]/30" />
          <span>PRIVATE ATELIER COMMISSIONS</span>
        </div>
      </div>
    </section>
  );
};
