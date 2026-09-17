import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sliders } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const CinematicAtelierSection: React.FC = () => {
  const { navigate } = useShop();

  const stages = [
    {
      num: '01',
      title: 'THE GOUACHE DRAWING',
      craftsman: 'Master Draftsman Rendering',
      desc: 'Rendered 1:1 scale on grey archival parchment with opaque gouache watercolours. Every reflection, pavé grain, and bezel wall is calculated before gold is melted.',
      image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85',
      time: 'WEEKS 01 to 04'
    },
    {
      num: '02',
      title: 'THE WAX SCULPTURE',
      craftsman: 'Hand-Carved Jeweller’s Wax',
      desc: 'Carved in hard green wax using miniature heated steel spatulas. The inner gallery is hand-pierced with jewel saw blades finer than human hair.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      time: 'WEEKS 05 to 08'
    },
    {
      num: '03',
      title: 'THE MASTER STONE SETTING',
      craftsman: 'Micro-Bezel & Jadau Setter',
      desc: 'Solid 18K gold is gently massaged over gemstone girdles using steel burnishers. Zero adhesive; only mechanical friction cradles the stones for centuries.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
      time: 'WEEKS 09 to 14'
    },
    {
      num: '04',
      title: 'AGATE BURNISH & POLISH',
      craftsman: 'Yarn & Agate Finisher',
      desc: 'Natural agate stone burnishers compress the metal skin, creating liquid optical mirror shine. Cotton yarns coated with fine rouge polish hidden under-galleries.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      time: 'WEEKS 15 to 18'
    },
    {
      num: '05',
      title: 'THE FINISHED SOVEREIGN JEWEL',
      craftsman: 'Dual Swiss Certification',
      desc: 'Inspected under 40x binocular microscopy before receiving the Aurevya Master Touchmark and custody transfer in our private salon.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      time: 'COMPLETION • ETERNITY'
    }
  ];

  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const currentStage = stages[activeStageIdx];

  // Interactive Sketch-to-Jewel Reveal Slider
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#171717]/10 bg-[#F8F5EE] text-[#171717] overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-20">
        
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

          <button
            onClick={() => navigate('/atelier')}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-mono font-semibold text-[#0D6B58] hover:text-[#171717] transition-colors"
          >
            <span>FULL ATELIER DOCUMENTARY</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* =========================================================================
            SKETCH-TO-JEWEL TRANSFORMATION SLIDER (GOUACHE VS FINISHED REAL JEWEL)
           ========================================================================= */}
        <div className="bg-white border border-[#171717]/15 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#171717]/10 pb-4">
            <div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#0D6B58] font-bold block">
                METAMORPHIC COMPARATOR
              </span>
              <h3 className="font-display text-2xl text-[#171717]">
                Gouache Sketch ↔ Finished Sovereign Collier
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[#5F5A52]">
              <Sliders size={12} className="text-[#0D6B58]" />
              <span>DRAG SLIDER HORIZONTALLY</span>
            </div>
          </div>

          {/* Interactive Split Comparison View */}
          <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden select-none bg-[#E7E2D6]">
            {/* Base layer: Finished physical jewel */}
            <div className="absolute inset-0 w-full h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85"
                alt="Finished Sovereign Collier"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-[#171717]/80 backdrop-blur-xs text-white text-[9px] font-mono px-3 py-1 uppercase">
                FINISHED JEWEL • 18K GOLD & MUZO EMERALDS
              </div>
            </div>

            {/* Overlaid layer: Gouache sketch clipped to slider width */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full min-w-[100vw] lg:min-w-[1280px]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1600&q=85"
                  alt="Gouache Atelier Sketch"
                  className="w-full h-full object-cover filter sepia-[0.3]"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs text-[#171717] text-[9px] font-mono px-3 py-1 uppercase font-semibold">
                ARCHIVAL GOUACHE DRAFT • 1:1 SCALE
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center text-[10px] font-mono shadow-lg border border-white">
                ↔
              </div>
            </div>

            {/* Hidden Input Range for smooth scrub */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Drag to compare sketch and jewel"
            />
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC STAGED CHRONICLE (CAROUSEL & STEPS)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Active Stage Image */}
          <div className="lg:col-span-6 aspect-[4/3] bg-[#E7E2D6] overflow-hidden border border-[#171717]/15">
            <ImageWithFallback
              src={currentStage.image}
              alt={currentStage.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Active Stage Dossier & Step List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-[#0D6B58] uppercase font-bold">
                STAGE {currentStage.num} • {currentStage.time}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#171717]">
                {currentStage.title}
              </h3>
              <p className="text-xs font-mono text-[#5F5A52] uppercase">
                {currentStage.craftsman}
              </p>
            </div>

            <p className="font-sans text-sm text-[#5F5A52] font-light leading-relaxed">
              {currentStage.desc}
            </p>

            {/* Stepper Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#171717]/10">
              {stages.map((st, idx) => (
                <button
                  key={st.num}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`px-3 py-2 text-[9px] font-mono transition-all border ${
                    activeStageIdx === idx
                      ? 'border-[#073B32] bg-[#073B32] text-white font-semibold'
                      : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                  }`}
                >
                  {st.num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
