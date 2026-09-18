import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import necklace2 from '../images/necklace2.jpg';
import diamond3 from '../images/diamond3.jpeg';
import diamond5 from '../images/diamond5.jpg';
import rare1 from '../images/rare1.jpg';

export const CinematicAtelierSection: React.FC = () => {
  const { navigate } = useShop();

  const stages = [
    {
      num: '01',
      title: 'THE WAX SCULPTURE',
      craftsman: 'Hand-Carved Jeweller’s Wax',
      desc: 'Carved in hard green wax using miniature heated steel spatulas. The inner gallery is hand-pierced with jewel saw blades finer than human hair.',
      image: diamond3,
      time: 'WEEKS 01 to 06'
    },
    {
      num: '02',
      title: 'THE MASTER STONE SETTING',
      craftsman: 'Micro-Bezel & Jadau Setter',
      desc: 'Solid 18K gold is gently massaged over gemstone girdles using steel burnishers. Zero adhesive; only mechanical friction cradles the stones for centuries.',
      image: necklace2,
      time: 'WEEKS 07 to 14'
    },
    {
      num: '03',
      title: 'AGATE BURNISH & POLISH',
      craftsman: 'Yarn & Agate Finisher',
      desc: 'Natural agate stone burnishers compress the metal skin, creating liquid optical mirror shine. Cotton yarns coated with fine rouge polish hidden under-galleries.',
      image: diamond5,
      time: 'WEEKS 15 to 18'
    },
    {
      num: '04',
      title: 'THE FINISHED SOVEREIGN JEWEL',
      craftsman: 'Dual Swiss Certification',
      desc: 'Inspected under 40x binocular microscopy before receiving the Aurevya Master Touchmark and custody transfer in our private salon.',
      image: rare1,
      time: 'COMPLETION • ETERNITY'
    }
  ];

  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const currentStage = stages[activeStageIdx];

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
