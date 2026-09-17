import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const EmeraldRoomSection: React.FC = () => {
  const { navigate, openTryOnForProduct, setAtmosphereGemstone } = useShop();

  const emeraldPiece = PRODUCTS.find(p => p.slug === 'noor') || PRODUCTS[0];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      onMouseEnter={() => setAtmosphereGemstone('Emerald')}
      className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#073B32] text-[#FFFFFF] overflow-hidden flex flex-col justify-between py-24 sm:py-32 px-6 md:px-12 lg:px-20 select-none"
    >
      {/* Background Mineral Texture / Deep Cavern Radiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(13,107,88,0.5),transparent_75%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Top Protocol Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between border-b border-white/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#C6A56B] font-semibold">
            SCENE 02 • THE COLOR BLOCKER
          </span>
          <span className="w-8 h-[1px] bg-white/30" />
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/70">
            THE EMERALD ROOM
          </span>
        </div>
        <div className="text-[9px] font-mono text-[#C6A56B] tracking-[0.25em] uppercase">
          14.82 CT MUZO COLOMBIAN EMERALD
        </div>
      </div>

      {/* Centerpiece: Monumental Typography + Partially Cropped Giant Necklace */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        
        {/* Left: Enormous Expressive Gloock Typography */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#C6A56B] block">
              MINERAL ORIGIN • MUZO BASIN
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white font-normal leading-[0.9] tracking-tight">
              THE STONE <br />
              <span className="italic text-[#C6A56B]">SPEAKS</span> <br />
              FIRST.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
            Formed 65 million years ago in hydrothermal brine veins under the Eastern Andes. Pure chromium green untainted by iron impurities. We built the gold collar around its voice.
          </p>

          {/* Human Haute Joaillerie Dossier Highlights */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-5 border-y border-white/15">
            <div>
              <span className="text-[9px] font-sans font-medium tracking-[0.08em] uppercase text-white/60 block mb-0.5">
                REFRACTIVE INDEX
              </span>
              <span className="font-mono text-xs text-white font-medium">
                1.577 to 1.583
              </span>
            </div>
            <div>
              <span className="text-[9px] font-sans font-medium tracking-[0.08em] uppercase text-white/60 block mb-0.5">
                CLARITY PROTOCOL
              </span>
              <span className="font-sans text-xs text-white font-medium">
                Gubelin Class I Natural Jardin
              </span>
            </div>
            <div>
              <span className="text-[9px] font-sans font-medium tracking-[0.08em] uppercase text-white/60 block mb-0.5">
                GOLD ALLOY
              </span>
              <span className="font-sans text-xs text-white font-medium">
                Solid 18K Warm Satin Bezel
              </span>
            </div>
            <div>
              <span className="text-[9px] font-sans font-medium tracking-[0.08em] uppercase text-[#C6A56B] block mb-0.5">
                ACQUISITION STATUS
              </span>
              <span className="font-sans text-sm text-[#C6A56B] font-semibold tracking-wide">
                Single Parure Available
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/collections/high-jewellery')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFFFFF] hover:bg-[#F8F5EE] text-[#073B32] text-[10px] tracking-[0.26em] uppercase font-sans font-bold shadow-2xl transition-all duration-300 hover:scale-103"
            >
              <span>ENTER THE EMERALD ROOM</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => openTryOnForProduct(emeraldPiece)}
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/40 hover:border-white text-white text-[10px] tracking-[0.24em] uppercase font-sans font-semibold transition-all"
            >
              <Sparkles size={13} className="text-[#C6A56B]" />
              <span>TRY ON NECKLACE</span>
            </button>
          </div>
        </div>

        {/* Right: Monumental Partially Cropped Necklace with Hover & Tilt Interaction */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate(`/product/${emeraldPiece.slug}`)}
          className="lg:col-span-6 relative flex items-center justify-center cursor-pointer group"
        >
          {/* Subtle Emerald Ring halo */}
          <div className="absolute w-72 h-72 rounded-full border border-[#0D6B58] opacity-40 animate-ping [animation-duration:5s] pointer-events-none" />

          <div
            className={`relative w-[110%] max-w-[620px] aspect-square flex items-center justify-center transition-all duration-700 ease-out ${
              isHovered ? 'scale-108 -translate-y-3' : 'scale-100'
            }`}
          >
            <ImageWithFallback
              src={emeraldPiece.images[0]}
              alt="Monumental Muzo Emerald Collier"
              className="w-full h-full object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
            />

            {/* Specular sheen over emerald */}
            <div
              className={`absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-700 ${
                isHovered ? 'opacity-80' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.9) 0%, transparent 60%)'
              }}
            />
          </div>

          {/* Floating Dimension Tag */}
          <div className="absolute bottom-4 right-0 bg-[#073B32]/90 backdrop-blur-md border border-white/20 px-4 py-2 text-[9px] font-mono tracking-widest text-[#C6A56B] pointer-events-none">
            340 BENCH HOURS • MUZO MINE DOSSIER
          </div>
        </div>
      </div>

      {/* Bottom Architectural Transition Note */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between pt-6 border-t border-white/15 text-[9px] font-mono text-white/60">
        <span>02 / 12 METAMORPHIC SCENES</span>
        <span className="uppercase tracking-[0.3em] text-[#C6A56B]">CONTINUOUS ELEVATION</span>
      </div>
    </section>
  );
};
