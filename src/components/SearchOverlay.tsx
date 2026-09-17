import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.primaryStone.toLowerCase().includes(q) ||
      p.metal.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (q.includes('10') && p.price < 1000000) ||
      (q.includes('emerald') && p.primaryStone === 'Emerald') ||
      (q.includes('solitaire') && p.category === 'solitaires') ||
      (q.includes('bridal') && p.category === 'bridal')
    );
  }, [query]);

  const suggestedSearches = [
    'Emerald necklaces',
    'Bridal regalia',
    'Solitaire rings',
    'Bespoke commissions',
    'Basra pearls'
  ];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#272522]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-3xl bg-[#FCFAF6] border border-[#272522]/15 shadow-2xl p-6 sm:p-10 z-10 text-[#272522]">
        {/* Search Bar Input */}
        <div className="flex items-center justify-between border-b border-[#A98B58] pb-3 mb-6">
          <div className="flex items-center gap-3 flex-grow">
            <Search size={20} className="text-[#A98B58]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by gem, cut, collection, or motif..."
              className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#272522] placeholder-[#6D655B]/50 outline-none font-light"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#6D655B] hover:text-[#272522] transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Suggested Queries */}
        {!query.trim() && (
          <div className="py-4">
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
              SUGGESTED ENQUIRIES
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedSearches.map(item => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1.5 border border-[#272522]/15 bg-[#F7F3EC] hover:border-[#A98B58] text-[10px] text-[#6D655B] hover:text-[#272522] font-sans transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() && (
          <div>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#6D655B] font-sans block mb-4">
              FOUND {filteredProducts.length} CREATIONS IN THE ARCHIVE
            </span>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-1">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/product/${product.slug}`);
                    }}
                    className="cursor-pointer flex gap-3 p-3 bg-[#F7F3EC] border border-[#272522]/10 hover:border-[#A98B58] transition-all group"
                  >
                    <div className="w-16 h-16 bg-[#EEE8DE] overflow-hidden flex-shrink-0">
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="overflow-hidden flex flex-col justify-center">
                      <span className="text-[8px] tracking-widest uppercase text-[#A98B58] font-sans font-medium">
                        {product.collection}
                      </span>
                      <h4 className="font-serif text-sm text-[#272522] truncate group-hover:text-[#A98B58]">
                        {product.title}
                      </h4>
                      <span className="font-serif text-xs text-[#272522] mt-0.5 font-medium">
                        {product.formattedPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[#6D655B]">
                <p className="font-serif text-lg text-[#272522] mb-1">No archive creations matched "{query}".</p>
                <p className="text-xs font-light">Try searching for "Emerald", "Diamond", or "Solitaire".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
