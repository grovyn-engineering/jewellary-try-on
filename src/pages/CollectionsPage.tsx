import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { Sparkles, SlidersHorizontal, X, ArrowLeft, Check, RotateCcw } from 'lucide-react';

interface CollectionsPageProps {
  initialCategory?: string;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ initialCategory = 'all' }) => {
  const { navigate } = useShop();

  // Primary Category Filter (mapped from URL or clicked pill)
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  
  // Granular Filters
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const [activeStone, setActiveStone] = useState<string>('all');
  const [activeMetal, setActiveMetal] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [readyToShipOnly, setReadyToShipOnly] = useState<boolean>(false);
  const [tryOnOnly, setTryOnOnly] = useState<boolean>(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  
  // Sort
  const [sortBy, setSortBy] = useState<'rarity' | 'price-desc' | 'price-asc' | 'hours'>('rarity');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'high-jewellery', label: 'High Jewellery' },
    { id: 'rings', label: 'Rings' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'bracelets', label: 'Bracelets & Bangles' },
    { id: 'solitaire', label: 'Solitaires' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'gemstones', label: 'Rare Gemstones' }
  ];

  const collections = [
    { id: 'all', label: 'All Collections' },
    { id: 'IMPERIAL HERITAGE', label: 'Imperial Heritage' },
    { id: 'ROYAL DYNASTY', label: 'Royal Dynasty' },
    { id: 'GOLCONDA SOVEREIGN', label: 'Golconda Sovereign' },
    { id: 'ESPERIA ARCHITECTURE', label: 'Esperia Architecture' },
    { id: 'ALLUVIAL', label: 'Alluvial' }
  ];

  const stones = [
    { id: 'all', label: 'All Stones' },
    { id: 'Emerald', label: 'Muzo Emerald' },
    { id: 'Diamond', label: 'Rare Diamond' },
    { id: 'Polki', label: 'Uncut Polki' },
    { id: 'Basra Pearl', label: 'Natural Pearl' },
    { id: 'Burmese Ruby', label: 'Burma Ruby' },
    { id: 'Kashmir Sapphire', label: 'Kashmir Sapphire' }
  ];

  const metals = [
    { id: 'all', label: 'All Metals' },
    { id: '18K Yellow Gold', label: '18K Yellow Gold' },
    { id: '18K Rose Gold', label: '18K Rose Gold' },
    { id: 'Platinum', label: 'Platinum' },
    { id: '22K Gold', label: '22K Imperial Gold' }
  ];

  const priceRanges = [
    { id: 'all', label: 'All Valuations' },
    { id: 'under-15l', label: 'Under ₹15,00,000' },
    { id: '15l-30l', label: '₹15,00,000 to ₹30,00,000' },
    { id: 'above-30l', label: '₹30,00,000 and Above' }
  ];

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (activeCollection !== 'all') count++;
    if (activeStone !== 'all') count++;
    if (activeMetal !== 'all') count++;
    if (priceRange !== 'all') count++;
    if (readyToShipOnly) count++;
    if (tryOnOnly) count++;
    return count;
  }, [activeCategory, activeCollection, activeStone, activeMetal, priceRange, readyToShipOnly, tryOnOnly]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveCollection('all');
    setActiveStone('all');
    setActiveMetal('all');
    setPriceRange('all');
    setReadyToShipOnly(false);
    setTryOnOnly(false);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      const catKey = activeCategory.toLowerCase();
      if (catKey === 'bracelets') {
        list = list.filter(p => (p.category as string) === 'bracelets' || (p.category as string) === 'bangles' || p.title.toLowerCase().includes('bracelet') || p.title.toLowerCase().includes('bangle') || p.title.toLowerCase().includes('cuff'));
      } else if (catKey === 'gemstones') {
        list = list.filter(p => p.primaryStone !== 'Diamond');
      } else if (catKey === 'solitaire') {
        list = list.filter(p => p.title.toLowerCase().includes('solitaire') || (p.category as string) === 'solitaires' || p.primaryStone === 'Diamond');
      } else if (catKey === 'rings') {
        list = list.filter(p => (p.category as string) === 'rings' || p.title.toLowerCase().includes('ring'));
      } else if (catKey === 'earrings') {
        list = list.filter(p => (p.category as string) === 'earrings' || p.title.toLowerCase().includes('earring') || p.title.toLowerCase().includes('drop'));
      } else if (catKey === 'necklaces') {
        list = list.filter(p => (p.category as string) === 'necklaces' || (p.category as string) === 'high-jewellery' || p.title.toLowerCase().includes('necklace') || p.title.toLowerCase().includes('collar') || p.title.toLowerCase().includes('choker'));
      } else {
        list = list.filter(p => (p.category as string) === catKey || (p.category as string).includes(catKey));
      }
    }

    // Collection filter
    if (activeCollection !== 'all') {
      list = list.filter(p => p.collection.toUpperCase() === activeCollection.toUpperCase());
    }

    // Stone filter
    if (activeStone !== 'all') {
      list = list.filter(p => p.primaryStone === activeStone);
    }

    // Metal filter
    if (activeMetal !== 'all') {
      list = list.filter(p => p.metal.toLowerCase().includes(activeMetal.toLowerCase().split(' ')[0]));
    }

    // Price range
    if (priceRange === 'under-15l') {
      list = list.filter(p => p.price < 1500000);
    } else if (priceRange === '15l-30l') {
      list = list.filter(p => p.price >= 1500000 && p.price <= 3000000);
    } else if (priceRange === 'above-30l') {
      list = list.filter(p => p.price > 3000000);
    }

    // Ready to ship
    if (readyToShipOnly) {
      list = list.filter(p => p.inStock);
    }

    // Try-On compatible
    if (tryOnOnly) {
      list = list.filter(p => p.tryOnCompatible);
    }

    // Sorting
    if (sortBy === 'rarity') {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'hours') {
      list.sort((a, b) => b.craftsmanshipHours - a.craftsmanshipHours);
    }

    return list;
  }, [activeCategory, activeCollection, activeStone, activeMetal, priceRange, readyToShipOnly, tryOnOnly, sortBy]);

  return (
    <div className="bg-[#F8F5EE] text-[#171717] min-h-screen pt-24 pb-28">
      
      {/* Back to AUREVYA Home & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-4 pb-2">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-[#5F5A52]">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#171717] transition-colors flex items-center gap-1 group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform text-[#A98B58]" />
            <span>AUREVYA</span>
          </button>
          <span>/</span>
          <span className="text-[#171717] font-medium">COLLECTIONS</span>
          {activeCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#A98B58]">{categories.find(c => c.id === activeCategory)?.label || activeCategory}</span>
            </>
          )}
        </div>
      </div>

      {/* Header Editorial Presentation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 border-b border-[#171717]/10">
        <div className="max-w-3xl">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-semibold block mb-2">
            THE DIGITAL SALON ARCHIVE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171717] font-light leading-tight mb-4">
            Curated High Jewellery
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#5F5A52] font-light leading-relaxed">
            Every creation is registered in the permanent House Ledger, set with certified sovereign gemstones and forged by master goldsmiths across hundreds of dedicated bench hours.
          </p>
        </div>
      </div>

      {/* Primary Category Switcher Horizontal Rail */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 border-b border-[#171717]/10 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[9.5px] tracking-[0.2em] uppercase font-sans whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-[#171717] text-[#F8F5EE] border-[#171717] font-medium shadow-xs'
                  : 'bg-[#FCFAF6] text-[#5F5A52] border-[#171717]/15 hover:border-[#171717] hover:text-[#171717]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control Strip: Filter Drawer Toggle, Quick Toggles & Sorting */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#171717]/8">
        
        {/* Left: Filter Toggle & Quick Checkboxes */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-[9.5px] tracking-[0.2em] uppercase font-sans border transition-all ${
              isFilterPanelOpen || activeFilterCount > 0
                ? 'border-[#A98B58] bg-[#F1EEE7] text-[#171717] font-medium'
                : 'border-[#171717]/20 bg-[#FCFAF6] text-[#5F5A52] hover:border-[#171717]'
            }`}
          >
            <SlidersHorizontal size={12} className="text-[#A98B58]" />
            <span>ALL FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#171717] text-[#F8F5EE] text-[8px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick AI Try-On Toggle */}
          <button
            onClick={() => setTryOnOnly(!tryOnOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-[9px] tracking-[0.16em] uppercase font-sans border transition-all ${
              tryOnOnly
                ? 'border-[#073B32] bg-[#073B32] text-white font-medium'
                : 'border-[#171717]/15 bg-[#FCFAF6] text-[#5F5A52] hover:border-[#171717]'
            }`}
          >
            <Sparkles size={11} className={tryOnOnly ? 'text-[#C6A56B]' : 'text-[#A98B58]'} />
            <span>AI TRY-ON AVAILABLE</span>
          </button>

          {/* Quick Ready to Ship Toggle */}
          <button
            onClick={() => setReadyToShipOnly(!readyToShipOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-[9px] tracking-[0.16em] uppercase font-sans border transition-all ${
              readyToShipOnly
                ? 'border-[#171717] bg-[#171717] text-white font-medium'
                : 'border-[#171717]/15 bg-[#FCFAF6] text-[#5F5A52] hover:border-[#171717]'
            }`}
          >
            <Check size={11} />
            <span>READY TO SHIP</span>
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="text-[9px] font-sans tracking-wider uppercase text-[#A98B58] hover:text-[#171717] flex items-center gap-1 pl-2 transition-colors"
            >
              <RotateCcw size={10} />
              <span>CLEAR FILTERS</span>
            </button>
          )}
        </div>

        {/* Right: Piece Count & Sort */}
        <div className="flex items-center gap-4 text-[10px] font-sans text-[#5F5A52]">
          <span className="hidden sm:inline font-medium text-[#171717]">
            {filteredProducts.length} CREATIONS
          </span>

          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider text-[9px]">SORT:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'rarity', label: 'CURATED' },
                { id: 'price-desc', label: 'PRICE: HIGH' },
                { id: 'price-asc', label: 'PRICE: LOW' },
                { id: 'hours', label: 'ATELIER HOURS' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-2.5 py-1 text-[8.5px] tracking-wider uppercase border transition-all ${
                    sortBy === s.id
                      ? 'border-[#171717] bg-[#171717] text-white font-medium'
                      : 'border-transparent text-[#5F5A52] hover:text-[#171717]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Expanded Granular Filter Drawer / Panel */}
      {isFilterPanelOpen && (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 bg-[#F1EEE7] border-b border-[#171717]/12 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Filter 1: Collection */}
            <div className="space-y-2">
              <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#A98B58] font-semibold block">
                COLLECTION
              </span>
              <div className="flex flex-wrap gap-1.5">
                {collections.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCollection(c.id)}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans border transition-all ${
                      activeCollection === c.id
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-[#FCFAF6] text-[#5F5A52] border-[#171717]/12 hover:border-[#171717]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Gemstone */}
            <div className="space-y-2">
              <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#A98B58] font-semibold block">
                GEMSTONE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stones.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStone(s.id)}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans border transition-all ${
                      activeStone === s.id
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-[#FCFAF6] text-[#5F5A52] border-[#171717]/12 hover:border-[#171717]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Precious Metal */}
            <div className="space-y-2">
              <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#A98B58] font-semibold block">
                PRECIOUS METAL
              </span>
              <div className="flex flex-wrap gap-1.5">
                {metals.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMetal(m.id)}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans border transition-all ${
                      activeMetal === m.id
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-[#FCFAF6] text-[#5F5A52] border-[#171717]/12 hover:border-[#171717]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 4: Valuation Range */}
            <div className="space-y-2">
              <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#A98B58] font-semibold block">
                VALUATION
              </span>
              <div className="flex flex-wrap gap-1.5">
                {priceRanges.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPriceRange(p.id)}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans border transition-all ${
                      priceRange === p.id
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-[#FCFAF6] text-[#5F5A52] border-[#171717]/12 hover:border-[#171717]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-serif text-2xl text-[#171717] font-light">
              No creations match your current criteria
            </h3>
            <p className="font-sans text-xs text-[#5F5A52] font-light leading-relaxed">
              We invite you to reset your selected filters or contact our Concierge Desk for a bespoke atelier commission.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-3 border border-[#171717] text-[9.5px] uppercase tracking-widest font-sans font-medium hover:bg-[#171717] hover:text-[#F8F5EE] transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Virtual Fitting Teaser Bar */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="border border-[#171717]/12 bg-[#FCFAF6] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-[8.5px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-semibold block">
              THE AUREVYA MIRROR
            </span>
            <h3 className="font-serif text-2xl text-[#171717] font-light">
              Preview Any Creation on Your Silhouette
            </h3>
            <p className="font-sans text-xs text-[#5F5A52] font-light">
              Experience real-time anatomical drape and ambient daylight calibration with our neural fitting camera.
            </p>
          </div>
          <button
            onClick={() => navigate('/ai-try-on')}
            className="px-6 py-3.5 bg-[#171717] hover:bg-[#272522] text-[#F8F5EE] text-[9.5px] tracking-wider uppercase font-sans font-semibold whitespace-nowrap flex items-center gap-2 shadow-sm"
          >
            <Sparkles size={12} className="text-[#C6A56B]" />
            <span>ENTER VIRTUAL MIRROR</span>
          </button>
        </div>
      </div>

    </div>
  );
};
