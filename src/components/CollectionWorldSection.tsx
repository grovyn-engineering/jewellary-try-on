import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { StoneType } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export const CollectionWorldSection: React.FC = () => {
  const { navigate, setAtmosphereGemstone } = useShop();

  const worlds: {
    id: StoneType;
    title: string;
    subtitle: string;
    origin: string;
    carats: string;
    image: string;
    tint: string;
    path: string;
  }[] = [
    {
      id: 'Emerald',
      title: 'EMERALD',
      subtitle: 'The Mineral Forest',
      origin: 'Muzo & Chivor Mines, Colombia',
      carats: 'Unheated Jardins • Deep Vivid Green',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      tint: 'rgba(46, 94, 78, 0.08)',
      path: '/collections/high-jewellery'
    },
    {
      id: 'Diamond',
      title: 'DIAMOND',
      subtitle: 'Golconda Type IIa',
      origin: 'Kollur Alluvial Valley & Antwerp',
      carats: 'Flawless Transparency • Antique Cuts',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      tint: 'rgba(150, 170, 190, 0.08)',
      path: '/collections/solitaires'
    },
    {
      id: 'Ruby',
      title: 'RUBY',
      subtitle: 'Old Burma Crimson',
      origin: 'Mogok Stone Tract, Myanmar',
      carats: 'Pigeon Blood Natural Fluorescence',
      image: 'https://images.unsplash.com/photo-1611591475825-412f86641847?auto=format&fit=crop&w=1200&q=85',
      tint: 'rgba(160, 40, 60, 0.08)',
      path: '/collections/bridal'
    },
    {
      id: 'Sapphire',
      title: 'SAPPHIRE',
      subtitle: 'Kashmir Velvet',
      origin: 'Padar Valley & Ceylon Deposits',
      carats: 'Cornflower Blue • Silk Inclusions',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      tint: 'rgba(35, 70, 110, 0.08)',
      path: '/collections'
    }
  ];

  const [hoveredWorld, setHoveredWorld] = useState<StoneType>('Emerald');

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#272522]/10 overflow-hidden transition-colors duration-1000">
      
      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#272522]/10 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[8.5px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
              SCENE 04 • THE WORLDS
            </span>
            <span className="w-8 h-[1px] bg-[#A98B58]/30" />
            <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#6D655B] font-mono">
              EXPANDING SANCTUARIES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#272522] font-light">
            Enter a Jewellery World
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#6D655B] font-light max-w-sm">
          Four sovereign gemstone spheres. Hover to expand an atmosphere; step across the threshold to view curated pieces.
        </p>
      </div>

      {/* =========================================================================
          INTERACTIVE FULL-BLEED 4-WORLD SELECTOR
          Columns expand on hover, others compress, ambient bath shifts
         ========================================================================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 min-h-[550px] sm:min-h-[640px]">
        {worlds.map((world) => {
          const isHovered = hoveredWorld === world.id;

          return (
            <div
              key={world.id}
              onMouseEnter={() => {
                setHoveredWorld(world.id);
                setAtmosphereGemstone(world.id);
              }}
              onClick={() => {
                setAtmosphereGemstone(world.id);
                navigate(world.path);
              }}
              className={`relative cursor-pointer overflow-hidden border border-[#272522]/12 bg-[#F7F3EC] p-6 sm:p-8 flex flex-col justify-between transition-all duration-700 ease-out group shadow-xs ${
                isHovered
                  ? 'md:col-span-2 shadow-lg ring-1 ring-[#A98B58]/40'
                  : 'md:col-span-1 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Background Image with Dramatic Zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <ImageWithFallback
                  src={world.image}
                  alt={world.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Soft Light Sheen / Tint */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    backgroundColor: world.tint,
                    opacity: isHovered ? 0.9 : 0.4
                  }}
                />
                {/* Text Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#272522]/85 via-[#272522]/20 to-transparent" />
              </div>

              {/* Top Meta Pin */}
              <div className="relative z-10 flex items-center justify-between text-[#FCFAF6]">
                <span className="text-[8px] font-mono tracking-[0.3em] uppercase bg-[#272522]/80 backdrop-blur-xs px-2.5 py-1 border border-[#FCFAF6]/20">
                  {world.id.toUpperCase()} REALM
                </span>
                <Sparkles size={13} className={isHovered ? 'text-[#C9B38A] animate-pulse' : 'text-[#FCFAF6]/40'} />
              </div>

              {/* Bottom Architectural Story */}
              <div className="relative z-10 text-[#FCFAF6] space-y-3">
                <span className="text-[8.5px] tracking-[0.3em] uppercase text-[#C9B38A] block font-sans">
                  {world.subtitle}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
                  {world.title}
                </h3>

                {/* Expanded Details (Reveals on hover) */}
                <div
                  className={`space-y-1 transition-all duration-500 overflow-hidden ${
                    isHovered ? 'max-h-28 opacity-100 pt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs text-[#FCFAF6]/80 font-light">
                    {world.origin}
                  </p>
                  <p className="text-[11px] font-mono text-[#C9B38A]">
                    {world.carats}
                  </p>
                </div>

                {/* Call to Action Trigger */}
                <div className="pt-3 flex items-center gap-2 text-xs tracking-[0.22em] uppercase font-sans font-medium text-[#FCFAF6] group-hover:text-[#C9B38A] transition-colors">
                  <span>ENTER WORLD</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
