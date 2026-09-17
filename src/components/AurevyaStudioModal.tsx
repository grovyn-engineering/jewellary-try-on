import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { OCCASIONS } from '../data/occasions';
import { X, Sparkles, ArrowRight, ShieldCheck, Check, Calendar } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface AurevyaStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AurevyaStudioModal: React.FC<AurevyaStudioModalProps> = ({ isOpen, onClose }) => {
  const { openTryOnForProduct, setAppointmentModalOpen, showToast } = useShop();

  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0].id);
  const [selectedSilhouette, setSelectedSilhouette] = useState('Deep V Haute Couture Gown');
  const [selectedJewelId, setSelectedJewelId] = useState(PRODUCTS[0].id);

  if (!isOpen) return null;

  const silhouettes = [
    { title: 'Deep V Haute Couture Gown', neck: 'Low Decolletage', notes: 'Maximizes sovereign collar cascade' },
    { title: 'Imperial Heritage Zari Saree', neck: 'Regal Boatneck', notes: 'Ideal for Jadau chokers and multi-tier pearls' },
    { title: 'Architectural Tuxedo Lapel', neck: 'Sharp Plunge', notes: 'Complements Type IIa solitaires & chandelier drops' },
    { title: 'High-Neck Cashmere & Silk', neck: 'High Collar', notes: 'Accentuates monumental earrings and articulated cuffs' }
  ];

  const selectedJewel = PRODUCTS.find(p => p.id === selectedJewelId) || PRODUCTS[0];
  const activeOccasionObj = OCCASIONS.find(o => o.id === selectedOccasion) || OCCASIONS[0];

  const handleLaunchTryOn = () => {
    onClose();
    openTryOnForProduct(selectedJewel);
    showToast(`Styling ${selectedJewel.title} for ${activeOccasionObj.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#272522]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FCFAF6] border border-[#272522]/15 shadow-2xl p-6 sm:p-10 z-10 text-[#272522]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#272522]/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#A98B58]" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
                DIGITAL PRIVATE SALON
              </span>
            </div>
            <h2 className="font-serif text-3xl text-[#272522] font-light">
              Aurevya Studio
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#6D655B] hover:text-[#272522]">
            <X size={20} />
          </button>
        </div>

        {/* 3 Step Interactive Setup */}
        <div className="space-y-8">
          {/* STEP 1: OCCASION */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium">
                01 • SELECT OCCASION
              </span>
              <span className="text-xs text-[#6D655B] font-light">
                {activeOccasionObj.microcopy}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {OCCASIONS.map(occ => (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-3 text-left border transition-all text-xs ${
                    selectedOccasion === occ.id
                      ? 'border-[#A98B58] bg-[#272522] text-[#FCFAF6]'
                      : 'border-[#272522]/12 bg-[#F7F3EC] text-[#272522] hover:border-[#272522]/30'
                  }`}
                >
                  <span className="font-serif text-sm block mb-0.5">{occ.title}</span>
                  <span className={`text-[9px] block ${selectedOccasion === occ.id ? 'text-[#C9B38A]' : 'text-[#6D655B]'}`}>
                    {occ.microcopy}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: SILHOUETTE */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium">
                02 • SELECT SILHOUETTE & NECKLINE
              </span>
              <span className="text-xs text-[#6D655B] font-light">
                Calibrates drape calculation
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {silhouettes.map(sil => (
                <button
                  key={sil.title}
                  onClick={() => setSelectedSilhouette(sil.title)}
                  className={`p-3.5 text-left border transition-all ${
                    selectedSilhouette === sil.title
                      ? 'border-[#A98B58] bg-[#F7F3EC] shadow-xs'
                      : 'border-[#272522]/10 bg-[#FCFAF6] hover:border-[#272522]/25'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif text-sm text-[#272522]">{sil.title}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#A98B58] font-sans px-1.5 py-0.5 bg-[#FCFAF6] border border-[#272522]/10">
                      {sil.neck}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D655B] font-light">
                    {sil.notes}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: MASTERWORK JEWEL */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium">
                03 • SELECT SOVEREIGN JEWEL
              </span>
              <span className="text-xs text-[#A98B58] font-serif font-medium">
                Selected: {selectedJewel.title}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRODUCTS.slice(0, 8).map(prod => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedJewelId(prod.id)}
                  className={`cursor-pointer border p-2.5 transition-all flex flex-col justify-between ${
                    selectedJewelId === prod.id
                      ? 'border-[#A98B58] bg-[#F7F3EC] ring-1 ring-[#A98B58]'
                      : 'border-[#272522]/10 bg-[#FCFAF6] hover:border-[#272522]/30'
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#EEE8DE] mb-2">
                    <ImageWithFallback src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" />
                    {selectedJewelId === prod.id && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#272522] text-[#FCFAF6] flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-xs text-[#272522] truncate">{prod.title}</h4>
                    <span className="font-serif text-[11px] text-[#A98B58]">{prod.formattedPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Action Sequence: STYLE -> TRY -> SAVE -> VIEW */}
        <div className="mt-8 pt-6 border-t border-[#272522]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6D655B] font-light">
            <span className="text-[#272522] font-medium">Next:</span> Virtual Mirror will drape {selectedJewel.title} against your portrait under {activeOccasionObj.title} lighting.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleLaunchTryOn}
              className="flex-1 sm:flex-none px-8 py-3.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-[0.25em] uppercase font-sans font-medium flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Sparkles size={11} className="text-[#C9B38A]" />
              <span>STYLE THIS LOOK ON ME</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
