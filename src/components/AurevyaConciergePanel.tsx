import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, PhoneCall, MessageCircle, Calendar, Sparkles, Gem, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';

export const AurevyaConciergePanel: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, setAppointmentModalOpen, navigate, conciergeInitialIntent, showToast } = useShop();

  const [activeTab, setActiveTab] = useState<string>(conciergeInitialIntent || 'ARRANGE A PRIVATE VIEWING');
  const [directQuery, setDirectQuery] = useState('');
  const [querySent, setQuerySent] = useState(false);

  if (!isConciergeOpen) return null;

  const openingOptions = [
    {
      id: 'FIND A PIECE',
      title: 'FIND A PIECE',
      desc: 'Let our curators locate specific carat weights, historical cuts, or Colombian emeralds.',
      action: () => navigate('/collections/high-jewellery')
    },
    {
      id: 'ARRANGE A PRIVATE VIEWING',
      title: 'ARRANGE A PRIVATE VIEWING',
      desc: 'Reserve a confidential suite in Mumbai, London, Dubai, New Delhi, or Paris.',
      action: () => {
        setIsConciergeOpen(false);
        setAppointmentModalOpen(true);
      }
    },
    {
      id: 'UNDERSTAND A GEMSTONE',
      title: 'UNDERSTAND A GEMSTONE',
      desc: 'Explore Colombian emerald jardins, Type IIa purity, or natural Basra pearl histories.',
      action: () => navigate('/journal')
    },
    {
      id: 'BUILD A BRIDAL SET',
      title: 'BUILD A BRIDAL SET',
      desc: 'Custom parure styling for royal wedding ceremonies and ancestral heirlooms.',
      action: () => navigate('/collections/bridal')
    },
    {
      id: 'SPEAK WITH A STYLIST',
      title: 'SPEAK WITH A STYLIST',
      desc: 'Direct consultation with our High Jewellery Stylist for red-carpet and gala appearances.',
      action: () => {
        setIsConciergeOpen(false);
        setAppointmentModalOpen(true);
      }
    },
    {
      id: 'BEGIN A BESPOKE COMMISSION',
      title: 'BEGIN A BESPOKE COMMISSION',
      desc: 'Collaborate directly with our Master Goldsmith to forge an original creation.',
      action: () => navigate('/bespoke')
    }
  ];

  const handleSendDirectQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directQuery.trim()) return;
    setQuerySent(true);
    showToast('Concierge inquiry dispatched to Private Client Liaison');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#272522]/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsConciergeOpen(false)}
      />

      {/* Concierge Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[#FCFAF6] border-l border-[#272522]/15 h-full flex flex-col justify-between p-6 sm:p-10 z-10 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 text-[#272522]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#272522]/10 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#A98B58]" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
                  WHITE-GLOVE CLIENTELING
                </span>
              </div>
              <h2 className="font-serif text-3xl text-[#272522] font-light mt-0.5">
                Aurevya Concierge
              </h2>
            </div>
            <button
              onClick={() => setIsConciergeOpen(false)}
              className="p-1.5 text-[#6D655B] hover:text-[#272522]"
              aria-label="Close concierge"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-xs text-[#6D655B] font-light leading-relaxed mb-6">
            Welcome to the private desk of Aurevya. How may our Client Directors and Master Gemmologists assist your acquisition today?
          </p>

          {/* Curated Pathways Grid */}
          <div className="space-y-3 mb-8">
            {openingOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  opt.action();
                  setIsConciergeOpen(false);
                }}
                className="w-full text-left p-3.5 bg-[#F7F3EC] border border-[#272522]/10 hover:border-[#A98B58] transition-all group flex items-center justify-between"
              >
                <div>
                  <h4 className="font-serif text-sm text-[#272522] group-hover:text-[#A98B58] transition-colors">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-[#6D655B] font-light mt-0.5 max-w-sm">
                    {opt.desc}
                  </p>
                </div>
                <ArrowRight size={14} className="text-[#A98B58] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
              </button>
            ))}
          </div>

          {/* Direct Confidential Message */}
          <div className="p-4 bg-[#F7F3EC] border border-[#272522]/10">
            <span className="text-[9px] uppercase tracking-wider text-[#A98B58] block mb-2 font-sans font-medium">
              DIRECT DESK DISPATCH
            </span>
            {querySent ? (
              <p className="text-xs text-[#A98B58] font-serif italic py-2">
                Your private inquiry has been received. A dedicated Senior Client Director will reach out within two hours.
              </p>
            ) : (
              <form onSubmit={handleSendDirectQuery} className="space-y-2">
                <textarea
                  rows={2}
                  value={directQuery}
                  onChange={(e) => setDirectQuery(e.target.value)}
                  placeholder="Inquire regarding a specific gemstone, provenance, or custom commission..."
                  className="w-full bg-[#FCFAF6] border border-[#272522]/15 text-xs text-[#272522] p-2.5 outline-none resize-none focus:border-[#A98B58]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[8px] tracking-[0.2em] uppercase font-sans font-medium"
                >
                  DISPATCH CONFIDENTIAL INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Direct Contact Ribbon */}
        <div className="pt-6 mt-6 border-t border-[#272522]/10">
          <div className="grid grid-cols-2 gap-3 text-center">
            <a
              href="tel:+919820018800"
              className="py-2.5 px-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans text-[#272522] flex items-center justify-center gap-1.5"
            >
              <PhoneCall size={11} className="text-[#A98B58]" />
              <span>SALON HOTLINE</span>
            </a>
            <a
              href="https://wa.me/919820018800?text=I%20wish%20to%20inquire%20regarding%20Aurevya%20Haute%20Joaillerie"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans text-[#272522] flex items-center justify-center gap-1.5"
            >
              <MessageCircle size={11} className="text-[#A98B58]" />
              <span>WHATSAPP PRIVATE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
