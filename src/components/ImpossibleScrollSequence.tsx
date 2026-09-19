import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Calendar, ArrowRight, Eye, Layers } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface SequenceStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  craftDetail: string;
  ctaText?: string;
}

const SEQUENCE_STAGES: SequenceStage[] = [
  {
    step: '1',
    title: 'THE ROUGH CRYSTAL',
    subtitle: 'Muzo Mountain Geologic Genesis',
    description: 'Subterranean hydrothermal emerald crystal formed 65 million years ago, harboring an ancient jardin of liquid and brine.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85',
    craftDetail: 'Chromium-rich beryl crystal with natural untreated hexagonal prisms.'
  },
  {
    step: '2',
    title: 'THE ARCHITECTURAL SKETCH',
    subtitle: 'Gouache on Vellum Watermark',
    description: 'Rendered at 1:1 scale by our Haute Joaillerie Art Director, mapping light refraction angles and concealed gold articulation joints.',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1600&q=85',
    craftDetail: 'Four weeks of mathematical draftsmanship to achieve perfect neckline contour.'
  },
  {
    step: '3',
    title: 'THE ATELIER BENCH',
    subtitle: 'Forging 22K Solid Gold & 950 Platinum',
    description: 'Master goldsmiths beat and pierce the gold by hand, chasing microscopic jaali patterns into each articulating link.',
    image: 'https://images.unsplash.com/photo-1611591475825-412f86641847?auto=format&fit=crop&w=1600&q=85',
    craftDetail: 'Over 740 hours of solitary handcraft with traditional charcoal blowpipe annealing.'
  },
  {
    step: '4',
    title: 'THE MASTERWORK COMPLETED',
    subtitle: 'The Noor-E-Nizam Haute Collar',
    description: 'Set with 42.8 carats of Muzo emeralds and 58 carats of Syndicate uncut Polki diamonds, crowned with Basra pearl drops.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=85',
    craftDetail: 'Dual certified by SSEF Swiss Gemmological Institute & GIA.'
  },
  {
    step: '5',
    title: 'BECOMING YOURS',
    subtitle: 'The AI Virtual Mirror Simulation',
    description: 'Real-time drape simulation projects how the 165g collar articulates against your collarbone and catches salon daylight.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    craftDetail: 'Calculated in browser sub-second with lighting modulation.'
  },
  {
    step: '6',
    title: 'THE PRIVATE VIEWING',
    subtitle: 'Audience in our Confidential Salon',
    description: 'The physical creation is transported by secure courier to your chosen private salon suite for personal fitting and champagne.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85',
    craftDetail: 'Confidential salon reservation with Master Gemmologist in attendance.'
  }
];

export const ImpossibleScrollSequence: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { openTryOnForProduct, setAppointmentModalOpen, PRODUCTS } = useShop();

  const current = SEQUENCE_STAGES[activeStep];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F7F3EC] border-y border-[#272522]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#272522]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers size={14} className="text-[#A98B58]" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
                THE GENEALOGY OF A MASTERWORK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light">
              From Geologic Core to Salon Audience
            </h2>
            <p className="text-xs text-[#6D655B] font-light mt-1">
              Follow a singular jewel from ancient earth to your personal silhouette.
            </p>
          </div>

          {/* Step Timeline Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {SEQUENCE_STAGES.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 text-[8px] tracking-wider uppercase font-sans transition-all whitespace-nowrap ${
                  activeStep === idx
                    ? 'bg-[#272522] text-[#FCFAF6]'
                    : 'bg-[#FCFAF6] text-[#6D655B] hover:text-[#272522] border border-[#272522]/10'
                }`}
              >
                {s.step} • {s.title.split(' ')[1] || s.title}
              </button>
            ))}
          </div>
        </div>

        {/* The Stage Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FCFAF6] border border-[#272522]/15 p-6 sm:p-12 shadow-sm">
          {/* Visual Container */}
          <div className="lg:col-span-7 relative aspect-[16/11] overflow-hidden bg-[#EEE8DE] border border-[#272522]/10 shadow-xs">
            <ImageWithFallback
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute top-4 left-4 bg-[#FCFAF6]/90 px-3 py-1 border border-[#272522]/10 text-[9px] tracking-widest uppercase font-sans text-[#272522] font-medium">
              STAGE {current.step} OF 06
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-[#272522]/85 text-[#FCFAF6] p-3 text-xs font-serif italic border border-[#A98B58]/30">
              "{current.craftDetail}"
            </div>
          </div>

          {/* Narrative & Interactive Progress */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                {current.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light mb-4 leading-tight">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6D655B] font-light leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            {/* Step Navigation Controls */}
            <div className="space-y-4 pt-4 border-t border-[#272522]/10">
              <div className="flex items-center justify-between text-[9px] tracking-wider uppercase font-sans text-[#6D655B]">
                <span>STAGE TRANSITION</span>
                <span>{activeStep + 1} / {SEQUENCE_STAGES.length}</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1 bg-[#272522]/10 overflow-hidden">
                <div
                  className="h-full bg-[#A98B58] transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / SEQUENCE_STAGES.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="flex-1 py-3 border border-[#272522]/20 hover:border-[#272522] text-[#272522] text-[9px] tracking-widest uppercase font-sans"
                  >
                    PREVIOUS STAGE
                  </button>
                )}

                {activeStep < SEQUENCE_STAGES.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="flex-1 py-3 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-widest uppercase font-sans font-medium flex items-center justify-center gap-2"
                  >
                    <span>NEXT STAGE</span>
                    <ArrowRight size={12} />
                  </button>
                ) : (
                  <button
                    onClick={() => setAppointmentModalOpen(true)}
                    className="flex-1 py-3 bg-[#A98B58] hover:bg-[#8F7445] text-[#FCFAF6] text-[9px] tracking-widest uppercase font-sans font-medium flex items-center justify-center gap-2"
                  >
                    <Calendar size={12} />
                    <span>RESERVE SALON AUDIENCE</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
