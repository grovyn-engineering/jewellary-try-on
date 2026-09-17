import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, Sparkles, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    navigate,
    openTryOnForProduct,
    addToCart,
    showToast
  } = useShop();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#272522]/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FCFAF6] border-l border-[#272522]/15 h-full flex flex-col justify-between p-6 md:p-8 z-10 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 text-[#272522]">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#272522]/10 pb-4 mb-6">
            <div>
              <h3 className="font-serif text-2xl text-[#272522] tracking-[0.05em] font-light">
                YOUR PRIVATE EDIT
              </h3>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] mt-0.5 font-sans font-medium">
                {savedProducts.length} Curated Pieces
              </p>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#6D655B] hover:text-[#272522] transition-colors"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* Empty State */}
          {savedProducts.length === 0 ? (
            <div className="text-center py-20 px-4">
              <Heart size={32} className="mx-auto text-[#A98B58]/40 stroke-[1] mb-4" />
              <h4 className="font-serif text-xl text-[#272522] mb-2 font-light">
                Your Edit is Empty
              </h4>
              <p className="text-xs text-[#6D655B] font-light leading-relaxed mb-8">
                Pieces you return to belong here. Save creations as you explore our High Jewellery and Solitaire archives.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate('/collections/high-jewellery');
                }}
                className="px-6 py-3 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-widest uppercase font-sans font-medium"
              >
                EXPLORE VAULT
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-[#F7F3EC] border border-[#272522]/10"
                >
                  <div
                    className="w-20 h-20 bg-[#EEE8DE] overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] tracking-widest uppercase text-[#A98B58] block font-sans">
                          {product.collection}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#6D655B] hover:text-[#272522] p-0.5"
                          aria-label="Remove from edit"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigate(`/product/${product.slug}`);
                        }}
                        className="font-serif text-sm text-[#272522] cursor-pointer hover:text-[#A98B58] line-clamp-1 font-normal"
                      >
                        {product.title}
                      </h4>
                      <p className="font-serif text-xs text-[#272522] mt-0.5 font-medium">
                        {product.formattedPrice}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#272522]/5">
                      {product.tryOnCompatible && (
                        <button
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openTryOnForProduct(product);
                          }}
                          className="flex-1 py-1 text-[8px] tracking-wider uppercase font-sans text-[#FCFAF6] bg-[#272522] hover:bg-[#3D3A35] flex items-center justify-center gap-1"
                        >
                          <Sparkles size={9} className="text-[#C9B38A]" />
                          <span>TRY ON</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          showToast('Added to Salon Bag');
                        }}
                        className="flex-1 py-1 text-[8px] tracking-wider uppercase font-sans text-[#272522] border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-center"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Action */}
        {savedProducts.length > 0 && (
          <div className="border-t border-[#272522]/10 pt-4">
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigate('/ai-try-on');
              }}
              className="w-full py-3.5 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles size={12} className="text-[#C9B38A]" />
              <span>TEST ALL SAVED IN VIRTUAL MIRROR</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
