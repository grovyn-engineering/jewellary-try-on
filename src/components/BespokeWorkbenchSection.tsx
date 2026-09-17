import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

type StoneChoice = 'Emerald' | 'Ruby' | 'Sapphire' | 'Diamond';
type MetalChoice = '18K Yellow Gold' | '18K Rose Gold' | '950 Platinum';
type FormChoice = 'Collier' | 'Choker' | 'Solitaire Ring' | 'Chandelier Drops';
type MoodChoice = 'Royal Regalia' | 'Architectural Pure' | 'Modern Sovereign' | 'Heirloom Gala';

export const BespokeWorkbenchSection: React.FC = () => {
  const { setAppointmentModalOpen, setPreselectedJewel, navigate } = useShop();

  const [stone, setStone] = useState<StoneChoice>('Emerald');
  const [metal, setMetal] = useState<MetalChoice>('18K Yellow Gold');
  const [form, setForm] = useState<FormChoice>('Collier');
  const [mood, setMood] = useState<MoodChoice>('Royal Regalia');

  const formImages: Record<FormChoice, string> = {
    Collier: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    Choker: 'https://images.unsplash.com/photo-1611591475825-412f86641847?auto=format&fit=crop&w=1200&q=85',
    'Solitaire Ring': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
    'Chandelier Drops': 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85'
  };

  const stoneTints: Record<StoneChoice, string> = {
    Emerald: 'rgba(13, 107, 88, 0.18)',
    Ruby: 'rgba(140, 23, 50, 0.18)',
    Sapphire: 'rgba(22, 59, 112, 0.18)',
    Diamond: 'rgba(180, 190, 200, 0.14)'
  };

  const estimatedHours = {
    Collier: '340 to 480 ATELIER HOURS',
    Choker: '420 to 580 ATELIER HOURS',
    'Solitaire Ring': '90 to 140 ATELIER HOURS',
    'Chandelier Drops': '180 to 260 ATELIER HOURS'
  }[form];

  const handleCommissionClick = () => {
    setPreselectedJewel(`Bespoke ${form} (${stone}, ${metal}, ${mood})`);
    setAppointmentModalOpen(true);
  };

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#171717]/10 bg-[#F8F5EE] text-[#171717] overflow-hidden select-none">
      
      {/* Background Soft Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${stoneTints[stone]}, transparent 75%)`
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* =========================================================================
            HEADER: DIGITAL WORKBENCH
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/12 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#0D6B58] font-mono font-bold">
                SCENE 09 • THE DIGITAL BENCH
              </span>
              <span className="w-8 h-[1px] bg-[#0D6B58]/30" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#5F5A52] font-mono">
                INTERACTIVE GOLDSMITH WORKBENCH
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              Design Yours.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#5F5A52] font-light max-w-sm">
            Manipulate gemstone core, precious alloy, silhouette, and aesthetic mood. Watch your bespoke commission materialize live on the workbench.
          </p>
        </div>

        {/* =========================================================================
            THE INTERACTIVE BENCH STAGE
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Controls: STONE & METAL */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Control 01: STONE */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#0D6B58] block font-bold">
                01 • PRIMARY GEMSTONE
              </span>
              <div className="space-y-2">
                {(['Emerald', 'Ruby', 'Sapphire', 'Diamond'] as StoneChoice[]).map((stn) => (
                  <button
                    key={stn}
                    onClick={() => setStone(stn)}
                    className={`w-full text-left p-3 border text-xs tracking-wider uppercase font-sans transition-all flex items-center justify-between ${
                      stone === stn
                        ? 'border-[#073B32] bg-[#073B32] text-white font-semibold shadow-xs'
                        : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                    }`}
                  >
                    <span>{stn}</span>
                    <span className="text-[9px] font-mono opacity-80">
                      {stn === 'Emerald' ? 'Muzo' : stn === 'Ruby' ? 'Burma' : stn === 'Sapphire' ? 'Ceylon' : 'Golconda'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 02: METAL */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#0D6B58] block font-bold">
                02 • PRECIOUS ALLOY
              </span>
              <div className="space-y-2">
                {(['18K Yellow Gold', '18K Rose Gold', '950 Platinum'] as MetalChoice[]).map((mtl) => (
                  <button
                    key={mtl}
                    onClick={() => setMetal(mtl)}
                    className={`w-full text-left p-3 border text-xs tracking-wider uppercase font-sans transition-all ${
                      metal === mtl
                        ? 'border-[#073B32] bg-[#073B32] text-white font-semibold shadow-xs'
                        : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                    }`}
                  >
                    {mtl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Stage: LIVE PHYSICAL SILHOUETTE */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center bg-white border border-[#171717]/15 p-8 shadow-sm group">
              <ImageWithFallback
                src={formImages[form]}
                alt={`Custom bespoke ${form}`}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Live Blueprint Floating HUD */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-[#171717]/10 px-3 py-1.5 text-[8.5px] font-mono text-[#171717]">
                <span className="text-[#0D6B58] font-bold">CONFIG:</span> {form.toUpperCase()} • {stone.toUpperCase()}
              </div>

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs border border-[#171717]/10 px-3 py-1.5 text-[8.5px] font-mono text-[#5F5A52]">
                EST. {estimatedHours}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-6 w-full max-w-[460px]">
              <button
                onClick={handleCommissionClick}
                className="w-full py-4 bg-[#171717] hover:bg-[#073B32] text-white text-[10px] tracking-[0.26em] uppercase font-sans font-semibold transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-xl"
              >
                <Sparkles size={14} className="text-[#C6A56B]" />
                <span>COMMISSION THIS CONFIGURATION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Controls: SILHOUETTE & MOOD */}
          <div className="lg:col-span-3 space-y-8 order-3">
            
            {/* Control 03: SILHOUETTE */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#0D6B58] block font-bold">
                03 • SILHOUETTE FORM
              </span>
              <div className="space-y-2">
                {(['Collier', 'Choker', 'Solitaire Ring', 'Chandelier Drops'] as FormChoice[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setForm(f)}
                    className={`w-full text-left p-3 border text-xs tracking-wider uppercase font-sans transition-all ${
                      form === f
                        ? 'border-[#073B32] bg-[#073B32] text-white font-semibold shadow-xs'
                        : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 04: MOOD */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#0D6B58] block font-bold">
                04 • AESTHETIC MOOD
              </span>
              <div className="space-y-2">
                {(['Royal Regalia', 'Architectural Pure', 'Modern Sovereign', 'Heirloom Gala'] as MoodChoice[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`w-full text-left p-3 border text-xs tracking-wider uppercase font-sans transition-all ${
                      mood === m
                        ? 'border-[#073B32] bg-[#073B32] text-white font-semibold shadow-xs'
                        : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                    }`}
                  >
                    {m}
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
