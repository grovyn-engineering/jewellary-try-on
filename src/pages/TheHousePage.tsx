import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Compass, ShieldCheck, Gem, Landmark } from 'lucide-react';

export const TheHousePage: React.FC = () => {
  const { navigate, setAppointmentModalOpen } = useShop();

  return (
    <div className="bg-[#FCFAF6] text-[#272522] min-h-screen pt-24 pb-28 selection:bg-[#A98B58]/20">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden border-b border-[#272522]/10 bg-[#F7F3EC] py-20">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=2400&q=85"
          alt="The House of Aurevya"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAF6]/40 via-[#FCFAF6]/70 to-[#FCFAF6]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="text-[9px] tracking-[0.45em] uppercase text-[#A98B58] font-sans font-medium block mb-4">
            MAISON DE HAUTE JOAILLERIE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#272522] font-light mb-4">
            The House
          </h1>
          <p className="font-serif italic text-xl text-[#6D655B] max-w-xl mx-auto">
            "Jewels with a memory."
          </p>
        </div>
      </section>

      {/* Chapter 1: The Genesis */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 border-b border-[#272522]/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
              CHAPTER I • THE GENESIS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] leading-tight mb-6 font-light">
              Imperial Regalia Meets Parisian Architecture
            </h2>
            <div className="w-12 h-[1px] bg-[#A98B58]/60 mb-6" />
            <p className="text-xs sm:text-sm text-[#6D655B] font-light leading-relaxed mb-6">
              Aurevya was conceived in the shadows of the Golconda diamond vaults and perfected with architectural discipline. For generations, traditional Indian high jewellery was celebrated for lavish abundance; our House introduced restraint, stripping away visual noise to let sovereign untreated gemstones breathe.
            </p>
            <p className="text-xs sm:text-sm text-[#6D655B] font-light leading-relaxed">
              Every creation is signed by our Master Goldsmith and registered in the permanent House Ledger, ensuring your family heirlooms carry uninterrupted lineage across centuries.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] border border-[#272522]/12 overflow-hidden bg-[#F7F3EC] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
                alt="Aurevya Atelier Heritage"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-[#FCFAF6]/90 text-[8px] tracking-[0.25em] uppercase text-[#272522] px-3 py-1 font-sans border border-[#272522]/10">
                HOUSE REGISTER • ARCHIVAL VOL. IV
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Code of Purity */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 border-b border-[#272522]/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
            CHAPTER II • THE THREE PILLARS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light">
            The Sovereign Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-[#272522]/10 bg-[#F7F3EC]">
            <Gem size={24} className="text-[#A98B58] mb-4" />
            <h3 className="font-serif text-xl text-[#272522] mb-3">Untreated Purity</h3>
            <p className="text-xs text-[#6D655B] font-light leading-relaxed">
              We decline synthetic fracture fillings, resin enhancements, or heat treatments. What mother nature took millions of years to forge remains pure in our vitrines.
            </p>
          </div>

          <div className="p-8 border border-[#272522]/10 bg-[#F7F3EC]">
            <Compass size={24} className="text-[#A98B58] mb-4" />
            <h3 className="font-serif text-xl text-[#272522] mb-3">Zero Compromise Weight</h3>
            <p className="text-xs text-[#6D655B] font-light leading-relaxed">
              Our gold armatures are forged with sovereign solidity. Pieces feel reassuringly weighty, balanced to rest in perfect harmony against the collarbone.
            </p>
          </div>

          <div className="p-8 border border-[#272522]/10 bg-[#F7F3EC]">
            <ShieldCheck size={24} className="text-[#A98B58] mb-4" />
            <h3 className="font-serif text-xl text-[#272522] mb-3">Permanent Archival Bond</h3>
            <p className="text-xs text-[#6D655B] font-light leading-relaxed">
              Every client receives a hand-bound provenance register containing original gouache illustrations, dual Swiss gemmological lab dossiers, and perpetual atelier servicing.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: Private Salons */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 text-center">
        <Landmark size={28} className="text-[#A98B58] mx-auto mb-4" />
        <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
          GLOBAL PRESENCE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light mb-4">
          The Private Salons
        </h2>
        <p className="text-xs sm:text-sm text-[#6D655B] font-light max-w-xl mx-auto leading-relaxed mb-8">
          By exclusive referral and private appointment only.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-12">
          <div className="p-6 border border-[#272522]/10 bg-[#F7F3EC]">
            <span className="text-[9px] tracking-wider uppercase text-[#A98B58] block mb-1">MUMBAI</span>
            <h4 className="font-serif text-lg text-[#272522]">The Flagship Salon</h4>
            <p className="text-xs text-[#6D655B] font-light mt-1">Altamount Road, Cumballa Hill</p>
          </div>

          <div className="p-6 border border-[#272522]/10 bg-[#F7F3EC]">
            <span className="text-[9px] tracking-wider uppercase text-[#A98B58] block mb-1">LONDON</span>
            <h4 className="font-serif text-lg text-[#272522]">Mayfair Suites</h4>
            <p className="text-xs text-[#6D655B] font-light mt-1">New Bond Street, W1S</p>
          </div>

          <div className="p-6 border border-[#272522]/10 bg-[#F7F3EC]">
            <span className="text-[9px] tracking-wider uppercase text-[#A98B58] block mb-1">DUBAI</span>
            <h4 className="font-serif text-lg text-[#272522]">DIFC Gallery</h4>
            <p className="text-xs text-[#6D655B] font-light mt-1">Gate Village Building 03</p>
          </div>
        </div>

        <button
          onClick={() => setAppointmentModalOpen(true)}
          className="px-8 py-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-sm"
        >
          REQUEST AN AUDIENCE
        </button>
      </section>
    </div>
  );
};
