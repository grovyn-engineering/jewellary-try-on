import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const PendantTransitionSection: React.FC = () => {
  const { openTryOnForProduct, navigate } = useShop();
  const featuredProduct = PRODUCTS.find(p => p.slug === 'noor') || PRODUCTS[0];

  // The 4 metamorphosis states
  const transitionStates = [
    {
      id: 'pendant',
      num: '01',
      title: 'THE PENDANT',
      desc: 'Architectural geometry hand-forged in solid 18K satin gold bezels.',
      image: featuredProduct.images[0],
      badge: 'HIGH JOAILLERIE FORM'
    },
    {
      id: 'stone',
      num: '02',
      title: 'THE STONE',
      desc: '14.82 carats of Colombian Muzo emerald crystal with natural Jardin inclusions.',
      image: featuredProduct.macroImage || featuredProduct.images[1] || featuredProduct.images[0],
      badge: 'UNHEATED NATURE'
    },
    {
      id: 'light',
      num: '03',
      title: 'THE LIGHT',
      desc: 'Ray-traced refractions through 58 brilliant and rose-cut alluvial facets.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      badge: 'DISPERSION & BRILLIANCE'
    },
    {
      id: 'onyou',
      num: '04',
      title: 'ON YOU',
      desc: 'Seamlessly draped across human skin, attuned to personal warmth and posture.',
      image: featuredProduct.modelImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      badge: 'THE LIVING JEWEL'
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const currentItem = transitionStates[activeStep];

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 border-b border-[#272522]/10 overflow-hidden transition-colors duration-1000">
      {/* Background Soft Ray Bath */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(169,139,88,0.04),transparent_80%)]" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">

        {/* =========================================================================
            HEADER: THE CONTINUOUS METAMORPHOSIS TRACK
            PENDANT -> STONE -> LIGHT -> SEE IT ON YOU
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#272522]/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[8.5px] tracking-[0.4em] uppercase text-[#A98B58] font-sans font-medium">
                SCENE 02 • CONTINUITY
              </span>
              <span className="w-6 h-[1px] bg-[#A98B58]/30" />
              <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#6D655B] font-mono">
                METAMORPHOSIS OF THE OBJECT
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#272522] font-light">
              From Mineral Core to Human Form
            </h2>
          </div>

          {/* Interactive 4-Stage Stepper Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {transitionStates.map((state, idx) => (
              <button
                key={state.id}
                onClick={() => setActiveStep(idx)}
                className={`px-3.5 py-2 text-[9px] tracking-[0.2em] uppercase font-sans whitespace-nowrap transition-all border ${activeStep === idx
                    ? 'border-[#272522] bg-[#272522] text-[#FCFAF6] font-medium shadow-xs'
                    : 'border-[#272522]/15 bg-[#FCFAF6] text-[#6D655B] hover:border-[#272522]'
                  }`}
              >
                <span>{state.num} • {state.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SIGNATURE EXPERIENCE: FULL-WIDTH ASYMMETRIC STAGE
            Giant Typography "SEE IT ON YOU" + Interactive Muse Stage
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Monumental Typography & Visual Relationship Story */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 order-2 lg:order-1">
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-mono">
              STAGE {currentItem.num} • {currentItem.badge}
            </span>

            {/* Monumental Typographic Headline */}
            <div className="space-y-1">
              <h3 className="font-serif text-6xl sm:text-7xl md:text-8xl tracking-[-0.02em] text-[#272522] font-light leading-[0.9]">
                SEE IT
              </h3>
              <h3 className="font-serif text-6xl sm:text-7xl md:text-8xl tracking-[-0.02em] text-[#A98B58] font-light italic leading-[0.9]">
                ON YOU.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#6D655B] font-light leading-relaxed max-w-lg">
              High jewellery cannot exist in isolation behind plate glass. It is only realized when resting against the collarbone, absorbing skin temperature, and catching the evening light as you move.
            </p>

            <div className="p-4 sm:p-5 bg-[#F7F3EC] border border-[#272522]/10 space-y-2 max-w-lg">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">
                  {currentItem.title}
                </span>
                <span className="text-[8.5px] font-mono text-[#A98B58]">
                  VERIFIED DIGITAL PROVENANCE
                </span>
              </div>
              <p className="text-xs text-[#6D655B] font-light leading-normal">
                {currentItem.desc}
              </p>
            </div>

            {/* Signature Room Entry CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openTryOnForProduct(featuredProduct)}
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.26em] uppercase font-sans font-medium transition-all duration-300 shadow-md hover:shadow-xl"
                data-cursor="tryon"
              >
                <Sparkles size={14} className="text-[#C9B38A] animate-pulse" />
                <span>ENTER AUREVYA VIRTUAL MIRROR</span>
                <ArrowRight size={13} className="text-[#FCFAF6] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate(`/product/${featuredProduct.slug}`)}
                className="px-5 py-4 border border-[#272522]/20 hover:border-[#272522] text-[#272522] text-[10px] tracking-[0.2em] uppercase font-sans transition-colors"
              >
                DISCOVER DOSSIER
              </button>
            </div>
          </div>

          {/* Right Column: Giant Asymmetric Visual Composition */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-square w-full bg-[#F7F3EC] border border-[#272522]/15 overflow-hidden shadow-sm group">

              {/* Active Stage Image */}
              <ImageWithFallback
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
              />

              {/* Delicate Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#272522]/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Live Badge */}
              <div className="absolute top-5 left-5 bg-[#FCFAF6]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#272522]/10 text-[8.5px] tracking-[0.25em] uppercase font-mono text-[#272522]">
                {currentItem.badge}
              </div>

              {/* Bottom Interactive Metamorphosis Scrub Strip */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[#FCFAF6] z-10">
                <div>
                  <span className="text-[8px] tracking-[0.3em] uppercase block text-[#C9B38A]">
                    METAMORPHOSIS STATE
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-light">
                    {currentItem.title}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {transitionStates.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 transition-all ${activeStep === i ? 'w-6 bg-[#A98B58]' : 'w-2 bg-[#FCFAF6]/40'
                        }`}
                      aria-label={`Go to transition state ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
