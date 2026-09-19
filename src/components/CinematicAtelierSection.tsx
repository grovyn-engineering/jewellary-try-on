import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Clock, Compass, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

import phaseImg1 from '../images/1.png';
import phaseImg2 from '../images/2.png';
import phaseImg3 from '../images/3.png';
import necklace2 from '../images/necklace2.jpg';
import diamond3 from '../images/diamond3.jpeg';
import diamond5 from '../images/diamond5.jpg';
import rare1 from '../images/rare1.jpg';
import galaImg from '../images/moment_gala.jpg';
import weddingImg from '../images/moment_wedding.jpg';

export const CinematicAtelierSection: React.FC = () => {
  const { navigate } = useShop();

  const stages = [
    {
      num: '1',
      title: 'THE WAX SCULPTURE & GOUACHE DRAFT',
      craftsman: 'Master Draftsman & Wax Sculptor',
      hours: '120 BENCH HOURS',
      desc: 'Hand-painted gouache rendered at 1:1 scale on vellum paper, followed by carving in hard green jeweller wax using miniature steel spatulas heated over flame.',
      image: phaseImg1,
      fallback: diamond3,
      time: 'WEEKS 1 to 6',
      technique: 'Jewel saw blades 0.15mm width, micro-piercing under 20x magnification.'
    },
    {
      num: '2',
      title: 'MASTER STONE SETTING & JADAU WORK',
      craftsman: 'Micro-Bezel & Gemmological Setter',
      hours: '140 BENCH HOURS',
      desc: 'Solid 18K gold bezels massaged millimeter by millimeter over Golconda solitaire girdles. Zero adhesive; pure mechanical friction cradles the stones for centuries.',
      image: phaseImg2,
      fallback: necklace2,
      time: 'WEEKS 7 to 14',
      technique: 'Flush pave, floating prongs, reverse Meenakari enameling on gold backplate.'
    },
    {
      num: '3',
      title: 'AGATE BURNISH & ROUGE POLISH',
      craftsman: 'Yarn & Natural Agate Finisher',
      hours: '50 BENCH HOURS',
      desc: 'Natural agate stone burnishers compress the metal skin to achieve a liquid optical mirror finish. Hand-spun cotton yarn coated with Paris rouge polishes inner under-galleries.',
      image: phaseImg3,
      fallback: diamond5,
      time: 'WEEKS 15 to 18',
      technique: 'Hand yarn polisher, agate stone friction compression, silk thread buffing.'
    },
    {
      num: '4',
      title: 'THE FINISHED SOVEREIGN MASTERPIECE',
      craftsman: 'Dual Swiss Certification & Master Gemmologist',
      hours: '30 BENCH HOURS',
      desc: 'Final inspection under 40x binocular microscopy before engraving the Aurevya Master Touchmark and private vault transfer in our sovereign salon.',
      image: galaImg || rare1,
      fallback: weddingImg,
      time: 'COMPLETION • ETERNITY',
      technique: '40x Binocular loupe audit, Laser touchmark engraving, SSEF/GIA certification.'
    }
  ];

  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const currentStage = stages[activeStageIdx];

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#171717]/10 bg-[#F8F5EE] text-[#171717] overflow-hidden select-none">

      <div className="max-w-7xl mx-auto space-y-16">

        {/* =========================================================================
            HEADER: 340 HOURS AT THE BENCH
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/12 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#0D6B58] font-mono font-bold">
                SCENE 08 • METAMORPHIC DISCIPLINE
              </span>
              <span className="w-8 h-[1px] bg-[#0D6B58]/30" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#5F5A52] font-mono">
                DOCUMENTARY CHRONICLE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              340 Hours at the Bench.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#073B32]/10 border border-[#073B32]/20 text-[#073B32] text-[9px] font-mono tracking-widest uppercase font-bold">
              <Clock size={12} />
              <span>TOTAL WORKBENCH DURATION: 340 HOURS</span>
            </div>

            <button
              onClick={() => navigate('/atelier')}
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-mono font-semibold text-[#0D6B58] hover:text-[#171717] transition-colors"
            >
              <span>FULL ATELIER DOCUMENTARY</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC STAGED CHRONICLE (CAROUSEL & STEPS)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Active Stage Image Portal */}
          <div className="lg:col-span-7 relative aspect-[4/3] bg-[#E7E2D6] overflow-hidden border border-[#171717]/15 shadow-xl group">
            <ImageWithFallback
              src={currentStage.image}
              fallbackSrc={currentStage.fallback}
              alt={currentStage.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Dark Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Top Left HUD */}
            <div className="absolute top-4 left-4 bg-[#171717]/90 text-white px-3 py-1.5 text-[8.5px] font-mono tracking-widest uppercase border border-white/20 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A56B] animate-pulse" />
              <span>STAGE {currentStage.num} • {currentStage.hours}</span>
            </div>

            {/* Floating Bottom Left Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[8.5px] font-mono tracking-[0.25em] text-[#C6A56B] uppercase block">
                ATELIER TECHNIQUE PROTOCOL
              </span>
              <p className="text-xs font-mono opacity-90 leading-relaxed font-light">
                {currentStage.technique}
              </p>
            </div>
          </div>

          {/* Active Stage Dossier & Stepper Controls */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3 border-b border-[#171717]/10 pb-6">
              <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#0D6B58] uppercase font-bold">
                <Compass size={13} />
                <span>CHRONICLE PHASE {currentStage.num} • {currentStage.time}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#171717] leading-tight font-normal">
                {currentStage.title}
              </h3>

              <p className="text-xs font-mono text-[#5F5A52] uppercase font-semibold">
                CRAFTSMAN: {currentStage.craftsman}
              </p>

              <p className="font-sans text-sm text-[#5F5A52] font-light leading-relaxed pt-2">
                {currentStage.desc}
              </p>
            </div>

            {/* 340-Hour Stage Steppers */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#5F5A52] block">
                SELECT WORKBENCH PHASE:
              </span>

              <div className="grid grid-cols-2 gap-3">
                {stages.map((st, idx) => (
                  <button
                    key={st.num}
                    onClick={() => setActiveStageIdx(idx)}
                    className={`p-3 text-left border text-[9.5px] font-mono transition-all flex flex-col justify-between ${activeStageIdx === idx
                      ? 'border-[#073B32] bg-[#073B32] text-white shadow-md font-bold'
                      : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                      }`}
                  >
                    <span className="opacity-80">PHASE {st.num}</span>
                    <span className="truncate mt-1 uppercase">{st.title.split('&')[0]}</span>
                    <span className="text-[8px] opacity-70 mt-1">{st.hours}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
