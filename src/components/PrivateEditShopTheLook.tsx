import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Heart, ArrowRight, Eye, Check, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const PrivateEditShopTheLook: React.FC = () => {
  const { navigate, openTryOnForProduct, toggleWishlist, isInWishlist, setAppointmentModalOpen, setPreselectedJewel } = useShop();

  // 4 items for the couture look
  const lookHotspots = [
    {
      id: 'necklace',
      label: 'THE COLLIER',
      product: PRODUCTS.find(p => p.slug === 'noor') || PRODUCTS[0],
      coords: { x: '52%', y: '48%' }
    },
    {
      id: 'earrings',
      label: 'THE CHANDELIERS',
      product: PRODUCTS.find(p => p.slug === 'royal-emerald') || PRODUCTS[2],
      coords: { x: '62%', y: '33%' }
    },
    {
      id: 'ring',
      label: 'THE SOLITAIRE',
      product: PRODUCTS.find(p => p.slug === 'solitaire-colombian-step') || PRODUCTS[3] || PRODUCTS[0],
      coords: { x: '42%', y: '78%' }
    },
    {
      id: 'bracelet',
      label: 'THE CUFF',
      product: PRODUCTS.find(p => p.slug === 'imperial-jadau-cuff') || PRODUCTS[5] || PRODUCTS[1],
      coords: { x: '35%', y: '68%' }
    }
  ];

  const [activeHotspotId, setActiveHotspotId] = useState('necklace');
  const activeSpot = lookHotspots.find(h => h.id === activeHotspotId) || lookHotspots[0];
  const activeProduct = activeSpot.product;

  // 3 oversized private client pieces
  const privateEditPieces = PRODUCTS.filter(p => p.featured).slice(0, 3);

  return (
    <section className="relative min-h-screen w-full bg-[#F8F5EE] text-[#171717] overflow-hidden py-24 sm:py-32 px-6 md:px-12 lg:px-20 select-none">
      
      {/* Background Architectural Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* =========================================================================
            HEADER: CELEBRITY / PRIVATE CLIENT MANIFESTO
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#171717]/15 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#8C1732] font-bold">
                SCENE 04 • THE COUTURE SUITE
              </span>
              <span className="w-8 h-[1px] bg-[#171717]/20" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#5F5A52]">
                CELEBRITY STYLING BOARD
              </span>
            </div>

            {/* Giant Bold Statement */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-[#171717] font-normal leading-[0.92] tracking-tight">
              YOUR JEWELLERY <br />
              <span className="font-sans font-bold uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#8C1732]">
                SHOULD NOT LOOK
              </span> <br />
              <span className="italic text-[#171717]">LIKE EVERYONE ELSE'S.</span>
            </h2>
          </div>

          <div className="max-w-sm space-y-3">
            <p className="font-sans text-xs sm:text-sm text-[#5F5A52] font-light leading-relaxed">
              Curated by our head stylist for Cannes red carpets and sovereign dynastic galas. Hover over any anatomical point to inspect the layered suite.
            </p>
            <div className="text-[9px] font-mono tracking-widest text-[#8C1732] uppercase font-semibold">
              LOOK Nº 04 • EMERALD & GOLCONDA SUITE
            </div>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE SHOP THE LOOK STAGE (MUSE ON LEFT, DETAILS ON RIGHT)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Couture Muse with Floating Interactive Hotspots */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-[#E7E2D6] border border-[#171717]/15 overflow-hidden shadow-xl group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85"
              alt="Couture Jewellery Muse"
              className="w-full h-full object-cover grayscale-[0.2] contrast-110 group-hover:scale-103 transition-transform duration-1000"
            />
            {/* Dark scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Hotspots */}
            {lookHotspots.map((spot) => {
              const isActive = activeHotspotId === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ top: spot.coords.y, left: spot.coords.x }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspotId(spot.id)}
                    className="relative group/spot flex items-center justify-center cursor-pointer"
                    aria-label={`Inspect ${spot.label}`}
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute w-8 h-8 rounded-full transition-all duration-500 ${
                        isActive
                          ? 'bg-[#8C1732]/40 scale-125 animate-ping'
                          : 'bg-white/30 group-hover/spot:scale-110'
                      }`}
                    />
                    {/* Center point */}
                    <span
                      className={`relative w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                        isActive
                          ? 'bg-[#8C1732] border-white scale-120'
                          : 'bg-white border-[#171717] group-hover/spot:bg-[#C6A56B]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>

                    {/* Hotspot Floating Pill */}
                    <span
                      className={`absolute left-6 whitespace-nowrap text-[8.5px] font-mono tracking-widest uppercase px-2 py-1 transition-all pointer-events-none ${
                        isActive
                          ? 'bg-[#171717] text-white shadow-md'
                          : 'bg-white/90 text-[#171717] opacity-0 group-hover/spot:opacity-100'
                      }`}
                    >
                      {spot.label}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Bottom Muse Annotation */}
            <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between text-[9px] font-mono tracking-widest uppercase">
              <span>TAP ANY POINT TO SWITCH COMPONENT</span>
              <span className="text-[#C6A56B]">{activeSpot.label} ACTIVE</span>
            </div>
          </div>

          {/* Right: Active Product Focus & Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-[#171717]/15 pb-4">
              {lookHotspots.map(h => (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspotId(h.id)}
                  className={`px-3 py-1.5 text-[9px] font-mono tracking-wider uppercase transition-all border ${
                    activeHotspotId === h.id
                      ? 'border-[#8C1732] bg-[#8C1732] text-white font-semibold'
                      : 'border-[#171717]/15 bg-white text-[#5F5A52] hover:border-[#171717]'
                  }`}
                >
                  {h.label.replace('THE ', '')}
                </button>
              ))}
            </div>

            {/* Product Card / Showcase */}
            <div className="bg-white border border-[#171717]/15 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="aspect-[4/3] w-full bg-[#F1EEE7] p-4 flex items-center justify-center relative overflow-hidden group">
                <ImageWithFallback
                  src={activeProduct.images[0]}
                  alt={activeProduct.title}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(activeProduct)}
                  className="absolute top-3 right-3 p-2 bg-white/90 border border-[#171717]/10 text-[#171717] hover:text-[#8C1732] transition-colors shadow-xs"
                >
                  <Heart
                    size={14}
                    className={isInWishlist(activeProduct.id) ? 'fill-[#8C1732] text-[#8C1732]' : ''}
                  />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[8.5px] font-mono tracking-[0.3em] uppercase text-[#8C1732] font-semibold block">
                  {activeProduct.collection}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#171717] font-normal">
                  {activeProduct.title}
                </h3>
                <p className="font-mono text-sm text-[#171717] font-semibold">
                  {activeProduct.formattedPrice}
                </p>
              </div>

              <p className="text-xs text-[#5F5A52] font-light leading-relaxed">
                {activeProduct.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openTryOnForProduct(activeProduct)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#171717] hover:bg-[#8C1732] text-white text-[9.5px] tracking-[0.24em] uppercase font-sans font-semibold transition-all shadow-sm"
                >
                  <Sparkles size={12} className="text-[#C6A56B]" />
                  <span>SEE IT ON YOU</span>
                </button>

                <button
                  onClick={() => navigate(`/product/${activeProduct.slug}`)}
                  className="inline-flex items-center gap-2 px-4 py-3.5 border border-[#171717] hover:bg-[#F8F5EE] text-[#171717] text-[9.5px] tracking-[0.2em] uppercase font-sans font-semibold transition-all"
                >
                  <span>INSPECT</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BUILD YOUR PRIVATE EDIT: 3 OVERSIZED PIECES (NOT A NORMAL GRID)
           ========================================================================= */}
        <div className="pt-12 border-t border-[#171717]/15 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-[#8C1732] font-semibold block mb-1">
                PRIVATE CLIENT ARCHIVE
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#171717] font-normal">
                Build Your Private Edit
              </h3>
            </div>
            <button
              onClick={() => {
                setPreselectedJewel('Full Private Client Parure');
                setAppointmentModalOpen(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8C1732] hover:text-[#171717] uppercase font-semibold"
            >
              <span>REQUEST STYLING CONSULTATION</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3 Asymmetric Oversized Pieces */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {privateEditPieces.map((piece, idx) => (
              <div
                key={piece.id}
                className="bg-white border border-[#171717]/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:border-[#8C1732] transition-all group"
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-[#5F5A52]">
                  <span className="text-[#8C1732] font-semibold">0{idx + 1} / 03</span>
                  <span>{piece.craftsmanshipHours} BENCH HOURS</span>
                </div>

                <div
                  onClick={() => navigate(`/product/${piece.slug}`)}
                  className="aspect-square w-full flex items-center justify-center p-4 bg-[#F1EEE7] cursor-pointer overflow-hidden"
                >
                  <ImageWithFallback
                    src={piece.images[0]}
                    alt={piece.title}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono tracking-widest text-[#5F5A52] uppercase block">
                    {piece.collection}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl text-[#171717] font-normal">
                    {piece.title}
                  </h4>
                  <p className="font-mono text-xs text-[#171717] font-semibold">
                    {piece.formattedPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#171717]/10">
                  <button
                    onClick={() => openTryOnForProduct(piece)}
                    className="flex-1 py-2.5 bg-[#171717] hover:bg-[#8C1732] text-white text-[9px] font-mono tracking-widest uppercase transition-colors text-center"
                  >
                    TRY ON
                  </button>
                  <button
                    onClick={() => toggleWishlist(piece)}
                    className="p-2.5 border border-[#171717]/20 hover:border-[#8C1732] text-[#171717] hover:text-[#8C1732] transition-colors"
                    aria-label="Save to Private Edit"
                  >
                    <Heart size={14} className={isInWishlist(piece.id) ? 'fill-[#8C1732] text-[#8C1732]' : ''} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
