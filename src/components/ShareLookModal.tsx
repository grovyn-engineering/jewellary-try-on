import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Copy, Check, MessageCircle, Mail, Download, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const ShareLookModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, shareLook, showToast } = useShop();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !shareLook) return null;

  const shareUrl = `${window.location.origin}/ai-try-on?lookId=${shareLook.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Confidential styling link copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `I am reviewing this Aurevya Haute Joaillerie look: ${shareLook.pieceTitle} (${shareLook.piecePrice}). View confidential styling edit: ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Aurevya Private Styling Edit: ${shareLook.pieceTitle}`);
    const body = encodeURIComponent(
      `Here is my confidential styling look from Aurevya Haute Joaillerie:\n\nPiece: ${shareLook.pieceTitle}\nValuation: ${shareLook.piecePrice}\nAtmosphere: ${shareLook.lighting}\n\nExplore: ${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#272522]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsShareModalOpen(false)} />

      <div className="relative w-full max-w-lg bg-[#FCFAF6] border border-[#272522]/15 shadow-2xl p-6 sm:p-8 z-10 text-[#272522]">
        <div className="flex items-center justify-between border-b border-[#272522]/10 pb-3 mb-6">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium">
              CONFIDENTIAL DISPATCH
            </span>
            <h2 className="font-serif text-2xl text-[#272522] font-light">
              Share Your Private Edit
            </h2>
          </div>
          <button onClick={() => setIsShareModalOpen(false)} className="p-1.5 text-[#6D655B] hover:text-[#272522]">
            <X size={20} />
          </button>
        </div>

        {/* Editorial Share Card Preview */}
        <div id="aurevya-share-card" className="bg-[#F7F3EC] border border-[#272522]/15 p-5 mb-6 shadow-xs text-center">
          <div className="border-b border-[#272522]/10 pb-2 mb-4">
            <span className="font-serif text-lg tracking-[0.3em] uppercase text-[#272522] block font-light">
              A U R E V Y A
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#A98B58] font-sans">
              HAUTE JOAILLERIE • PRIVATE EDIT
            </span>
          </div>

          <div className="relative aspect-[4/5] max-h-64 mx-auto overflow-hidden bg-[#EEE8DE] mb-4 border border-[#272522]/10">
            <ImageWithFallback
              src={shareLook.imageUrl}
              alt={shareLook.pieceTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-[#FCFAF6]/90 py-1 px-2 border border-[#272522]/10 text-[8px] tracking-wider uppercase font-sans text-[#272522]">
              {shareLook.lighting}
            </div>
          </div>

          <h3 className="font-serif text-lg text-[#272522] font-light">
            {shareLook.pieceTitle}
          </h3>
          <p className="font-serif text-xs text-[#A98B58] font-medium mt-0.5">
            {shareLook.piecePrice}
          </p>
          <p className="font-serif italic text-xs text-[#6D655B] mt-2">
            "See the jewel become yours."
          </p>
        </div>

        {/* Sharing Options */}
        <div className="space-y-2.5">
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check size={12} className="text-[#C9B38A]" /> : <Copy size={12} className="text-[#C9B38A]" />}
            <span>{copied ? 'LINK COPIED' : 'COPY CONFIDENTIAL STYLING LINK'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleWhatsApp}
              className="py-2.5 px-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans text-[#272522] flex items-center justify-center gap-1.5"
            >
              <MessageCircle size={11} className="text-[#A98B58]" />
              <span>SEND VIA WHATSAPP</span>
            </button>
            <button
              onClick={handleEmail}
              className="py-2.5 px-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans text-[#272522] flex items-center justify-center gap-1.5"
            >
              <Mail size={11} className="text-[#A98B58]" />
              <span>EMAIL TO ADVISOR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
