import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, X, Sparkles, ArrowRight, ShieldCheck, Compass, MapPin, Phone } from 'lucide-react';

interface PreviewInfo {
  tag: string;
  title: string;
  subtitle: string;
  image: string;
}

export const LuxuryHeader: React.FC = () => {
  const {
    currentPath,
    navigate,
    wishlist,
    cartItemCount,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    setAppointmentModalOpen,
    setIsConciergeOpen,
    openConciergeWithIntent,
    atmosphereGemstone
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [editorialMenuOpen, setEditorialMenuOpen] = useState(false);

  // Active hover preview state for the menu
  const [activePreview, setActivePreview] = useState<PreviewInfo>({
    tag: 'HIGH JEWELLERY',
    title: 'The Noor-E-Nizam',
    subtitle: '14.82 ct Colombian Muzo Emerald, 340 Atelier Hours',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isInternalPage = currentPath !== '/';

  // Preview presets when hovering menu items
  const setPreview = (category: string) => {
    switch (category) {
      case 'HIGH_JEWELLERY':
        setActivePreview({
          tag: 'PIÈCES UNIQUES',
          title: 'Imperial Regalia & Colliers',
          subtitle: 'Certified Colombian emeralds and Golconda water diamonds',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      case 'COLLECTIONS':
        setActivePreview({
          tag: 'COLLECTIONS',
          title: 'The Sovereign & Esperia Edits',
          subtitle: 'Contemporary architectural high jewellery for modern gala',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      case 'TRY_ON':
        setActivePreview({
          tag: 'SEE IT ON YOU',
          title: 'AI Haute Fitting Mirror',
          subtitle: 'Real-time anatomical draping of high jewellery colliers and solitaires',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      case 'BESPOKE':
        setActivePreview({
          tag: 'THE ATELIER',
          title: 'Bespoke Private Commissions',
          subtitle: 'From initial gouache rendering to permanent touchmark',
          image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      case 'RINGS':
        setActivePreview({
          tag: 'SOLITAIRE & RINGS',
          title: 'Sovereign Ring Architecture',
          subtitle: 'Micro-bezel settings with flawless center gems',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      case 'EARRINGS':
        setActivePreview({
          tag: 'EAR PIECES',
          title: 'Chandelier Drops & Studs',
          subtitle: 'Cascading briolette emeralds and natural Basra pearls',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      case 'THE_HOUSE':
        setActivePreview({
          tag: 'HERITAGE',
          title: 'The House of Aurevya',
          subtitle: 'Where Golconda diamond heritage meets Parisian architectural discipline',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
        });
        break;
      default:
        break;
    }
  };

  const handleNav = (path: string) => {
    setEditorialMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Global Editorial Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 px-6 md:px-12 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#171717]/10 shadow-[0_4px_24px_rgba(23,23,23,0.04)]'
            : 'py-6 px-6 md:px-12 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Left: MENU trigger & optional internal breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditorialMenuOpen(true)}
              className="group flex items-center gap-2.5 text-[10px] tracking-[0.28em] uppercase font-sans font-medium text-[#171717] hover:text-[#A98B58] transition-colors py-1.5"
              aria-label="Open House Menu"
            >
              <span className="w-5 h-[1.5px] bg-[#171717] group-hover:w-7 group-hover:bg-[#A98B58] transition-all duration-300" />
              <span>MENU</span>
            </button>

            {/* Back to AUREVYA indicator on internal pages */}
            {isInternalPage && (
              <button
                onClick={() => navigate('/')}
                className="hidden sm:inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-sans text-[#5F5A52] hover:text-[#171717] transition-colors pl-3 border-l border-[#171717]/15 group"
                title="Return to Aurevya Home"
              >
                <span className="text-[#A98B58] group-hover:-translate-x-0.5 transition-transform">←</span>
                <span>HOME</span>
              </button>
            )}

            {atmosphereGemstone && !isInternalPage && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[8.5px] tracking-[0.2em] uppercase text-[#5F5A52] pl-4 border-l border-[#171717]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A98B58] animate-pulse" />
                <span>SALON: {atmosphereGemstone}</span>
              </span>
            )}
          </div>

          {/* Center: AUREVYA Wordmark (Clicking returns to home) */}
          <div
            onClick={() => navigate('/')}
            className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer group py-1 select-none"
            title="Aurevya Haute Joaillerie • Return to Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-light text-[#171717] block leading-none transition-all duration-300 group-hover:scale-103 group-hover:text-[#A98B58]">
              AUREVYA
            </span>
            <span className="text-[7.5px] tracking-[0.45em] uppercase text-[#A98B58] font-sans block mt-1">
              HAUTE JOAILLERIE
            </span>
          </div>

          {/* Right Actions: SEARCH, PRIVATE EDIT, SEE IT ON YOU, BAG */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-[9.5px] tracking-[0.22em] uppercase font-sans text-[#5F5A52] hover:text-[#171717] transition-colors py-1"
              aria-label="Search Collection"
            >
              <Search size={13} className="text-[#171717]" />
              <span className="hidden md:inline">SEARCH</span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center gap-1.5 text-[9.5px] tracking-[0.22em] uppercase font-sans text-[#5F5A52] hover:text-[#171717] transition-colors py-1"
              aria-label="Private Edit Wishlist"
            >
              <Heart size={14} className={wishlist.length > 0 ? 'fill-[#A98B58] text-[#A98B58]' : 'text-[#171717]'} />
              <span className="hidden md:inline">PRIVATE EDIT</span>
              {wishlist.length > 0 && (
                <span className="text-[9px] font-sans text-[#A98B58] font-semibold">({wishlist.length})</span>
              )}
            </button>

            {/* Signature Try-On CTA */}
            <button
              onClick={() => navigate('/ai-try-on')}
              className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#171717] hover:bg-[#272522] text-[#F8F5EE] text-[9px] sm:text-[9.5px] tracking-[0.24em] uppercase font-sans font-medium transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <Sparkles size={11} className="text-[#C6A56B] animate-pulse" />
              <span>SEE IT ON YOU</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 text-[#171717] hover:text-[#A98B58] transition-colors relative"
              aria-label="Salon Bag"
            >
              <ShoppingBag size={15} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A98B58] text-[#F8F5EE] text-[8px] font-sans flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Private Maison Navigation Canvas */}
      {editorialMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F8F5EE] text-[#171717] flex flex-col justify-between p-6 sm:p-10 md:p-14 animate-in fade-in duration-300 overflow-y-auto">
          
          {/* Menu Top Bar: Return to Home Wordmark & Close Button */}
          <div className="flex items-center justify-between border-b border-[#171717]/10 pb-5">
            <div
              onClick={() => handleNav('/')}
              className="cursor-pointer group select-none"
              title="Return to Aurevya Home"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#171717] font-light group-hover:text-[#A98B58] transition-colors">
                AUREVYA
              </span>
              <span className="text-[7.5px] tracking-[0.45em] uppercase text-[#A98B58] font-sans block">
                HAUTE JOAILLERIE
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="hidden md:inline text-[9px] tracking-[0.28em] uppercase font-sans text-[#5F5A52]">
                PRIVATE SALON DIRECTORY
              </span>
              <button
                onClick={() => setEditorialMenuOpen(false)}
                className="group flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-[#171717] hover:text-[#A98B58] transition-colors py-2 px-3 border border-[#171717]/15 hover:border-[#A98B58] bg-[#FCFAF6]"
              >
                <span>CLOSE</span>
                <X size={16} className="transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>
          </div>

          {/* Menu Center Stage: 5 Structured Columns + Dynamic Visual Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 my-auto">
            
            {/* Columns 1-4: The 5 Human Brand Categories */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
              
              {/* 1. DISCOVER */}
              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-semibold block border-b border-[#171717]/10 pb-2">
                  DISCOVER
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#171717]">
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => handleNav('/collections?filter=new')}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      New Arrivals
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('HIGH_JEWELLERY')}
                      onClick={() => handleNav('/collections/high-jewellery')}
                      className="hover:text-[#A98B58] transition-colors text-left font-medium text-[#073B32]"
                    >
                      High Jewellery
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => handleNav('/collections')}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      Collections
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('HIGH_JEWELLERY')}
                      onClick={() => handleNav('/collections?filter=bestsellers')}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      Best Sellers
                    </button>
                  </li>
                </ul>
              </div>

              {/* 2. SHOP */}
              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-semibold block border-b border-[#171717]/10 pb-2">
                  SHOP
                </span>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#171717] font-light">
                  <li>
                    <button
                      onMouseEnter={() => setPreview('RINGS')}
                      onClick={() => handleNav('/collections/rings')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Rings
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('EARRINGS')}
                      onClick={() => handleNav('/collections/earrings')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Earrings
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('HIGH_JEWELLERY')}
                      onClick={() => handleNav('/collections/necklaces')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Necklaces
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => handleNav('/collections/bracelets')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Bracelets
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => handleNav('/collections/bangles')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Bangles
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('HIGH_JEWELLERY')}
                      onClick={() => handleNav('/collections/sets')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      High Sets
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('RINGS')}
                      onClick={() => handleNav('/collections/solitaire')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Solitaire
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => handleNav('/collections/bridal')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Bridal
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('HIGH_JEWELLERY')}
                      onClick={() => handleNav('/collections/gemstones')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Gemstones
                    </button>
                  </li>
                </ul>
              </div>

              {/* 3. EXPERIENCE */}
              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-semibold block border-b border-[#171717]/10 pb-2">
                  EXPERIENCE
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#171717]">
                  <li>
                    <button
                      onMouseEnter={() => setPreview('TRY_ON')}
                      onClick={() => handleNav('/ai-try-on')}
                      className="hover:text-[#A98B58] transition-colors text-left font-medium flex items-center gap-1.5 text-[#073B32]"
                    >
                      <Sparkles size={12} className="text-[#A98B58]" />
                      <span>See It On You</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('TRY_ON')}
                      onClick={() => handleNav('/ai-try-on')}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      AI Jewellery Mirror
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => {
                        setEditorialMenuOpen(false);
                        setIsWishlistOpen(true);
                      }}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      Build Your Private Edit
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('BESPOKE')}
                      onClick={() => handleNav('/bespoke')}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      Bespoke Atelier
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('THE_HOUSE')}
                      onClick={() => {
                        setEditorialMenuOpen(false);
                        setAppointmentModalOpen(true);
                      }}
                      className="hover:text-[#A98B58] transition-colors text-left font-light"
                    >
                      Book a Private Viewing
                    </button>
                  </li>
                </ul>
              </div>

              {/* 4. THE HOUSE */}
              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-semibold block border-b border-[#171717]/10 pb-2">
                  THE HOUSE
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#171717] font-light">
                  <li>
                    <button
                      onMouseEnter={() => setPreview('THE_HOUSE')}
                      onClick={() => handleNav('/the-house')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Our Story
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('BESPOKE')}
                      onClick={() => handleNav('/atelier')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      Craftsmanship
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('HIGH_JEWELLERY')}
                      onClick={() => handleNav('/the-house#stones')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      The Sovereign Stones
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('BESPOKE')}
                      onClick={() => handleNav('/atelier')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      The Atelier
                    </button>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setPreview('THE_HOUSE')}
                      onClick={() => handleNav('/journal')}
                      className="hover:text-[#A98B58] transition-colors text-left"
                    >
                      The Gazette & Journal
                    </button>
                  </li>
                </ul>
              </div>

              {/* 5. ASSIST */}
              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-semibold block border-b border-[#171717]/10 pb-2">
                  ASSIST
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#171717] font-light">
                  <li>
                    <button
                      onMouseEnter={() => setPreview('COLLECTIONS')}
                      onClick={() => {
                        setEditorialMenuOpen(false);
                        openConciergeWithIntent('Find Your Jewel Guide');
                      }}
                      className="hover:text-[#A98B58] transition-colors text-left flex items-center gap-1 font-medium"
                    >
                      <Compass size={12} className="text-[#A98B58]" />
                      <span>Find Your Jewel</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setEditorialMenuOpen(false);
                        setIsConciergeOpen(true);
                      }}
                      className="hover:text-[#A98B58] transition-colors text-left flex items-center gap-1"
                    >
                      <ShieldCheck size={12} className="text-[#A98B58]" />
                      <span>Concierge Desk</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setEditorialMenuOpen(false);
                        setAppointmentModalOpen(true);
                      }}
                      className="hover:text-[#A98B58] transition-colors text-left flex items-center gap-1"
                    >
                      <MapPin size={12} className="text-[#A98B58]" />
                      <span>Store / Salons</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setEditorialMenuOpen(false);
                        openConciergeWithIntent('Private Contact');
                      }}
                      className="hover:text-[#A98B58] transition-colors text-left flex items-center gap-1"
                    >
                      <Phone size={12} className="text-[#A98B58]" />
                      <span>Direct Contact</span>
                    </button>
                  </li>
                </ul>
              </div>

            </div>

            {/* Column 5: Alive Visual Preview Stage on Hover */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#171717]/10 pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-between">
              <div>
                <span className="text-[8.5px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium block mb-3">
                  MAISON PREVIEW • {activePreview.tag}
                </span>
                
                {/* Visual Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EEE8DE] border border-[#171717]/12 shadow-sm transition-all duration-500">
                  <img
                    src={activePreview.image}
                    alt={activePreview.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-serif text-lg leading-tight">{activePreview.title}</p>
                    <p className="text-[10px] text-white/80 font-sans font-light mt-0.5 line-clamp-1">
                      {activePreview.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast Direct Action */}
              <div className="pt-6 space-y-2.5">
                <button
                  onClick={() => handleNav('/ai-try-on')}
                  className="w-full py-3 px-4 bg-[#171717] hover:bg-[#272522] text-[#F8F5EE] text-[9.5px] tracking-[0.24em] uppercase font-sans font-medium flex items-center justify-between transition-colors shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={12} className="text-[#C6A56B]" />
                    <span>Launch AI Virtual Mirror</span>
                  </span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={() => {
                    setEditorialMenuOpen(false);
                    setAppointmentModalOpen(true);
                  }}
                  className="w-full py-3 px-4 border border-[#171717]/20 hover:border-[#171717] bg-[#FCFAF6] text-[#171717] text-[9.5px] tracking-[0.22em] uppercase font-sans font-medium flex items-center justify-between transition-colors"
                >
                  <span>Request Private Viewing Appointment</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>

          </div>

          {/* Menu Bottom Bar: Global Salons & Direct Assurance */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-[#171717]/10 gap-3 text-[9px] tracking-[0.22em] uppercase font-sans text-[#5F5A52]">
            <div>
              <span>PRIVATE SALONS: </span>
              <span className="text-[#171717] font-medium">MUMBAI • NEW DELHI • LONDON • DUBAI</span>
            </div>
            <div className="flex items-center gap-4">
              <span>DUAL SWISS CERTIFICATION</span>
              <span className="w-1 h-1 rounded-full bg-[#171717]/20" />
              <span>INSURED GLOBAL COURIER</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
