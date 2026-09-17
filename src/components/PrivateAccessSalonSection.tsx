import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Calendar, Sparkles, ArrowRight, Award, Compass } from 'lucide-react';

export const PrivateAccessSalonSection: React.FC = () => {
  const { setAppointmentModalOpen, setPreselectedJewel } = useShop();

  const options = [
    {
      id: 'salon',
      title: 'PRIVATE SALON',
      subtitle: 'Flagship Suites',
      locations: 'Mumbai • New Delhi • London • Dubai',
      desc: 'Exclusive access to our private viewing chambers, with museum colliers presented on velvet trays with bespoke champagne service.',
      icon: ShieldCheck
    },
    {
      id: 'gemologist',
      title: 'CHIEF GEMMOLOGIST',
      subtitle: 'Direct Science Dialogue',
      locations: 'Atelier Gemmological Lab',
      desc: 'Private binocular microscopy session with our Chief Gemmologist inspecting unheated inclusions and original Swiss laboratory dossiers.',
      icon: Award
    },
    {
      id: 'bespoke',
      title: 'BESPOKE COMMISSION',
      subtitle: 'Original Creation',
      locations: 'Head Designer Studio',
      desc: 'Collaborate with the master goldsmith and gouache artist to create an entirely original parure for your family dynasty.',
      icon: Sparkles
    },
    {
      id: 'virtual',
      title: 'VIRTUAL CONSULTATION',
      subtitle: 'Encrypted Digital Salon',
      locations: 'Global Private Link',
      desc: 'High-definition macro camera presentation of selected jewels with physical metal and wax models delivered to your private residence.',
      icon: Compass
    }
  ];

  const [selectedOption, setSelectedOption] = useState('salon');

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#171717]/10 bg-[#F8F5EE] text-[#171717] overflow-hidden select-none">
      
      {/* Background Soft Gold Bath */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(198,165,107,0.06),transparent_75%)]" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* =========================================================================
            HEADER: PRIVATE ACCESS
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/12 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#0D6B58] font-mono font-bold">
                SCENE 11 • THE SANCTUARY
              </span>
              <span className="w-8 h-[1px] bg-[#0D6B58]/30" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#5F5A52] font-mono">
                BY PRIVATE APPOINTMENT ONLY
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              Private Viewing
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-display text-2xl sm:text-3xl italic text-[#171717] font-normal leading-snug">
              "Some pieces are better experienced than purchased."
            </p>
          </div>
        </div>

        {/* =========================================================================
            THE 4 PRIVATE ACCESS OPTIONS (EDITORIAL COMPOSITION)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const IconComp = opt.icon;

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={`p-7 border cursor-pointer flex flex-col justify-between transition-all duration-500 min-h-[340px] ${
                  isSelected
                    ? 'border-[#073B32] bg-white shadow-xl ring-1 ring-[#0D6B58]/30'
                    : 'border-[#171717]/12 bg-white/70 hover:border-[#171717]/40 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <IconComp size={18} className={isSelected ? 'text-[#0D6B58]' : 'text-[#5F5A52]'} />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0D6B58] uppercase font-bold">
                      {opt.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-[#171717] mb-2 font-normal">
                    {opt.title}
                  </h3>

                  <p className="text-[9px] font-mono tracking-wider text-[#5F5A52] mb-4 pb-3 border-b border-[#171717]/10">
                    {opt.locations}
                  </p>

                  <p className="text-xs text-[#5F5A52] font-light leading-relaxed">
                    {opt.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-[9px] font-mono tracking-wider uppercase">
                  <span className={isSelected ? 'text-[#0D6B58] font-bold' : 'text-[#5F5A52]'}>
                    {isSelected ? 'SELECTED ENCLAVE' : 'CLICK TO SELECT'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0D6B58]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Row: Book Private Appointment */}
        <div className="pt-8 border-t border-[#171717]/12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs font-mono text-[#5F5A52] tracking-wider text-center sm:text-left">
            <span>DISCRETION GUARANTEED • NON-DISCLOSURE PROTOCOL HONORED UPON REQUEST</span>
          </div>

          <button
            onClick={() => {
              setPreselectedJewel(`Private Enclave: ${selectedOption.toUpperCase()}`);
              setAppointmentModalOpen(true);
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#073B32] hover:bg-[#0D6B58] text-white text-[10px] tracking-[0.26em] uppercase font-sans font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-102"
          >
            <Calendar size={13} className="text-[#C6A56B]" />
            <span>REQUEST PRIVATE APPOINTMENT</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
