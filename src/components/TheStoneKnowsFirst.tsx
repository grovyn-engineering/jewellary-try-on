import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { RotateCw, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import diamond2 from '../images/diamond2.jpg';
import diamond3 from '../images/diamond3.jpeg';
import diamond5 from '../images/diamond5.jpg';
import solitaires1 from '../images/solitaires1.jpeg';

export const TheStoneKnowsFirst: React.FC = () => {
  const { navigate, setAtmosphereGemstone } = useShop();

  // Multi-angle / facet sequence of the stone
  const angles = [
    {
      angle: '0°',
      label: 'FACE & TABLE',
      image: diamond2,
      desc: 'Symmetric octagonal table allowing deep light penetration without internal blackout.'
    },
    {
      angle: '90°',
      label: 'CROWN PROFILE',
      image: diamond3,
      desc: 'Steeply beveled step facets creating hypnotic hall-of-mirrors reflection.'
    },
    {
      angle: '180°',
      label: 'PAVILION DEPTH',
      image: diamond5,
      desc: 'Deep culet geometry engineered to retain saturated chromium green.'
    },
    {
      angle: '270°',
      label: 'JARDIN INCLUSION MAP',
      image: solitaires1,
      desc: 'Natural microscopic fluid veining proving 65-million-year geological origin.'
    }
  ];

  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const currentAngle = angles[activeAngleIdx];

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#171717]/10 overflow-hidden bg-[#F8F5EE] text-[#171717]">
      
      {/* Dynamic Ambient Bath */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(13,107,88,0.06),transparent_70%)]" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* =========================================================================
            HEADER: THE STONE KNOWS FIRST
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/12 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#0D6B58] font-mono font-bold">
                SCENE 07 • GEMMOLOGICAL ARCHITECTURE
              </span>
              <span className="w-8 h-[1px] bg-[#0D6B58]/30" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#5F5A52] font-mono">
                NON-DESTRUCTIVE ROTATION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              The Stone Knows First.
            </h2>
          </div>

          {/* Geological Coordinates */}
          <div className="text-right font-mono text-[9.5px] text-[#5F5A52] space-y-1">
            <p className="text-[#171717] font-semibold">14.82 CARATS • COLOMBIAN MUZO</p>
            <p>5°33'N 74°09'W • GUBELIN CERTIFICATE Nº 24089</p>
          </div>
        </div>

        {/* =========================================================================
            GIANT GEMSTONE STAGE WITH RADIAL FLOATING ANNOTATIONS
           ========================================================================= */}
        <div className="relative min-h-[540px] sm:min-h-[620px] flex items-center justify-center">
          
          {/* Central Giant Gemstone Silhouette & Multi-Angle Scrub */}
          <div className="relative w-[320px] sm:w-[460px] md:w-[540px] aspect-square flex items-center justify-center select-none group">
            {/* Concentric Gold Orbit Lines */}
            <div className="absolute inset-0 rounded-full border border-[#0D6B58]/20 pointer-events-none animate-spin-slow [animation-duration:40s]" />
            <div className="absolute inset-8 rounded-full border border-[#171717]/5 pointer-events-none" />

            {/* Giant Stone Image */}
            <div className="relative w-4/5 h-4/5 flex items-center justify-center cursor-pointer">
              <ImageWithFallback
                src={currentAngle.image}
                alt={`Muzo Emerald at angle ${currentAngle.angle}`}
                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(13,107,88,0.22)] transition-all duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Angle Control Scrub Strip (Floating beneath stone) */}
            <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#FFFFFF] border border-[#171717]/15 p-2 shadow-sm z-10">
              <RotateCw size={12} className="text-[#0D6B58] ml-2" />
              <span className="text-[8.5px] tracking-[0.2em] font-mono text-[#5F5A52] pr-2">
                SCRUB ANGLE:
              </span>
              {angles.map((a, idx) => (
                <button
                  key={a.angle}
                  onClick={() => setActiveAngleIdx(idx)}
                  className={`px-2.5 py-1 text-[9px] font-mono transition-all ${
                    activeAngleIdx === idx
                      ? 'bg-[#073B32] text-white font-semibold'
                      : 'text-[#5F5A52] hover:text-[#171717]'
                  }`}
                >
                  {a.angle}
                </button>
              ))}
            </div>
          </div>

          {/* Radial Floating Spec Note: Top Left */}
          <div className="hidden lg:block absolute top-8 left-0 max-w-xs space-y-1 text-left border-l-2 border-[#0D6B58] pl-4">
            <span className="text-[8px] tracking-[0.3em] uppercase font-mono text-[#0D6B58] font-bold block">
              ACTIVE FACET PROTOCOL
            </span>
            <p className="font-display text-lg text-[#171717]">
              {currentAngle.label}
            </p>
            <p className="text-xs text-[#5F5A52] font-light leading-relaxed">
              {currentAngle.desc}
            </p>
          </div>

          {/* Radial Floating Spec Note: Bottom Right */}
          <div className="hidden lg:block absolute bottom-12 right-0 max-w-xs space-y-2 text-right border-r-2 border-[#0D6B58] pr-4">
            <span className="text-[8px] tracking-[0.3em] uppercase font-mono text-[#0D6B58] font-bold block">
              OPTICAL PURITY RATIO
            </span>
            <p className="font-mono text-xl text-[#171717] font-semibold">
              99.4% CHROMIUM
            </p>
            <p className="text-xs text-[#5F5A52] font-light">
              Spectrometric analysis shows zero synthetic lattice treatment.
            </p>
          </div>
        </div>

        {/* Bottom Micro Dossier Strip */}
        <div className="pt-8 border-t border-[#171717]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-[#5F5A52]">
          <span>GUBELIN GEM LAB REPORT NO. 24089 • SWISS VERIFIED</span>
          <button
            onClick={() => navigate('/the-house')}
            className="inline-flex items-center gap-2 text-[#0D6B58] hover:text-[#171717] font-semibold tracking-wider uppercase transition-colors"
          >
            <span>VIEW COMPLETE GEMMOLOGICAL DOSSIER</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};
