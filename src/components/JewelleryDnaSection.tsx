import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, Compass, Gem, Eye } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const JewelleryDnaSection: React.FC = () => {
  const { jewelleryDNA, navigate, openTryOnForProduct, setAppointmentModalOpen, toggleWishlist, isInWishlist } = useShop();

  const curatedProducts = PRODUCTS.filter(p => jewelleryDNA.curatedPieceIds.includes(p.id));

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F7F3EC] border-y border-[#272522]/10 relative overflow-hidden transition-colors duration-700">
      {/* Subtle decorative background watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-[#272522] font-serif text-[180px] leading-none whitespace-nowrap">
        DNA
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: DNA Profile Analysis */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={14} className="text-[#A98B58]" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
                INTELLECTUAL CLIENTELING
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light leading-tight mb-4">
              Your Jewellery DNA
            </h2>

            <p className="font-serif italic text-lg text-[#6D655B] mb-6">
              "{jewelleryDNA.summary}"
            </p>

            {/* Micro Taste Attributes Pill Grid */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1.5 bg-[#FCFAF6] border border-[#272522]/15 text-[9px] tracking-wider uppercase font-sans text-[#272522] font-medium">
                GEMSTONE: {jewelleryDNA.dominantStone.toUpperCase()}
              </span>
              <span className="px-3 py-1.5 bg-[#FCFAF6] border border-[#272522]/15 text-[9px] tracking-wider uppercase font-sans text-[#272522] font-medium">
                STYLE: {jewelleryDNA.dominantStyle.toUpperCase()}
              </span>
              <span className="px-3 py-1.5 bg-[#FCFAF6] border border-[#272522]/15 text-[9px] tracking-wider uppercase font-sans text-[#272522] font-medium">
                PRESENCE: {jewelleryDNA.statementLevel.toUpperCase()}
              </span>
              <span className="px-3 py-1.5 bg-[#FCFAF6] border border-[#272522]/15 text-[9px] tracking-wider uppercase font-sans text-[#272522] font-medium">
                OCCASION: {jewelleryDNA.preferredOccasion.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-[#6D655B] font-light leading-relaxed mb-8 max-w-md">
              Synthesized quietly from your archival viewing habits, gemstone preferences, and proportion affinities. Every recommendation is calibrated for your personal collection.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/collections/high-jewellery')}
                className="px-6 py-3.5 bg-[#272522] text-[#FCFAF6] hover:bg-[#3D3A35] text-[9px] tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-xs flex items-center gap-2"
              >
                <span>EXPLORE YOUR PRIVATE EDIT</span>
                <ArrowRight size={12} />
              </button>
              <button
                onClick={() => setAppointmentModalOpen(true)}
                className="px-5 py-3.5 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] text-[9px] tracking-[0.2em] uppercase font-sans font-medium transition-all"
              >
                CONSULT STYLIST
              </button>
            </div>
          </div>

          {/* Right Column: 3 Curated Recommendations */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#272522]/10">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#6D655B] font-sans">
                TAILORED CREATIONS FOR YOUR PROFILE
              </span>
              <span className="text-[9px] tracking-widest text-[#A98B58] font-sans font-medium">
                94% AFFINITY MATCH
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {curatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#FCFAF6] border border-[#272522]/12 p-3 flex flex-col justify-between group hover:border-[#A98B58] transition-all shadow-xs"
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
                    <span className="absolute top-2 left-2 bg-[#FCFAF6]/90 text-[7px] tracking-wider uppercase text-[#A98B58] font-sans font-medium px-1.5 py-0.5 border border-[#272522]/10">
                      {product.primaryStone}
                    </span>
                  </div>

                  <div>
                    <span className="text-[8px] tracking-widest uppercase text-[#A98B58] font-sans font-medium block">
                      {product.collection}
                    </span>
                    <h4
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="font-serif text-sm text-[#272522] truncate cursor-pointer hover:text-[#A98B58] mt-0.5"
                    >
                      {product.title}
                    </h4>
                    <p className="font-serif text-xs text-[#272522] font-medium mt-1">
                      {product.formattedPrice}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#272522]/10 flex items-center gap-1.5">
                    {product.tryOnCompatible && (
                      <button
                        onClick={() => openTryOnForProduct(product)}
                        className="flex-1 py-1.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[8px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1"
                      >
                        <Sparkles size={9} className="text-[#C9B38A]" />
                        <span>TRY ON</span>
                      </button>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="px-2 py-1.5 border border-[#272522]/20 hover:border-[#272522] text-[#272522] text-[8px] tracking-wider uppercase font-sans"
                    >
                      {isInWishlist(product.id) ? 'SAVED' : 'SAVE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
