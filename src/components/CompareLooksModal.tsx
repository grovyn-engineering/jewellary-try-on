import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Sparkles, Share2, Calendar, Bookmark, ArrowLeftRight, Check, Eye } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const CompareLooksModal: React.FC = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    savedLooks,
    compareLookIds,
    setCompareLookIds,
    openShareModal,
    setAppointmentModalOpen,
    openTryOnForProduct,
    showToast
  } = useShop();

  const [activeTabMobile, setActiveTabMobile] = useState<'look-1' | 'look-2'>('look-1');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isInteractiveSlider, setIsInteractiveSlider] = useState<boolean>(false);

  if (!isCompareOpen) return null;

  // Resolve Look 1 and Look 2
  const look1 = savedLooks.find(l => l.id === compareLookIds[0]) || savedLooks[0];
  const look2 = savedLooks.find(l => l.id === compareLookIds[1]) || savedLooks[1] || savedLooks[0];

  const product1 = PRODUCTS.find(p => p.id === look1?.pieceId) || PRODUCTS[0];
  const product2 = PRODUCTS.find(p => p.id === look2?.pieceId) || PRODUCTS[1];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pos);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#272522]/50 backdrop-blur-xs">
      <div
        className="absolute inset-0"
        onClick={() => setIsCompareOpen(false)}
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#FCFAF6] border border-[#272522]/15 shadow-2xl p-6 sm:p-10 z-10 text-[#272522] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#272522]/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <ArrowLeftRight size={14} className="text-[#A98B58]" />
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium">
                AI FITTING COMPARISON
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#272522] font-light mt-0.5">
              Compare Your Looks
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsInteractiveSlider(!isInteractiveSlider)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#272522]/20 hover:border-[#A98B58] text-[9px] tracking-wider uppercase font-sans text-[#272522] bg-[#F7F3EC]"
            >
              <span>{isInteractiveSlider ? 'SIDE-BY-SIDE MODE' : 'OVERLAY SLIDER MODE'}</span>
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 text-[#6D655B] hover:text-[#272522]"
              aria-label="Close comparison"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden border border-[#272522]/15 bg-[#F7F3EC] mb-6 p-1">
          <button
            onClick={() => setActiveTabMobile('look-1')}
            className={`flex-1 py-2 text-[9px] tracking-wider uppercase font-sans font-medium transition-all ${
              activeTabMobile === 'look-1' ? 'bg-[#272522] text-[#FCFAF6]' : 'text-[#6D655B]'
            }`}
          >
            LOOK 01 • {look1?.pieceTitle}
          </button>
          <button
            onClick={() => setActiveTabMobile('look-2')}
            className={`flex-1 py-2 text-[9px] tracking-wider uppercase font-sans font-medium transition-all ${
              activeTabMobile === 'look-2' ? 'bg-[#272522] text-[#FCFAF6]' : 'text-[#6D655B]'
            }`}
          >
            LOOK 02 • {look2?.pieceTitle}
          </button>
        </div>

        {/* Interactive Split Slider Mode (if activated) */}
        {isInteractiveSlider ? (
          <div className="mb-8">
            <div
              className="relative aspect-[16/10] max-h-[50vh] overflow-hidden select-none cursor-ew-resize border border-[#272522]/15 bg-[#F7F3EC]"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* Look 2 Image Underneath */}
              <ImageWithFallback
                src={look2?.imageUrl}
                alt={look2?.pieceTitle}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-[#272522]/85 text-[#FCFAF6] text-[8px] tracking-widest uppercase font-sans px-2.5 py-1 z-10">
                LOOK 02: {look2?.pieceTitle}
              </span>

              {/* Look 1 Image Clipped on Top */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <ImageWithFallback
                  src={look1?.imageUrl}
                  alt={look1?.pieceTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-[#272522]/85 text-[#FCFAF6] text-[8px] tracking-widest uppercase font-sans px-2.5 py-1">
                  LOOK 01: {look1?.pieceTitle}
                </span>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#A98B58] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FCFAF6] border border-[#A98B58] flex items-center justify-center text-[#A98B58] shadow-md">
                  <ArrowLeftRight size={11} />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#6D655B] text-center mt-2 font-sans">
              Drag slider left or right to compare silhouette and light harmony between both looks.
            </p>
          </div>
        ) : (
          /* Side-by-Side Dual Looks */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* LOOK 01 */}
            <div className={`border border-[#272522]/12 bg-[#F7F3EC] p-4 sm:p-5 ${activeTabMobile === 'look-2' ? 'hidden sm:block' : 'block'}`}>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#272522]/10">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium">
                  LOOK 01
                </span>
                <span className="text-[9px] text-[#6D655B] font-sans">
                  {look1?.lighting}
                </span>
              </div>

              <div className="relative aspect-[4/5] bg-[#EEE8DE] overflow-hidden mb-4 border border-[#272522]/10 shadow-xs">
                <ImageWithFallback
                  src={look1?.imageUrl}
                  alt={look1?.pieceTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FCFAF6]/90 px-2.5 py-1 border border-[#272522]/10 text-[8px] tracking-wider uppercase font-sans text-[#272522] font-medium">
                  {look1?.category}
                </div>
              </div>

              <h3 className="font-serif text-lg text-[#272522] mb-1 font-normal">
                {look1?.pieceTitle}
              </h3>
              <p className="font-serif text-sm text-[#A98B58] font-medium mb-3">
                {look1?.piecePrice}
              </p>
              <p className="text-xs text-[#6D655B] font-light leading-relaxed mb-4">
                {look1?.notes || product1.description}
              </p>

              {/* Selector to switch piece for Look 1 */}
              <div className="mb-4">
                <label className="text-[8px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                  SWITCH PIECE FOR LOOK 01:
                </label>
                <select
                  value={look1?.id}
                  onChange={(e) => setCompareLookIds([e.target.value, compareLookIds[1]])}
                  className="w-full bg-[#FCFAF6] border border-[#272522]/15 text-[#272522] text-xs p-2 outline-none font-sans"
                >
                  {savedLooks.map(l => (
                    <option key={l.id} value={l.id}>{l.pieceTitle} ({l.lighting})</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openShareModal(look1)}
                  className="flex-1 py-2.5 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1.5"
                >
                  <Share2 size={11} className="text-[#A98B58]" />
                  <span>SHARE LOOK</span>
                </button>
                <button
                  onClick={() => {
                    setIsCompareOpen(false);
                    setAppointmentModalOpen(true);
                  }}
                  className="flex-1 py-2.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1.5"
                >
                  <Calendar size={11} className="text-[#C9B38A]" />
                  <span>VIEW IN SALON</span>
                </button>
              </div>
            </div>

            {/* LOOK 02 */}
            <div className={`border border-[#272522]/12 bg-[#F7F3EC] p-4 sm:p-5 ${activeTabMobile === 'look-1' ? 'hidden sm:block' : 'block'}`}>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#272522]/10">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium">
                  LOOK 02
                </span>
                <span className="text-[9px] text-[#6D655B] font-sans">
                  {look2?.lighting}
                </span>
              </div>

              <div className="relative aspect-[4/5] bg-[#EEE8DE] overflow-hidden mb-4 border border-[#272522]/10 shadow-xs">
                <ImageWithFallback
                  src={look2?.imageUrl}
                  alt={look2?.pieceTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FCFAF6]/90 px-2.5 py-1 border border-[#272522]/10 text-[8px] tracking-wider uppercase font-sans text-[#272522] font-medium">
                  {look2?.category}
                </div>
              </div>

              <h3 className="font-serif text-lg text-[#272522] mb-1 font-normal">
                {look2?.pieceTitle}
              </h3>
              <p className="font-serif text-sm text-[#A98B58] font-medium mb-3">
                {look2?.piecePrice}
              </p>
              <p className="text-xs text-[#6D655B] font-light leading-relaxed mb-4">
                {look2?.notes || product2.description}
              </p>

              {/* Selector to switch piece for Look 2 */}
              <div className="mb-4">
                <label className="text-[8px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                  SWITCH PIECE FOR LOOK 02:
                </label>
                <select
                  value={look2?.id}
                  onChange={(e) => setCompareLookIds([compareLookIds[0], e.target.value])}
                  className="w-full bg-[#FCFAF6] border border-[#272522]/15 text-[#272522] text-xs p-2 outline-none font-sans"
                >
                  {savedLooks.map(l => (
                    <option key={l.id} value={l.id}>{l.pieceTitle} ({l.lighting})</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openShareModal(look2)}
                  className="flex-1 py-2.5 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1.5"
                >
                  <Share2 size={11} className="text-[#A98B58]" />
                  <span>SHARE LOOK</span>
                </button>
                <button
                  onClick={() => {
                    setIsCompareOpen(false);
                    setAppointmentModalOpen(true);
                  }}
                  className="flex-1 py-2.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1.5"
                >
                  <Calendar size={11} className="text-[#C9B38A]" />
                  <span>VIEW IN SALON</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Action Footer */}
        <div className="pt-4 border-t border-[#272522]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6D655B]">
          <span className="font-light">
            Need guidance deciding between these creations? Our Senior Client Director is at your service.
          </span>
          <button
            onClick={() => {
              setIsCompareOpen(false);
              setAppointmentModalOpen(true);
            }}
            className="px-6 py-3 bg-[#272522] text-[#FCFAF6] text-[9px] tracking-widest uppercase font-sans font-medium shadow-sm hover:bg-[#3D3A35] transition-all"
          >
            REQUEST SALON AUDIENCE FOR BOTH LOOKS
          </button>
        </div>
      </div>
    </div>
  );
};
