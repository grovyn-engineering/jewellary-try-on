import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Check, Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';

export const AppointmentPage: React.FC = () => {
  const { showToast } = useShop();

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
    jewelleryInterest: 'The Noor-E-Nizam Emerald & Diamond Collar',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Salon Viewing reservation confirmed');
  };

  const salons = [
    {
      city: 'Mumbai',
      name: 'The Taj Mahal Palace Flagship',
      address: 'Apollo Bunder, Colaba, Mumbai 400 001',
      desc: 'Private vault suites overlooking the Arabian Sea, featuring full high jewellery collections and diamond loupe testing benches.'
    },
    {
      city: 'New Delhi',
      name: 'The Imperial Pavilion',
      address: 'Janpath, Connaught Place, New Delhi 110 001',
      desc: 'Colonial heritage salon dedicated to royal wedding jewellery and imperial Jadau masterpieces.'
    },
    {
      city: 'London',
      name: 'Mayfair Private Suite',
      address: 'New Bond Street, London W1S 2TE',
      desc: 'Confidential salon in London’s luxury epicentre for European and Middle Eastern private collectors.'
    },
    {
      city: 'Dubai',
      name: 'DIFC Gate Village',
      address: 'Gate Village Building 03, DIFC, Dubai, UAE',
      desc: 'Contemporary sky salon presenting ultra-rare Type IIa solitaires and certified emerald suites.'
    }
  ];

  return (
    <div className="bg-[#0B0B0A] text-[#EEE9DF] min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-[#B9975B]/20 text-center">
        <span className="text-[9px] tracking-[0.45em] uppercase text-[#B9975B] font-sans block mb-3">
          SANCTUARIES OF PERMANENCE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F7F4EE] font-light mb-4">
          A Private Viewing
        </h1>
        <p className="text-xs sm:text-sm text-[#8A8175] font-light max-w-xl mx-auto leading-relaxed">
          Reserve an uninterrupted consultation with a Master Gemmologist in our private salons or via secure video suite.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Salons list */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#B9975B] font-sans block">
            SALON DIRECTORY
          </span>
          {salons.map(s => (
            <div key={s.city} className="border border-[#B9975B]/20 p-5 bg-[#12100E]">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-serif text-xl text-[#F7F4EE]">{s.city}</h3>
                <span className="text-[9px] tracking-wider text-[#B9975B] uppercase font-sans">BY APPOINTMENT</span>
              </div>
              <p className="text-xs text-[#D8C7A0] mb-2">{s.name}</p>
              <p className="text-[11px] text-[#8A8175] font-light leading-relaxed mb-3">{s.desc}</p>
              <span className="text-[10px] text-[#8A8175] block border-t border-white/5 pt-2 font-mono">
                {s.address}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Reservation Form */}
        <div className="lg:col-span-7">
          <div className="border border-[#B9975B]/40 bg-[#12100E] p-8 md:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full border border-[#B9975B] bg-[#173C32]/50 text-[#B9975B] flex items-center justify-center mx-auto mb-6">
                  <Check size={32} />
                </div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#B9975B] font-sans block mb-2">
                  AUDIENCE CONFIRMED
                </span>
                <h3 className="font-serif text-3xl text-[#F7F4EE] mb-4">
                  YOUR APPOINTMENT IS RESERVED
                </h3>
                <p className="text-sm text-[#D8C7A0] font-light leading-relaxed max-w-md mx-auto mb-6">
                  An AUREVYA concierge will be in touch shortly to confirm your salon suite and curate the requested jewellery pieces.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 border border-[#B9975B] text-xs uppercase tracking-widest text-[#D8C7A0]"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#B9975B] font-sans block mb-2">
                  SALON CONCIERGE PROTOCOL
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F4EE] mb-6">
                  Select Your Consultation Experience
                </h2>

                {/* Type Selection */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { id: 'PRIVATE BOUTIQUE VIEWING', label: 'Boutique Salon Viewing' },
                    { id: 'VIDEO CONSULTATION', label: 'Secure Video Suite' },
                    { id: 'BESPOKE COMMISSION', label: 'Bespoke Atelier Audience' },
                    { id: 'AI STYLE CONSULTATION', label: 'AI Virtual Fit Session' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAppointmentType(item.id as any)}
                      className={`p-3 text-left border text-[10px] tracking-wider uppercase font-sans transition-all ${
                        appointmentType === item.id
                          ? 'border-[#B9975B] bg-[#173C32]/40 text-[#F7F4EE]'
                          : 'border-[#B9975B]/20 bg-[#141210] text-[#8A8175] hover:text-[#EEE9DF]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Patron Name"
                        className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                        CONFIDENTIAL EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patron@domain.com"
                        className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                        DESTINATION SALON
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                      >
                        <option value="Mumbai">Mumbai (The Taj Mahal Palace Flagship)</option>
                        <option value="New Delhi">New Delhi (The Imperial Pavilion)</option>
                        <option value="London">London (New Bond Street, Mayfair)</option>
                        <option value="Dubai">Dubai (DIFC Gate Village)</option>
                        <option value="Virtual">Virtual Private Suite (Worldwide)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                        PREFERRED DATE *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                        PREFERRED TIME
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                      >
                        <option value="11:00">11:00 AM (Morning Salon)</option>
                        <option value="14:00">02:00 PM (Afternoon Private Salon)</option>
                        <option value="16:30">04:30 PM (Evening Salon)</option>
                        <option value="19:00">07:00 PM (Candlelight Viewing)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      JEWELS OF INTEREST OR CUSTOM REQUIREMENTS
                    </label>
                    <input
                      type="text"
                      value={formData.jewelleryInterest}
                      onChange={(e) => setFormData({ ...formData, jewelleryInterest: e.target.value })}
                      placeholder="e.g. Colombian Emeralds, Golconda Solitaire, Bridal Necklace..."
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-3.5 py-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 border border-[#B9975B] bg-[#B9975B] hover:bg-[#D8C7A0] text-[#0B0B0A] text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-xl mt-4"
                    data-cursor="gold"
                  >
                    RESERVE PRIVATE SALON AUDIENCE
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
