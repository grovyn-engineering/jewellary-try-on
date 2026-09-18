import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, Camera, Upload, Eye } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import ladyImg from '../images/lady.png';
import ladyNeckImg from '../images/ladyneck.png';

export const AiTryOnLandingSection: React.FC = () => {
  const { openTryOnForProduct, navigate } = useShop();

  const featuredJewel = PRODUCTS.find(p => p.slug === 'noor') || PRODUCTS[0];
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [activeJewelSlug, setActiveJewelSlug] = useState('noor');

  const selectedProduct = PRODUCTS.find(p => p.slug === activeJewelSlug) || featuredJewel;

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#F1EEE7] text-[#171717] overflow-hidden flex flex-col justify-between py-24 sm:py-32 px-6 md:px-12 lg:px-20 select-none">

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Behind-portrait large champagne / emerald translucent luxury geometric shape */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[85vh] bg-[#C6A56B]/15 rounded-l-[120px] pointer-events-none filter blur-2xl" />
      <div className="absolute right-12 top-1/4 w-[35vw] h-[60vh] bg-[#0D6B58]/10 rounded-l-[90px] pointer-events-none filter blur-3xl" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between border-b border-[#171717]/12 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-[#0D6B58] font-semibold">
            THE AUREVYA MIRROR
          </span>
          <span className="w-8 h-[1px] bg-[#171717]/20" />
          <span className="text-[9px] font-sans tracking-[0.2em] text-[#5F5A52] uppercase">
            A private digital styling experience
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[9px] font-sans tracking-wider text-[#0D6B58] uppercase font-medium">
          <Sparkles size={11} className="animate-spin-slow" />
          <span>REAL-TIME ANATOMICAL DRAPE</span>
        </div>
      </div>

      {/* Center Stage: Huge Overlapping Typography + Large Campaign Portrait with Layered Jewel */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-1 my-auto">

        {/* Left Column: Monumental "SEE IT ON YOU" Typography & Action Suite */}
        <div className="lg:col-span-6 space-y-8 z-20">

          <div className="space-y-0.5">
            <span className="text-[9.5px] font-mono tracking-[0.35em] uppercase text-[#0D6B58] font-bold block mb-2">
              REAL-TIME ANATOMICAL DRAPE
            </span>
            <h2 className="font-display text-7xl sm:text-8xl md:text-9xl xl:text-[140px] text-[#171717] font-normal leading-[0.82] tracking-tighter">
              SEE <br />
              <span className="italic text-[#0D6B58]">IT ON</span> <br />
              <span className="font-sans font-bold uppercase text-6xl sm:text-7xl md:text-8xl xl:text-[110px] text-[#171717] tracking-tight">
                YOU.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#5F5A52] font-light max-w-md leading-relaxed">
            High jewellery must breathe against skin before commitment. Our proprietary optical mirror calculates neck contour, clavicle lighting, and gem dispersion in real-time.
          </p>

          {/* Jewellery Switcher Pill for Try-On */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#171717] uppercase block font-semibold">
              SELECT PIECE FOR IMMEDIATE DRAPE:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { slug: 'noor', label: '01 • NOOR EMERALD COLLIER' },
                { slug: 'maharani', label: '02 • MAHARANI POLKI CHOKER' },
                { slug: 'royal-emerald', label: '03 • EMERALD CHANDELIER' }
              ].map(j => (
                <button
                  key={j.slug}
                  onClick={() => setActiveJewelSlug(j.slug)}
                  className={`px-3 py-1.5 text-[9px] font-mono tracking-wider transition-all border ${activeJewelSlug === j.slug
                    ? 'border-[#073B32] bg-[#073B32] text-white font-semibold shadow-xs'
                    : 'border-[#171717]/20 bg-[#F8F5EE] text-[#5F5A52] hover:border-[#171717]'
                    }`}
                >
                  {j.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive CTA with Micro-Interaction */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              onClick={() => openTryOnForProduct(selectedProduct)}
              className="group relative inline-flex items-center gap-3 px-8 py-5 bg-[#171717] hover:bg-[#073B32] text-[#FFFFFF] text-[10.5px] tracking-[0.26em] uppercase font-sans font-semibold transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-102"
            >
              <Sparkles size={14} className="text-[#C6A56B] animate-pulse" />
              <span>{isCtaHovered ? 'SEE YOURSELF IN IT →' : 'TRY THE MIRROR'}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />

              {/* Light beam running through button */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
              </div>
            </button>

            <button
              onClick={() => navigate('/ai-try-on')}
              className="inline-flex items-center gap-2 px-6 py-5 border border-[#171717] hover:bg-[#F8F5EE] text-[#171717] text-[10px] tracking-[0.24em] uppercase font-sans font-semibold transition-all"
            >
              <Upload size={13} />
              <span>UPLOAD PORTRAIT</span>
            </button>
          </div>
        </div>

        {/* Right Column: Monumental Portrait with Physical Layered Jewel & Light Sweep */}
        <div className="lg:col-span-6 relative flex items-center justify-center">

          {/* Main Campaign Frame */}
          <div
            onClick={() => openTryOnForProduct(selectedProduct)}
            className="relative w-full max-w-[500px] aspect-[4/5] bg-[#E7E2D6] border border-[#171717]/15 overflow-hidden shadow-2xl cursor-pointer group select-none"
          >
            {/* Elegant Muse Portrait */}
            <div className={`w-full h-full relative transition-transform duration-700 ease-out ${isCtaHovered ? 'scale-105' : 'scale-100'}`}>
              <ImageWithFallback
                src={ladyNeckImg}
                alt="Lady with Necklace"
                className="w-full h-full object-cover object-top contrast-105"
              />
              {/* Soft scrim so lady portrait on top pops */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/55 via-transparent to-[#171717]/75 pointer-events-none" />
            </div>


            {/* Floating Live Badge */}
            <div className="absolute top-5 left-5 z-20 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1.5 border border-[#171717]/10 text-[9px] font-mono tracking-[0.22em] text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D6B58] animate-pulse" />
              <span>LIVE MIRROR</span>
            </div>


          </div>

          {/* Out-of-bounds Floating Lady Card */}
          <div
            onClick={() => openTryOnForProduct(selectedProduct)}
            className="hidden sm:block absolute -bottom-6 -left-8 w-44 aspect-[3/4] bg-[#FFFFFF] border border-[#171717]/15 overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <ImageWithFallback
              src={ladyImg}
              alt="Lady portrait detail"
              className="w-full h-full object-contain object-center"
            />

          </div>
        </div>
      </div>

      {/* Bottom Technical Protocol */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between pt-6 border-t border-[#171717]/12 text-[9px] font-mono text-[#5F5A52]">
        <span>CAMERA PERMISSION VOLUNTARY • 100% PRIVATE CLIENT ENCLAVE</span>
        <span className="text-[#0D6B58] font-semibold">ZERO DATA COMMITTED TO CLOUD</span>
      </div>
    </section>
  );
};
