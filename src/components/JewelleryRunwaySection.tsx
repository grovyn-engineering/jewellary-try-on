import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const JewelleryRunwaySection: React.FC = () => {
  const { navigate, openTryOnForProduct, setAtmosphereGemstone } = useShop();

  const runwayItems = [
    {
      num: '01',
      product: PRODUCTS.find(p => p.slug === 'noor') || PRODUCTS[0],
      bg: '#F8F5EE',
      accent: '#0D6B58',
      numColor: '#E7E2D6',
      title: 'THE NOOR-E-NIZAM',
      category: 'HIGH JEWELLERY COLLIER',
      tagline: '14.82 ct Muzo Emeralds bound in 18K gold bezels.',
      stone: 'Emerald' as const
    },
    {
      num: '02',
      product: PRODUCTS.find(p => p.slug === 'maharani') || PRODUCTS[1],
      bg: '#F5F0E8',
      accent: '#8C1732',
      numColor: '#EAE1D2',
      title: 'THE MAHARANI GALA',
      category: 'NATURAL BASRA CHOKER',
      tagline: 'Triple graduated tiers of Persian Gulf natural pearls.',
      stone: 'Polki' as const
    },
    {
      num: '03',
      product: PRODUCTS.find(p => p.slug === 'royal-emerald') || PRODUCTS[2],
      bg: '#EEF2F6',
      accent: '#163B70',
      numColor: '#DCE4ED',
      title: 'THE HEIRLOOM DROPS',
      category: 'KAGEM STEP-CUT CHANDELIER',
      tagline: 'High-fire marquise cut diamonds framing octagonal emeralds.',
      stone: 'Emerald' as const
    },
    {
      num: '04',
      product: PRODUCTS.find(p => p.slug === 'golconda-bloom-pendant') || PRODUCTS[4] || PRODUCTS[0],
      bg: '#F9F8F6',
      accent: '#5F5A52',
      numColor: '#E8E5DF',
      title: 'GOLCONDA BLOOM',
      category: 'SOLITAIRE PENDANT',
      tagline: 'Type IIa nitrogen-free alluvial crystalline diamond.',
      stone: 'Diamond' as const
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const current = runwayItems[activeStep];

  const handleNext = () => {
    const next = (activeStep + 1) % runwayItems.length;
    setActiveStep(next);
    setAtmosphereGemstone(runwayItems[next].stone);
  };

  const handlePrev = () => {
    const prev = (activeStep - 1 + runwayItems.length) % runwayItems.length;
    setActiveStep(prev);
    setAtmosphereGemstone(runwayItems[prev].stone);
  };

  return (
    <section
      className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden flex flex-col justify-between py-20 sm:py-28 px-6 md:px-12 lg:px-20 transition-colors duration-1000 select-none"
      style={{ backgroundColor: current.bg }}
    >
      {/* =========================================================================
          GIANT FAINT RUNWAY NUMBER OCCUPYING 25-30% OF THE VIEWPORT
         ========================================================================= */}
      <div
        className="absolute -top-10 -left-6 sm:left-12 font-display text-[26vw] font-normal leading-none pointer-events-none select-none transition-all duration-700 opacity-60"
        style={{ color: current.numColor }}
      >
        {current.num}
      </div>

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between border-b border-[#171717]/12 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase font-bold" style={{ color: current.accent }}>
            SCENE 05 • RUNWAY HORIZON
          </span>
          <span className="w-8 h-[1px] bg-[#171717]/20" />
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#5F5A52]">
            CONTINUOUS ARCHITECTURAL PARADE
          </span>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span className="font-bold text-[#171717]">{current.num}</span>
            <span className="text-[#5F5A52]">/</span>
            <span className="text-[#5F5A52]">0{runwayItems.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 border border-[#171717]/20 bg-white hover:bg-[#171717] hover:text-white transition-colors"
              aria-label="Previous jewel"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-[#171717]/20 bg-white hover:bg-[#171717] hover:text-white transition-colors"
              aria-label="Next jewel"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Center Stage: Giant Runway Object + Asymmetric Typography */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        
        {/* Left Column: Descriptive Runway Dossier */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <span
              className="text-[9.5px] font-mono tracking-[0.35em] uppercase font-bold block"
              style={{ color: current.accent }}
            >
              RUNWAY SILHOUETTE • {current.category}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-[#171717] font-normal leading-[0.9] tracking-tight">
              {current.title}
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#5F5A52] font-light max-w-md leading-relaxed">
            {current.tagline} {current.product.description}
          </p>

          {/* Technical Spec Box */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#171717]/10 p-5 space-y-2 font-mono text-[9px] max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-[#5F5A52]">CERTIFICATION</span>
              <span className="text-[#171717] font-semibold">{current.product.certification}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5F5A52]">CRAFTSMANSHIP HOURS</span>
              <span className="text-[#171717] font-semibold">{current.product.craftsmanshipHours} HOURS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5F5A52]">TOTAL WEIGHT</span>
              <span className="text-[#171717] font-semibold">{current.product.totalWeight}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => openTryOnForProduct(current.product)}
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#171717] hover:bg-[#073B32] text-white text-[10px] tracking-[0.24em] uppercase font-sans font-semibold transition-all shadow-lg"
            >
              <Sparkles size={13} className="text-[#C6A56B]" />
              <span>DRAPE ON YOURSELF</span>
            </button>

            <button
              onClick={() => navigate(`/product/${current.product.slug}`)}
              className="inline-flex items-center gap-2 px-5 py-4 border border-[#171717] hover:bg-white text-[#171717] text-[10px] tracking-[0.2em] uppercase font-sans font-semibold transition-all"
            >
              <span>DOSSIER</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Right Column: Giant Runway Jewel Object (Hover & Parallax) */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          {/* Monumental Runway Object Stage */}
          <div
            onClick={() => navigate(`/product/${current.product.slug}`)}
            className="relative w-full max-w-[620px] aspect-square flex items-center justify-center cursor-pointer group"
          >
            {/* Ambient Radial Color Wash */}
            <div
              className="absolute inset-8 rounded-full filter blur-3xl opacity-50 transition-colors duration-1000"
              style={{
                background: `radial-gradient(circle, ${current.accent}40 0%, transparent 70%)`
              }}
            />

            {/* Jewel Asset */}
            <div className="relative w-full h-full flex items-center justify-center group-hover:scale-106 transition-transform duration-700 ease-out">
              <ImageWithFallback
                src={current.product.images[0]}
                alt={current.title}
                className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
              />
            </div>

            {/* Floating Price Pill */}
            <div className="absolute bottom-6 right-6 bg-white border border-[#171717]/15 px-4 py-2 text-xs font-mono font-semibold shadow-md text-[#171717]">
              {current.product.formattedPrice}
            </div>
          </div>
        </div>
      </div>

      {/* Runway Timeline Scrubber */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-[#171717]/12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          {runwayItems.map((item, idx) => (
            <button
              key={item.num}
              onClick={() => {
                setActiveStep(idx);
                setAtmosphereGemstone(item.stone);
              }}
              className="flex-1 py-2 flex flex-col gap-1 text-left group"
            >
              <div
                className={`h-[2px] w-full transition-all duration-500 ${
                  activeStep === idx ? 'bg-[#171717]' : 'bg-[#171717]/20 group-hover:bg-[#171717]/50'
                }`}
              />
              <span className="text-[8.5px] font-mono tracking-wider text-[#5F5A52] group-hover:text-[#171717]">
                {item.num} • {item.title.split(' ')[1] || item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
