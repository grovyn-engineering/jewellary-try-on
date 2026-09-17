import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Sparkles, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'square' | 'portrait' | 'tall';
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = 'portrait',
  showCategory = true
}) => {
  const { navigate, toggleWishlist, isInWishlist, openTryOnForProduct, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    tall: 'aspect-[3/4]'
  }[aspectRatio];

  return (
    <div
      className="group relative flex flex-col bg-[#FCFAF6] text-[#171717] border border-[#171717]/10 hover:border-[#A98B58]/60 transition-all duration-500 shadow-xs hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`relative w-full ${aspectClasses} overflow-hidden bg-[#EEE8DE]/50 cursor-pointer`}
        onClick={() => navigate(`/product/${product.slug}`)}
      >
        {/* Primary Image */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${
          isHovered && product.images[1] ? 'opacity-0 scale-104' : 'opacity-100 scale-100'
        }`}>
          <ImageWithFallback
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Secondary Angle Crossfade */}
        {product.images[1] && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${
            isHovered ? 'opacity-100 scale-103' : 'opacity-0 scale-100'
          }`}>
            <ImageWithFallback
              src={product.images[1]}
              alt={`${product.title} angle`}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        )}

        {/* Top Badges & Wishlist Toggle */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {product.featured && (
              <span className="text-[7.5px] tracking-[0.2em] uppercase font-sans px-2 py-0.5 border border-[#A98B58]/40 bg-[#FCFAF6]/95 text-[#A98B58] font-medium">
                HIGH ATELIER
              </span>
            )}
            {product.tryOnCompatible && (
              <span className="text-[7px] tracking-[0.18em] uppercase font-sans px-1.5 py-0.5 bg-[#171717]/85 text-[#F8F5EE] flex items-center gap-1">
                <Sparkles size={8} className="text-[#C6A56B]" />
                <span>TRY ON</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Save to Private Edit"
            className={`p-2 transition-all duration-300 rounded-full shadow-xs ${
              isFavorited
                ? 'bg-[#A98B58] text-[#FCFAF6]'
                : 'bg-[#FCFAF6]/90 text-[#5F5A52] hover:text-[#A98B58] hover:bg-[#FCFAF6]'
            }`}
          >
            <Heart size={13} className={isFavorited ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Desktop Quick Actions Hover Bar */}
        <div
          className={`hidden md:flex absolute bottom-0 left-0 right-0 p-3 bg-[#FCFAF6]/95 backdrop-blur-xs border-t border-[#171717]/10 items-center justify-between gap-2 z-10 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 text-[8.5px] tracking-[0.2em] uppercase font-sans text-[#171717] border border-[#171717]/20 hover:border-[#171717] bg-[#FCFAF6] hover:bg-[#EEE8DE] transition-colors flex items-center justify-center gap-1 font-medium"
          >
            <Eye size={11} className="text-[#A98B58]" />
            <span>QUICK VIEW</span>
          </button>

          {product.tryOnCompatible && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openTryOnForProduct(product);
              }}
              className="flex-1 py-2 text-[8.5px] tracking-[0.2em] uppercase font-sans text-[#FCFAF6] bg-[#171717] hover:bg-[#272522] transition-colors flex items-center justify-center gap-1 font-medium shadow-xs"
            >
              <Sparkles size={11} className="text-[#C6A56B]" />
              <span>SEE IT ON YOU</span>
            </button>
          )}
        </div>
      </div>

      {/* Metadata Section */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-[#FCFAF6]">
        <div>
          {showCategory && (
            <span className="text-[8px] tracking-[0.28em] uppercase text-[#A98B58] font-sans font-semibold block mb-1">
              {product.collection}
            </span>
          )}

          {/* Product Title */}
          <h3
            onClick={() => navigate(`/product/${product.slug}`)}
            className="font-serif text-lg sm:text-xl text-[#171717] cursor-pointer hover:text-[#A98B58] transition-colors line-clamp-1 font-normal"
          >
            {product.title}
          </h3>

          {/* Short human descriptor */}
          <p className="font-sans text-[11px] text-[#5F5A52] font-light mt-1 line-clamp-1">
            {product.subtitle || `${product.metal}, ${product.primaryStone}`}
          </p>
        </div>

        {/* Price & Availability */}
        <div className="mt-3 pt-2.5 border-t border-[#171717]/10 flex items-baseline justify-between">
          <span className="font-serif text-base tracking-wide text-[#171717] font-normal">
            {product.formattedPrice}
          </span>
          <span className="text-[8px] tracking-[0.16em] uppercase text-[#5F5A52] font-sans font-medium">
            {product.inStock ? 'READY TO SHIP' : 'BY APPOINTMENT'}
          </span>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="md:hidden mt-3 pt-2 border-t border-[#171717]/8 flex gap-2">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-1.5 border border-[#171717]/20 text-[8.5px] uppercase tracking-wider font-sans text-[#171717] text-center"
          >
            QUICK VIEW
          </button>
          {product.tryOnCompatible && (
            <button
              onClick={() => openTryOnForProduct(product)}
              className="flex-1 py-1.5 bg-[#171717] text-[#FCFAF6] text-[8.5px] uppercase tracking-wider font-sans text-center flex items-center justify-center gap-1"
            >
              <Sparkles size={9} className="text-[#C6A56B]" />
              <span>TRY ON</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
