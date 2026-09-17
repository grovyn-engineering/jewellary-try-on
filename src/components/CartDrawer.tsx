import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Trash2, ArrowRight, Calendar, Lock } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    navigate,
    setAppointmentModalOpen,
    showToast
  } = useShop();

  const [conciergeWrap, setConciergeWrap] = useState(true);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(cartTotal);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#272522]/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        {/* Drawer Container */}
        <div className="relative w-full max-w-lg bg-[#FCFAF6] border-l border-[#272522]/15 h-full flex flex-col justify-between p-6 md:p-8 z-10 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#272522]/10 pb-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl text-[#272522] tracking-[0.05em] font-light">
                  SALON BAG
                </h3>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] mt-0.5 font-sans font-medium">
                  Private Acquisitions ({cart.length})
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#6D655B] hover:text-[#272522] transition-colors"
                aria-label="Close salon bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Empty State */}
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-xl text-[#272522] font-light mb-2">Your Salon Bag is empty.</p>
                <p className="text-xs text-[#6D655B] font-light max-w-xs mx-auto mb-6">
                  Select a masterpiece from our high jewellery or solitaire archives to initiate acquisition.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/collections/high-jewellery');
                  }}
                  className="px-6 py-3 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-widest uppercase font-sans font-medium"
                >
                  EXPLORE ARCHIVES
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-[#F7F3EC] border border-[#272522]/10"
                  >
                    <div
                      className="w-20 h-20 bg-[#EEE8DE] overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate(`/product/${item.product.slug}`);
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[8px] tracking-widest uppercase text-[#A98B58] block font-sans">
                            {item.product.collection}
                          </span>
                          <h4
                            onClick={() => {
                              setIsCartOpen(false);
                              navigate(`/product/${item.product.slug}`);
                            }}
                            className="font-serif text-sm text-[#272522] cursor-pointer hover:text-[#A98B58]"
                          >
                            {item.product.title}
                          </h4>
                          <span className="text-[11px] text-[#6D655B] block font-light">
                            {item.product.specs[0]?.weight || item.product.primaryStone}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#6D655B] hover:text-[#272522] p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#272522]/5">
                        <span className="font-serif text-sm text-[#272522] font-medium">
                          {item.product.formattedPrice}
                        </span>

                        <div className="flex items-center gap-2 border border-[#272522]/15 bg-[#FCFAF6] px-2 py-0.5 text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="hover:text-[#A98B58]"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="hover:text-[#A98B58]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Callout */}
          {cart.length > 0 && (
            <div className="border-t border-[#272522]/10 pt-4 mt-4 space-y-4">
              {/* Complimentary Presentation Trunk toggle */}
              <div className="flex items-center justify-between text-xs text-[#6D655B] p-3 bg-[#F7F3EC] border border-[#272522]/10">
                <span className="text-[10px]">Solid Oak Diplomatic Presentation Trunk</span>
                <span className="text-[#A98B58] text-[9px] uppercase font-sans font-medium">COMPLIMENTARY</span>
              </div>

              {/* Total Calculation */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#6D655B]">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm text-[#272522]">{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-[#6D655B]">
                  <span>Diplomatic Armored Transit</span>
                  <span className="text-[#A98B58] uppercase text-[9px] font-sans">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[#272522] pt-2 border-t border-[#272522]/10 font-medium">
                  <span className="font-serif text-base">Estimated Acquisition</span>
                  <span className="font-serif text-lg text-[#272522]">{formattedTotal}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full py-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock size={12} className="text-[#C9B38A]" />
                  <span>INITIATE PRIVATE ACQUISITION</span>
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setAppointmentModalOpen(true);
                  }}
                  className="w-full py-3 border border-[#A98B58] hover:border-[#272522] bg-[#F7F3EC] text-[#272522] text-[10px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar size={12} className="text-[#A98B58]" />
                  <span>ARRANGE SALON VIEWING PRIOR TO SETTLEMENT</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Dialog Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#272522]/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FCFAF6] border border-[#272522]/15 p-6 sm:p-8 text-[#272522] shadow-2xl">
            {orderComplete ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F3EC] border border-[#A98B58] flex items-center justify-center text-[#A98B58] mb-4">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A98B58] block mb-1">
                  ACQUISITION RECORDED
                </span>
                <h3 className="font-serif text-2xl text-[#272522] mb-3">Linage Transfer Initiated</h3>
                <p className="text-xs text-[#6D655B] font-light leading-relaxed mb-6">
                  Reference #AUR-{Math.floor(100000 + Math.random() * 900000)}. Your dedicated Private Client Liaison will confirm bank wire and armored transit arrangements within two hours.
                </p>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setIsCartOpen(false);
                    setOrderComplete(false);
                  }}
                  className="px-6 py-3 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-widest uppercase font-sans font-medium"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#272522]/10">
                  <span className="text-[9px] tracking-widest uppercase text-[#A98B58] font-sans font-medium">
                    SETTLEMENT PROTOCOL
                  </span>
                  <button onClick={() => setIsCheckoutModalOpen(false)}>
                    <X size={16} className="text-[#6D655B]" />
                  </button>
                </div>

                <p className="font-serif text-xl text-[#272522] mb-2 font-light">Discreet Wire & Escrow Settlement</p>
                <p className="text-xs text-[#6D655B] font-light mb-6">
                  For amounts exceeding ₹10,00,000, acquisitions are settled via direct institutional Swiss Bank Escrow or RTGS wire with full diplomatic insurance.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOrderComplete(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1">
                      Account / Beneficiary Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharani Estate Trust"
                      className="w-full bg-[#F7F3EC] border border-[#272522]/15 p-2.5 outline-none focus:border-[#A98B58]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1">
                      Contact Phone for Courier Security Pin
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      className="w-full bg-[#F7F3EC] border border-[#272522]/15 p-2.5 outline-none focus:border-[#A98B58]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1">
                      Diplomatic Vault Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Private residence or private banking vault"
                      className="w-full bg-[#F7F3EC] border border-[#272522]/15 p-2.5 outline-none focus:border-[#A98B58]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-widest uppercase font-sans font-medium mt-4 hover:bg-[#3D3A35] transition-all"
                  >
                    SUBMIT SETTLEMENT PROTOCOL ({formattedTotal})
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
