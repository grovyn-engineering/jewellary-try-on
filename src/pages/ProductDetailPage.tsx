import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { GemstoneLoupe } from '../components/GemstoneLoupe';
import { ProductCard } from '../components/ProductCard';
import { CompleteTheLookSection } from '../components/CompleteTheLookSection';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  Sparkles,
  Heart,
  Share2,
  Calendar,
  Lock,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Award,
  Maximize2,
  Clock,
  Gem,
  ArrowRight,
  FileText
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openTryOnForProduct,
    setAppointmentModalOpen,
    setPreselectedJewel,
    showToast,
    navigate,
    openProvenance,
    trackProductView,
    setIsCompareOpen,
    openConciergeWithIntent
  } = useShop();

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const isFavorited = isInWishlist(product.id);

  // Track product view for Jewellery DNA synthesis
  React.useEffect(() => {
    trackProductView(product);
  }, [product.id]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoupeOpen, setIsLoupeOpen] = useState(false);

  // Collapsible Dossier State: 'story' | 'stone' | 'craft' | 'details'
  const [expandedSection, setExpandedSection] = useState<string>('story');

  const toggleSection = (id: string) => {
    setExpandedSection(prev => (prev === id ? '' : id));
  };

  const complementaryPieces = PRODUCTS.filter(
    p => p.id !== product.id && (p.collection === product.collection || p.category === product.category)
  ).slice(0, 3);

  return (
    <div className="bg-[#FCFAF6] text-[#272522] min-h-screen pt-24 pb-28 selection:bg-[#A98B58]/20">
      {/* Breadcrumb Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 border-b border-[#272522]/10 text-xs text-[#6D655B] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-[#272522] transition-colors">Flagship</button>
          <span>/</span>
          <button onClick={() => navigate('/collections')} className="hover:text-[#272522] transition-colors">Collections</button>
          <span>/</span>
          <span className="text-[#272522] font-medium truncate max-w-[180px] sm:max-w-none">{product.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.title,
                  text: product.description,
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('Piece link copied to clipboard');
              }
            }}
            className="hover:text-[#272522] flex items-center gap-1 transition-colors"
          >
            <Share2 size={13} />
            <span className="hidden sm:inline uppercase text-[9px] tracking-wider">Share</span>
          </button>
        </div>
      </div>

      {/* Main Digital Private Viewing Room Stage */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Multi-Angle Gallery & Loupe Inspection */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Visual Stage */}
            <div className="relative aspect-square sm:aspect-[4/5] w-full bg-[#F7F3EC] border border-[#272522]/12 overflow-hidden shadow-xs group">
              <ImageWithFallback
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain p-6 sm:p-10 transition-all duration-700 ease-out transform group-hover:scale-102"
              />

              {/* 40x Loupe Magnification Button */}
              <button
                onClick={() => setIsLoupeOpen(true)}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#FCFAF6]/90 border border-[#272522]/15 hover:border-[#A98B58] text-[#272522] text-[9px] tracking-[0.2em] uppercase font-sans font-medium flex items-center gap-1.5 transition-all shadow-xs backdrop-blur-xs"
                data-cursor="pointer"
              >
                <Maximize2 size={12} className="text-[#A98B58]" />
                <span>40x FACET LOUPE</span>
              </button>

              {/* Edition / Atelier Stamp */}
              <div className="absolute bottom-4 left-4 text-[8px] tracking-[0.25em] uppercase font-sans text-[#6D655B] bg-[#FCFAF6]/80 px-2.5 py-1 border border-[#272522]/10 backdrop-blur-xs">
                {product.collection} ARCHIVE • PIÈCE UNIQUE
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`cursor-pointer aspect-square bg-[#F7F3EC] border overflow-hidden p-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#A98B58] shadow-sm'
                      : 'border-[#272522]/10 hover:border-[#272522]/30'
                  }`}
                >
                  <ImageWithFallback src={img} alt={`${product.title} perspective ${idx + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            {/* Atelier Assurance Ribbon */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#F7F3EC] border border-[#272522]/10 text-center">
              <div>
                <ShieldCheck size={16} className="mx-auto text-[#A98B58] mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-[#6D655B] block">CERTIFICATION</span>
                <span className="text-[10px] font-medium text-[#272522]">Dual Gem Lab</span>
              </div>
              <div>
                <Award size={16} className="mx-auto text-[#A98B58] mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-[#6D655B] block">GOLD PURITY</span>
                <span className="text-[10px] font-medium text-[#272522]">{product.goldPurity}</span>
              </div>
              <div>
                <Lock size={16} className="mx-auto text-[#A98B58] mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-[#6D655B] block">LOGISTICS</span>
                <span className="text-[10px] font-medium text-[#272522]">Armored Courier</span>
              </div>
            </div>
          </div>

          {/* Right Column: Piece Dossier, Actions, Accordions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium">
                  {product.collection}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 transition-colors rounded-full border border-[#272522]/10 ${
                    isFavorited ? 'bg-[#A98B58] text-[#FCFAF6]' : 'bg-[#FCFAF6] text-[#6D655B] hover:text-[#A98B58]'
                  }`}
                  aria-label="Save to Private Edit"
                >
                  <Heart size={15} className={isFavorited ? 'fill-current' : ''} />
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#272522] font-light leading-tight mb-2">
                {product.title}
              </h1>

              <p className="font-serif italic text-base text-[#6D655B] mb-4">
                {product.subtitle}
              </p>

              <div className="flex items-baseline justify-between mb-3">
                <div className="font-sans text-2xl sm:text-3xl text-[#272522] font-medium tracking-wide">
                  {product.formattedPrice}
                </div>
                <div className="text-[9px] font-sans tracking-[0.2em] uppercase font-semibold text-[#073B32] bg-[#073B32]/10 px-2.5 py-1">
                  {product.inStock ? 'READY TO SHIP' : 'BY ATELIER ORDER'}
                </div>
              </div>

              {/* Material Highlights Line */}
              <div className="text-xs font-sans text-[#6D655B] font-medium tracking-wider uppercase pb-4 border-b border-[#272522]/10">
                {product.metal} • {product.specs[0]?.weight || product.primaryStone} • {product.certification}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3">
              {product.tryOnCompatible && (
                <button
                  onClick={() => openTryOnForProduct(product)}
                  className="w-full py-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.25em] uppercase font-sans font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                  data-cursor="tryon"
                >
                  <Sparkles size={14} className="text-[#C9B38A]" />
                  <span>SEE IT ON YOU • VIRTUAL MIRROR</span>
                </button>
              )}

              <button
                onClick={() => {
                  addToCart(product, 1);
                  showToast('Added to Salon Bag');
                }}
                className="w-full py-3.5 bg-[#171717] hover:bg-[#272522] text-[#F8F5EE] text-[10px] tracking-[0.22em] uppercase font-sans font-semibold transition-all shadow-xs"
              >
                ACQUIRE FOR SALON BAG
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setPreselectedJewel(product.title);
                    setAppointmentModalOpen(true);
                  }}
                  className="py-3 px-3 border border-[#A98B58] hover:border-[#272522] bg-[#F7F3EC] hover:bg-[#EEE8DE] text-[#272522] text-[9.5px] tracking-[0.18em] uppercase font-sans font-medium flex items-center justify-center gap-1.5 transition-all"
                  data-cursor="pointer"
                >
                  <Calendar size={13} className="text-[#A98B58]" />
                  <span>PRIVATE VIEWING</span>
                </button>

                <button
                  onClick={() => openConciergeWithIntent(`Inquiring about ${product.title} (${product.formattedPrice})`)}
                  className="py-3 px-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] text-[9.5px] tracking-[0.18em] uppercase font-sans font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShieldCheck size={13} className="text-[#A98B58]" />
                  <span>SPEAK TO CONCIERGE</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => openProvenance(product)}
                  className="py-2.5 px-3 border border-[#272522]/15 hover:border-[#A98B58] bg-[#F7F3EC] text-[8.5px] tracking-wider uppercase font-sans text-[#272522] flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText size={11} className="text-[#A98B58]" />
                  <span>PROVENANCE DOSSIER</span>
                </button>
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="py-2.5 px-3 border border-[#272522]/15 hover:border-[#A98B58] bg-[#F7F3EC] text-[8.5px] tracking-wider uppercase font-sans text-[#272522] flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles size={11} className="text-[#A98B58]" />
                  <span>COMPARE CREATIONS</span>
                </button>
              </div>
            </div>

            {/* Collapsible Curatorial Dossier (The Story, The Stone, The Craft, The Details) */}
            <div className="space-y-3 pt-6 border-t border-[#272522]/10">
              {/* 1. THE STORY */}
              <div className="border border-[#272522]/10 bg-[#F7F3EC]">
                <button
                  onClick={() => toggleSection('story')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs tracking-wider uppercase font-sans font-medium text-[#272522]"
                >
                  <span>THE STORY & PROVENANCE</span>
                  {expandedSection === 'story' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {expandedSection === 'story' && (
                  <div className="p-4 pt-0 text-xs text-[#6D655B] font-light leading-relaxed border-t border-[#272522]/5">
                    <p className="mb-2">{product.description}</p>
                    <p className="font-serif italic text-sm text-[#272522] pt-2">
                      Provenance: {product.provenance}
                    </p>
                  </div>
                )}
              </div>

              {/* 2. THE STONE */}
              <div className="border border-[#272522]/10 bg-[#F7F3EC]">
                <button
                  onClick={() => toggleSection('stone')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs tracking-wider uppercase font-sans font-medium text-[#272522]"
                >
                  <span>THE STONE SPECIFICATIONS</span>
                  {expandedSection === 'stone' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {expandedSection === 'stone' && (
                  <div className="p-4 pt-0 text-xs text-[#6D655B] space-y-2 border-t border-[#272522]/5">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-[#272522]/5">
                        <span className="text-[#272522] font-medium">{spec.type} ({spec.cut})</span>
                        <span className="text-[#A98B58]">{spec.weight}</span>
                      </div>
                    ))}
                    <div className="pt-2 flex justify-between">
                      <span className="uppercase text-[9px] tracking-wider text-[#6D655B]">Total Weight</span>
                      <span className="text-[#272522] font-medium">{product.totalWeight}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. THE CRAFT */}
              <div className="border border-[#272522]/10 bg-[#F7F3EC]">
                <button
                  onClick={() => toggleSection('craft')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs tracking-wider uppercase font-sans font-medium text-[#272522]"
                >
                  <span>THE ATELIER CRAFT</span>
                  {expandedSection === 'craft' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {expandedSection === 'craft' && (
                  <div className="p-4 pt-0 text-xs text-[#6D655B] font-light leading-relaxed border-t border-[#272522]/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Craftsmanship Bench Hours:</span>
                      <span className="text-[#A98B58] font-medium">{product.craftsmanshipHours} hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Gold Hallmarking:</span>
                      <span className="text-[#272522] font-medium">BIS Certified ({product.goldPurity})</span>
                    </div>
                    <p className="pt-2 text-[11px]">
                      Hand-sculpted using traditional Kundan wax moulding and flush pavé setting. Each setting claw is individually shaped to match the stone's crystalline perimeter.
                    </p>
                  </div>
                )}
              </div>

              {/* 4. THE DETAILS */}
              <div className="border border-[#272522]/10 bg-[#F7F3EC]">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs tracking-wider uppercase font-sans font-medium text-[#272522]"
                >
                  <span>ACQUISITION & LOGISTICS</span>
                  {expandedSection === 'details' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {expandedSection === 'details' && (
                  <div className="p-4 pt-0 text-xs text-[#6D655B] font-light leading-relaxed border-t border-[#272522]/5 space-y-1.5">
                    <p>• Complimentary presentation trunk in solid warm ivory oak and brushed brass.</p>
                    <p>• Sealed provenance portfolio including gemmological certificates and gouache sketch.</p>
                    <p>• Armored transit with diplomatic insurance worldwide.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete The Look: Parure Styling Composition */}
        <CompleteTheLookSection currentProduct={product} />

        {/* Complementary Creations Section */}
        {complementaryPieces.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#272522]/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium block mb-1">
                  CURATED PARURE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#272522] font-light">
                  Complementary Creations
                </h3>
              </div>
              <button
                onClick={() => navigate('/collections')}
                className="inline-flex items-center gap-1.5 text-xs text-[#272522] hover:text-[#A98B58] font-sans uppercase tracking-wider"
              >
                <span>Full Archive</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {complementaryPieces.map(piece => (
                <ProductCard key={piece.id} product={piece} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar (Section 39) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#FCFAF6]/95 border-t border-[#272522]/10 backdrop-blur-md flex items-center gap-2 z-30 shadow-lg">
        {product.tryOnCompatible && (
          <button
            onClick={() => openTryOnForProduct(product)}
            className="flex-1 py-3 bg-[#272522] text-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans font-medium flex items-center justify-center gap-1.5"
          >
            <Sparkles size={11} className="text-[#C9B38A]" />
            <span>SEE IT ON YOU</span>
          </button>
        )}
        <button
          onClick={() => {
            setPreselectedJewel(product.title);
            setAppointmentModalOpen(true);
          }}
          className="flex-1 py-3 border border-[#A98B58] bg-[#F7F3EC] text-[#272522] text-[9px] tracking-wider uppercase font-sans font-medium text-center"
        >
          PRIVATE VIEWING
        </button>
      </div>

      {/* Gemstone Loupe Modal */}
      <GemstoneLoupe
        isOpen={isLoupeOpen}
        onClose={() => setIsLoupeOpen(false)}
        imageUrl={product.images[selectedImageIndex] || product.images[0]}
        macroUrl={product.macroImage}
        title={product.title}
        specsSubtitle={product.specs[0]?.type}
      />
    </div>
  );
};
