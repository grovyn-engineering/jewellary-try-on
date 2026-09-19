import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

import weddingImg from '../images/moment_wedding.jpg';
import engagementImg from '../images/moment_engagement.jpg';
import redcarpetImg from '../images/moment_redcarpet.jpg';
import galaImg from '../images/moment_gala.jpg';
import anniversaryImg from '../images/moment_anniversary.jpg';
import privateImg from '../images/bangles1.webp';

export const WhatIsTheMomentSection: React.FC = () => {
  const { navigate, setActiveOccasion } = useShop();

  const moments = [
    {
      id: 'wedding',
      title: 'THE WEDDING',
      tag: 'Imperial Dynastic Union',
      desc: 'Tiered Basra pearls, Jadau polki centerpieces, and polychrome reverse Meenakari.',
      image: weddingImg,
      route: '/collections/bridal'
    },
    {
      id: 'engagement',
      title: 'THE ENGAGEMENT',
      tag: 'Type IIa Alluvial Solitaires',
      desc: 'Golconda cut diamonds exhibiting crystalline water transparency with zero fluorescence.',
      image: engagementImg,
      route: '/collections/solitaires'
    },
    {
      id: 'red-carpet',
      title: 'THE RED CARPET',
      tag: 'Kinetic High Fire',
      desc: 'Articulated chandelier drops that command flash photography and evening movement.',
      image: redcarpetImg,
      route: '/collections/high-jewellery'
    },
    {
      id: 'gala',
      title: 'THE GALA',
      tag: 'Museum-Tier Regalia',
      desc: 'Architectural collars featuring rare Muzo cabochon emeralds and custom gold bezels.',
      image: galaImg,
      route: '/collections/high-jewellery'
    },
    {
      id: 'anniversary',
      title: 'THE ANNIVERSARY',
      tag: 'Historic Memory Keepers',
      desc: 'Vintage rose-cut pendants and hand-chased temple gold talismans.',
      image: anniversaryImg,
      route: '/collections'
    },
    {
      id: 'moment-that-matters',
      title: 'THE MOMENT THAT MATTERS',
      tag: 'Private Sovereign Milestones',
      desc: 'Bespoke one-of-a-kind jewels conceived slowly to commemorate private triumph.',
      image: privateImg,
      route: '/bespoke'
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#171717]/10 bg-[#F8F5EE] text-[#171717] overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* =========================================================================
            HEADER: WHAT IS THE MOMENT?
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/12 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#0D6B58] font-mono font-bold">
                SCENE 10 • OCCASION ARCHITECTURE
              </span>
              <span className="w-8 h-[1px] bg-[#0D6B58]/30" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#5F5A52] font-mono">
                DESTINED OCCASIONS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              What is the Moment?
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#5F5A52] font-light max-w-sm">
            Jewels exist to immortalize moments. Select the ceremony or milestone you are preparing to command.
          </p>
        </div>

        {/* =========================================================================
            ASYMMETRIC OCCASION PANELS (HIGH-CONTRAST EDITORIAL PORTALS)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {moments.map((m, idx) => {
            const isHovered = activeIdx === idx;
            return (
              <div
                key={m.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => {
                  setActiveOccasion(m.id as any);
                  navigate(m.route);
                }}
                className={`relative aspect-[3/4] bg-[#E7E2D6] border overflow-hidden p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-700 group ${
                  isHovered
                    ? 'border-[#073B32] shadow-2xl translate-y-[-4px]'
                    : 'border-[#171717]/15 shadow-sm'
                }`}
              >
                {/* Background Image with Rich Scrim */}
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback
                    src={m.image}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/20 to-transparent pointer-events-none" />
                </div>

                {/* Top Corner Badge */}
                <div className="relative z-10 flex items-center justify-between text-white">
                  <span className="text-[9px] font-mono tracking-widest text-[#C6A56B] uppercase font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-[8.5px] font-mono tracking-widest uppercase opacity-80">
                    CURATED SUITE
                  </span>
                </div>

                {/* Bottom Title & Discovery Link */}
                <div className="relative z-10 space-y-2 text-white">
                  <span className="text-[8.5px] font-mono tracking-[0.25em] uppercase text-[#C6A56B] block">
                    {m.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal leading-tight">
                    {m.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light line-clamp-2 leading-relaxed">
                    {m.desc}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-2 text-[9px] font-mono tracking-widest uppercase text-[#C6A56B] group-hover:translate-x-1 transition-transform">
                    <span>ENTER OCCASION SUITE</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
