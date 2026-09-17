import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Heart, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    openTryOnForProduct,
    navigate,
    toggleWishlist,
    isInWishlist,
    setAppointmentModalOpen,
    setPreselectedJewel
  } = useShop();

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handlePrivateViewing = () => {
    setPreselectedJewel(`${quickViewProduct.title} (${quickViewProduct.collection})`);
    setQuickViewProduct(null);
    setAppointmentModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Soft warm backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/50 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Quick View Architectural Container */}
      <div className="relative w-full max-w-4xl bg-[#F8F5EE] border border-[#171717]/15 shadow-[0_25px_70px_rgba(23,23,23,0.18)] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 p-2 text-[#5F5A52] hover:text-[#171717] bg-[#F8F5EE]/90 backdrop-blur-xs border border-[#171717]/10 transition-colors"
          aria-label="Close quick view"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          
          {/* Left: Large Focused Image */}
          <div className="md:col-span-6 bg-[#EEE8DE] p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#171717]/10">
            <div className="relative aspect-square w-full overflow-hidden bg-[#F8F5EE]/40 flex items-center justify-center">
              <img
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between text-[9.5px] font-sans text-[#5F5A52] tracking-wider uppercase">
              <span>{quickViewProduct.collection}</span>
              <span className="text-[#A98B58] font-medium">{quickViewProduct.craftsmanshipHours} ATELIER BENCH HOURS</span>
            </div>
          </div>

          {/* Right: Product Dossier & Actions */}
          <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between bg-[#FCFAF6]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-semibold">
                  {quickViewProduct.collection}
                </span>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="p-1.5 text-[#5F5A52] hover:text-[#A98B58] transition-colors"
                  aria-label="Save to Private Edit"
                >
                  <Heart size={16} className={inWishlist ? 'fill-[#A98B58] text-[#A98B58]' : ''} />
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-light leading-tight mb-1">
                {quickViewProduct.title}
              </h3>

              <p className="font-sans text-xs text-[#5F5A52] font-light mb-4">
                {quickViewProduct.subtitle}
              </p>

              <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[#171717]/10">
                <span className="font-serif text-2xl text-[#171717] font-normal">
                  {quickViewProduct.formattedPrice}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#073B32] font-sans font-medium">
                  {quickViewProduct.inStock ? 'READY FOR PRIVATE VIEWING' : 'BY ATELIER ORDER'}
                </span>
              </div>

              {/* Material Highlights */}
              <div className="space-y-2.5 py-2 text-xs text-[#5F5A52] mb-6">
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[9px] tracking-wider text-[#5F5A52] font-medium">Primary Gemstone</span>
                  <span className="text-[#171717] font-medium">{quickViewProduct.primaryStone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[9px] tracking-wider text-[#5F5A52] font-medium">Precious Metal</span>
                  <span className="text-[#171717] font-medium">{quickViewProduct.metal} ({quickViewProduct.goldPurity})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[9px] tracking-wider text-[#5F5A52] font-medium">Certification</span>
                  <span className="text-[#171717] font-medium flex items-center gap-1">
                    <ShieldCheck size={12} className="text-[#A98B58]" />
                    <span>{quickViewProduct.certification}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5F5A52] font-light line-clamp-2 mb-6 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {/* SEE IT ON YOU */}
              {quickViewProduct.tryOnCompatible && (
                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    openTryOnForProduct(quickViewProduct);
                  }}
                  className="w-full py-3 px-4 bg-[#171717] hover:bg-[#272522] text-[#F8F5EE] text-[9.5px] tracking-[0.24em] uppercase font-sans font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Sparkles size={12} className="text-[#C6A56B] animate-pulse" />
                  <span>SEE IT ON YOU • VIRTUAL MIRROR</span>
                </button>
              )}

              {/* PRIVATE VIEWING */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrivateViewing}
                  className="py-3 px-3 border border-[#171717]/25 hover:border-[#171717] bg-[#FCFAF6] text-[#171717] text-[9px] tracking-[0.18em] uppercase font-sans font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar size={12} className="text-[#A98B58]" />
                  <span>PRIVATE VIEWING</span>
                </button>

                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    navigate(`/product/${quickViewProduct.slug}`);
                  }}
                  className="py-3 px-3 border border-[#171717]/25 hover:border-[#171717] bg-[#FCFAF6] text-[#171717] text-[9px] tracking-[0.18em] uppercase font-sans font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <span>FULL DOSSIER</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
