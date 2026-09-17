import React from 'react';
import { useShop } from '../context/ShopContext';
import { OCCASIONS } from '../data/occasions';
import { PRODUCTS } from '../data/products';
import { OccasionType } from '../types';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const OccasionDiscoverySection: React.FC = () => {
  const { activeOccasion, setActiveOccasion, navigate, openTryOnForProduct, setAppointmentModalOpen } = useShop();

  const currentOccasion = OCCASIONS.find(o => o.id === activeOccasion) || OCCASIONS[0];
  const recommendedProducts = PRODUCTS.filter(p => currentOccasion.recommendedProductIds.includes(p.id));

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FCFAF6] border-b border-[#272522]/10 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[9px] tracking-[0.45em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
            CURATED DESTINATIONS & RITUALS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#272522] font-light mb-3">
            What Are You Dressing For?
          </h2>
          <p className="text-xs sm:text-sm text-[#6D655B] font-light">
            Every sovereign creation is harmonized to the ceremony, atmosphere, and light of your milestone.
          </p>
        </div>

        {/* Occasion Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {OCCASIONS.map((occ) => {
            const isActive = occ.id === activeOccasion;
            return (
              <button
                key={occ.id}
                onClick={() => setActiveOccasion(occ.id)}
                className={`px-4 sm:px-6 py-2.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-sans transition-all duration-300 ${
                  isActive
                    ? 'bg-[#272522] text-[#FCFAF6] shadow-sm'
                    : 'bg-[#F7F3EC] text-[#6D655B] hover:text-[#272522] hover:bg-[#EFE9DF] border border-[#272522]/10'
                }`}
              >
                {occ.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Occasion Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F7F3EC] border border-[#272522]/12 p-6 sm:p-10 mb-12">
          {/* Editorial Banner */}
          <div className="lg:col-span-6 relative aspect-[16/11] overflow-hidden bg-[#EEE8DE] shadow-xs">
            <ImageWithFallback
              src={currentOccasion.bannerImage}
              alt={currentOccasion.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#272522]/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#C9B38A] font-sans font-medium mb-1">
                OCCASION AESTHETIC
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FCFAF6] font-light">
                {currentOccasion.title}
              </h3>
              <p className="font-serif italic text-base text-[#E5D5B7] mt-1">
                "{currentOccasion.microcopy}"
              </p>
            </div>
          </div>

          {/* Curatorial Direction & Microcopy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                ATELIER STYLING PROTOCOL
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#272522] font-light leading-snug mb-4">
                {currentOccasion.leadQuote}
              </h4>
              <p className="text-xs sm:text-sm text-[#6D655B] font-light leading-relaxed mb-6">
                {currentOccasion.stylingNotes}
              </p>
            </div>

            <div className="p-4 bg-[#FCFAF6] border border-[#272522]/10 mb-6">
              <span className="text-[8px] uppercase tracking-wider text-[#A98B58] block mb-1 font-sans font-medium">
                DISCREET SALON RECOMMENDATION
              </span>
              <p className="text-xs text-[#272522] font-light">
                Pieces below have been pre-screened by our Master Gemmologist for optimal illumination under {activeOccasion === 'red-carpet' ? 'intense photography flashes' : 'warm evening candlelight'}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/ai-try-on')}
                className="px-6 py-3.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-[0.25em] uppercase font-sans font-medium flex items-center gap-2 shadow-xs"
              >
                <Sparkles size={11} className="text-[#C9B38A]" />
                <span>STYLE THIS OCCASION IN VIRTUAL MIRROR</span>
              </button>
              <button
                onClick={() => setAppointmentModalOpen(true)}
                className="px-5 py-3.5 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] text-[9px] tracking-[0.2em] uppercase font-sans font-medium"
              >
                REQUEST SALON AUDIENCE
              </button>
            </div>
          </div>
        </div>

        {/* 4 Curated Pieces for this Occasion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#FCFAF6] border border-[#272522]/12 p-4 flex flex-col justify-between group hover:border-[#A98B58] transition-all shadow-xs"
            >
              <div
                className="relative aspect-square overflow-hidden bg-[#EEE8DE] mb-3 cursor-pointer"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-2 left-2 bg-[#FCFAF6]/90 text-[7px] tracking-wider uppercase text-[#A98B58] font-sans font-medium px-2 py-0.5 border border-[#272522]/10">
                  {product.primaryStone}
                </span>
              </div>

              <div>
                <span className="text-[8px] tracking-widest uppercase text-[#A98B58] font-sans font-medium block">
                  {product.collection}
                </span>
                <h4
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="font-serif text-base text-[#272522] truncate cursor-pointer hover:text-[#A98B58] mt-0.5"
                >
                  {product.title}
                </h4>
                <p className="font-serif text-sm text-[#272522] font-medium mt-1">
                  {product.formattedPrice}
                </p>
                <p className="text-[10px] text-[#6D655B] font-light mt-1 line-clamp-1">
                  {product.specs[0]?.weight}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#272522]/10 flex items-center gap-2">
                {product.tryOnCompatible && (
                  <button
                    onClick={() => openTryOnForProduct(product)}
                    className="flex-1 py-2 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[8px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1"
                  >
                    <Sparkles size={9} className="text-[#C9B38A]" />
                    <span>TRY ON</span>
                  </button>
                )}
                <button
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="flex-1 py-2 border border-[#272522]/20 hover:border-[#272522] text-[#272522] text-[8px] tracking-wider uppercase font-sans text-center"
                >
                  VIEW PIECE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
