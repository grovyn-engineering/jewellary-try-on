import React from 'react';
import { ATELIER_STAGES } from '../data/atelier';
import { useShop } from '../context/ShopContext';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const AtelierPage: React.FC = () => {
  const { setAppointmentModalOpen, navigate } = useShop();

  return (
    <div className="bg-[#FCFAF6] text-[#272522] min-h-screen pt-24 pb-28 selection:bg-[#A98B58]/20">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-[#272522]/10 text-center">
        <span className="text-[9px] tracking-[0.45em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
          HAUTE JOAILLERIE ATELIER
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#272522] font-light mb-4">
          The Art of Making
        </h1>
        <p className="text-xs sm:text-sm text-[#6D655B] font-light max-w-xl mx-auto leading-relaxed">
          Where ancient Indian court techniques and avant-garde structural engineering converge in sacred stillness.
        </p>
      </div>

      {/* The 7 Stages Detailed Narrative */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 space-y-24">
        {ATELIER_STAGES.map((stage, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={stage.step}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Media Image */}
              <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <div className="relative aspect-[16/11] border border-[#272522]/12 overflow-hidden bg-[#F7F3EC] group shadow-sm">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000"
                  />
                  <span className="absolute top-4 left-4 bg-[#FCFAF6]/90 text-[8px] tracking-[0.25em] text-[#A98B58] px-3 py-1 font-sans border border-[#272522]/10 uppercase font-medium">
                    STAGE {stage.step}
                  </span>
                </div>
              </div>

              {/* Text Narrative */}
              <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                  {stage.step} • {stage.hindiName}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] leading-tight mb-2 font-light">
                  {stage.title}
                </h2>
                <p className="font-serif italic text-base text-[#6D655B] mb-6">
                  {stage.subheading}
                </p>
                <div className="w-12 h-[1px] bg-[#A98B58]/60 mb-6" />
                <p className="text-xs sm:text-sm text-[#6D655B] font-light leading-relaxed mb-6">
                  {stage.description}
                </p>
                <div className="p-4 border border-[#272522]/10 bg-[#F7F3EC] flex items-center justify-between text-xs text-[#6D655B]">
                  <span className="uppercase tracking-wider text-[9px]">Primary Instrument:</span>
                  <span className="text-[#272522] font-medium">{stage.tool}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Atelier Visit Section */}
      <div className="max-w-4xl mx-auto px-6 text-center pt-16 border-t border-[#272522]/10">
        <h3 className="font-serif text-3xl text-[#272522] mb-4 font-light">
          Witness the Atelier in Person
        </h3>
        <p className="text-xs sm:text-sm text-[#6D655B] font-light max-w-lg mx-auto leading-relaxed mb-8">
          Patrons commissioning high jewellery pieces are invited to private bench-side viewings with our master goldsmiths.
        </p>
        <button
          onClick={() => setAppointmentModalOpen(true)}
          className="px-8 py-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-sm"
        >
          SCHEDULE ATELIER AUDIENCE
        </button>
      </div>
    </div>
  );
};
