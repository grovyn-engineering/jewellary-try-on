import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Check, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { appointmentModalOpen, setAppointmentModalOpen, preselectedJewel, setPreselectedJewel } = useShop();

  const [appointmentType, setAppointmentType] = useState<
    'PRIVATE BOUTIQUE VIEWING' | 'VIDEO CONSULTATION' | 'BESPOKE COMMISSION' | 'AI STYLE CONSULTATION'
  >('PRIVATE BOUTIQUE VIEWING');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    preferredDate: '',
    preferredTime: '15:00',
    jewelleryInterest: preselectedJewel || 'The Noor-E-Nizam Emerald & Diamond Collar',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedJewel) {
      setFormData(prev => ({ ...prev, jewelleryInterest: preselectedJewel }));
    }
  }, [preselectedJewel]);

  useEffect(() => {
    if (appointmentModalOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [appointmentModalOpen]);

  if (!appointmentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const boutiqueCities = [
    { city: 'Mumbai', salon: 'Flagship Salon, Altamount Road, Cumballa Hill' },
    { city: 'New Delhi', salon: 'The Imperial Pavilion, Janpath' },
    { city: 'London', salon: 'Private Salon, Mayfair, New Bond Street' },
    { city: 'Dubai', salon: 'The Penthouse Suite, DIFC Gate Village' },
    { city: 'Paris', salon: 'Place Vendôme Private Suite' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#272522]/40 backdrop-blur-xs">
      <div
        className="absolute inset-0"
        onClick={() => setAppointmentModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 border border-[#272522]/15 bg-[#FCFAF6] text-[#272522] p-6 sm:p-10 shadow-[0_25px_70px_rgba(39,37,34,0.15)] animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setAppointmentModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#6D655B] hover:text-[#272522] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F7F3EC] border border-[#A98B58] flex items-center justify-center text-[#A98B58] mb-6">
              <Check size={28} />
            </div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
              AUDIENCE CONFIRMED
            </span>
            <h3 className="font-serif text-3xl text-[#272522] mb-3 font-light">
              Your Private Viewing Has Been Reserved
            </h3>
            <p className="text-xs text-[#6D655B] font-light max-w-md mx-auto leading-relaxed mb-8">
              A Senior Client Director will contact you within four hours to confirm your private salon appointment in {formData.city}, coordinate personal security access, and prepare the requested jewels.
            </p>
            <button
              onClick={() => setAppointmentModalOpen(false)}
              className="px-8 py-3.5 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-widest uppercase font-sans font-medium"
            >
              RETURN TO SALON
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                CONFIDENTIAL AUDIENCE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#272522] font-light">
                Request a Private Salon Viewing
              </h2>
              <p className="text-xs text-[#6D655B] font-light mt-1">
                Conducted in complete privacy with a Master Gemmologist.
              </p>
            </div>

            {/* Appointment Format Selector */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {(
                [
                  'PRIVATE BOUTIQUE VIEWING',
                  'VIDEO CONSULTATION',
                  'BESPOKE COMMISSION',
                  'AI STYLE CONSULTATION'
                ] as const
              ).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAppointmentType(type)}
                  className={`py-2 px-3 text-[9px] tracking-wider uppercase font-sans text-center border transition-all ${
                    appointmentType === type
                      ? 'border-[#A98B58] bg-[#272522] text-[#FCFAF6]'
                      : 'border-[#272522]/15 bg-[#F7F3EC] text-[#6D655B] hover:text-[#272522]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                    Title & Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Katherine Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs px-3.5 py-2.5 outline-none focus:border-[#A98B58]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                    Telephone (Direct or Aide-de-Camp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs px-3.5 py-2.5 outline-none focus:border-[#A98B58]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="patron@estate.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs px-3.5 py-2.5 outline-none focus:border-[#A98B58]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                    Preferred Salon Location *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs px-3.5 py-2.5 outline-none focus:border-[#A98B58]"
                  >
                    {boutiqueCities.map(b => (
                      <option key={b.city} value={b.city}>{b.city} • {b.salon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs px-3.5 py-2.5 outline-none focus:border-[#A98B58]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                    Jewel or Creation of Interest
                  </label>
                  <input
                    type="text"
                    value={formData.jewelleryInterest}
                    onChange={(e) => setFormData({ ...formData, jewelleryInterest: e.target.value })}
                    className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs px-3.5 py-2.5 outline-none focus:border-[#A98B58]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-wider text-[#6D655B] block mb-1 font-sans">
                  Special Curatorial Requests or Security Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Preparing parure comparison under natural daylight; private suite access required."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F7F3EC] border border-[#272522]/15 text-[#272522] text-xs p-3 outline-none focus:border-[#A98B58] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-sm mt-4"
              >
                REQUEST SALON AUDIENCE
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
