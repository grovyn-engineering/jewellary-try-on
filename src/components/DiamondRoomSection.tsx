import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const DiamondRoomSection: React.FC = () => {
  const { navigate, openTryOnForProduct, setAtmosphereGemstone } = useShop();

  const diamondPiece = PRODUCTS.find(p => p.slug === 'golconda-bloom-pendant') || PRODUCTS[4] || PRODUCTS[0];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      onMouseEnter={() => setAtmosphereGemstone('Diamond')}
      className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#FFFFFF] text-[#171717] overflow-hidden flex flex-col justify-between py-24 sm:py-32 px-6 md:px-12 lg:px-20 select-none border-y border-[#171717]/10"
    >
      {/* Crystalline Optical Grid & Prism Dispersion */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-[#F1EEE7]/60 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between border-b border-[#171717]/12 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#171717] font-bold">
            SCENE 06 • OPTICAL CLARITY
          </span>
          <span className="w-8 h-[1px] bg-[#171717]/20" />
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#5F5A52]">
            THE DIAMOND ROOM
          </span>
        </div>
        <div className="text-[9px] font-mono text-[#171717] tracking-[0.25em] uppercase font-semibold">
          TYPE IIa ALLUVIAL • ZERO MEASURABLE NITROGEN
        </div>
      </div>

      {/* Centerpiece: Monumental Diamond Typography & Crystalline Solitaire */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        
        {/* Left: Enormous Expressive Gloock Typography */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#5F5A52] block">
              COLD FIRE • GOLCONDA HERITAGE
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-[#171717] font-normal leading-[0.9] tracking-tight">
              PURE <br />
              <span className="italic font-light">REFRACTION.</span> <br />
              NO SHADOW.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#5F5A52] font-light max-w-lg leading-relaxed">
            Less than 1.8% of the world's diamonds qualify as Type IIa. Devoid of measurable nitrogen impurities, giving them an optical transparency likened to pooled mountain spring water.
          </p>

          {/* Micro Specs List */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#171717]/12 font-mono text-[9.5px]">
            <div>
              <span className="text-[#5F5A52] block">TYPE CLASSIFICATION</span>
              <span className="text-[#171717] font-semibold">Type IIa Golconda Equivalent</span>
            </div>
            <div>
              <span className="text-[#5F5A52] block">OPTICAL TRANSMISSION</span>
              <span className="text-[#171717] font-semibold">Short-Wave UV Pure White</span>
            </div>
            <div>
              <span className="text-[#5F5A52] block">GOLCONDA CUT FACETING</span>
              <span className="text-[#171717] font-semibold">Open Culet Heritage Rose</span>
            </div>
            <div>
              <span className="text-[#5F5A52] block">CERTIFICATE</span>
              <span className="text-[#171717] font-semibold">Dual GIA Dossier + Type IIa</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/collections/high-jewellery')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#171717] hover:bg-[#073B32] text-white text-[10px] tracking-[0.26em] uppercase font-sans font-semibold transition-all shadow-xl hover:scale-102"
            >
              <span>EXPLORE DIAMOND SUITE</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => openTryOnForProduct(diamondPiece)}
              className="inline-flex items-center gap-2 px-6 py-4 border border-[#171717] hover:bg-[#F8F5EE] text-[#171717] text-[10px] tracking-[0.24em] uppercase font-sans font-semibold transition-all"
            >
              <Sparkles size={13} className="text-[#A98B58]" />
              <span>DRAPE ON YOURSELF</span>
            </button>
          </div>
        </div>

        {/* Right: Giant Diamond Asset with Refractive Shimmer */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate(`/product/${diamondPiece.slug}`)}
          className="lg:col-span-6 relative flex items-center justify-center cursor-pointer group"
        >
          {/* Prismatic flare backdrop */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-100/40 via-amber-50/50 to-pink-50/40 blur-3xl pointer-events-none" />

          <div
            className={`relative w-[110%] max-w-[580px] aspect-square flex items-center justify-center transition-all duration-700 ease-out ${
              isHovered ? 'scale-108' : 'scale-100'
            }`}
          >
            <ImageWithFallback
              src={diamondPiece.images[0]}
              alt="Golconda Diamond Pendant"
              className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
            />

            {/* Dispersion shimmer on hover */}
            <div
              className={`absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-700 ${
                isHovered ? 'opacity-90' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle at 45% 45%, rgba(255,255,255,1) 0%, rgba(200,230,255,0.4) 40%, transparent 70%)'
              }}
            />
          </div>

          <div className="absolute bottom-4 right-0 bg-white/95 backdrop-blur-md border border-[#171717]/15 px-4 py-2 text-[9px] font-mono tracking-widest text-[#171717] pointer-events-none shadow-sm">
            ANTWERP PRECISION • TYPE IIa DOSSIER
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between pt-6 border-t border-[#171717]/12 text-[9px] font-mono text-[#5F5A52]">
        <span>IMMUTABLE ARCHIVAL RECORD</span>
        <span className="uppercase tracking-[0.3em] text-[#171717] font-semibold">ZERO COMPROMISE</span>
      </div>
    </section>
  );
};
