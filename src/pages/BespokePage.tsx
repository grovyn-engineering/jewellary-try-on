import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Check, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

export const BespokePage: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Mumbai',
    occasion: 'Imperial Wedding',
    commissionType: 'New Bespoke High Jewellery Creation',
    gemstonePreference: 'Colombian Emerald & Golconda Diamond',
    budgetTier: '₹50,00,000 to ₹1,50,00,000+',
    narrative: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Bespoke dossier initialized with Creative Director');
  };

  const bespokeSteps = [
    {
      num: '01',
      title: 'The Confidential Audience',
      desc: 'An intimate discussion with our Creative Director and Master Gemmologist to map your aesthetic desires, heirloom inspirations, and symbolic motifs.'
    },
    {
      num: '02',
      title: 'Global Gemstone Acquisition',
      desc: 'Our couriers activate private gem caches in Bogota, Golconda, Mogok, and Ratnapura to present you with three exceptional untreated candidates.'
    },
    {
      num: '03',
      title: 'Life-Size Gouache Rendering',
      desc: 'Hand-painted at 1:1 architectural scale on charcoal parchment with metallic pigments to capture every light reflection and pavé gradient.'
    },
    {
      num: '04',
      title: 'Anatomical Wax Maquette',
      desc: 'A physical sculpt tailored precisely to your neck curve or finger geometry to guarantee effortless fluid balance.'
    },
    {
      num: '05',
      title: 'The Obsidian Salon Unveiling',
      desc: 'The jewel is presented under calibrated candlelight within its handcrafted brass-mounted presentation trunk, accompanied by its sealed provenance dossier.'
    }
  ];

  return (
    <div className="bg-[#0B0B0A] text-[#EEE9DF] min-h-screen pt-24 pb-28">
      {/* Hero */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden border-b border-[#B9975B]/20">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2400&q=85"
          alt="Bespoke High Jewellery Atelier"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/60 to-[#0B0B0A]/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.45em] uppercase text-[#B9975B] font-sans block mb-4">
            CONFIDENTIAL SALON COMMISSIONS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F7F4EE] font-light mb-4">
            Bespoke Haute Joaillerie
          </h1>
          <p className="font-serif italic text-xl text-[#D8C7A0] max-w-xl mx-auto">
            "From an intimate sketch to a sovereign heirloom."
          </p>
        </div>
      </section>

      {/* The Journey */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 border-b border-[#B9975B]/15">
        <div className="text-center mb-16">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#B9975B] font-sans block mb-2">
            THE ATELIER PROTOCOL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE]">
            The Journey of Creation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {bespokeSteps.map((step) => (
            <div key={step.num} className="border border-[#B9975B]/20 p-6 bg-[#12100E] flex flex-col justify-between">
              <div>
                <span className="font-serif text-3xl text-[#B9975B] block mb-3 opacity-70">
                  {step.num}
                </span>
                <h3 className="font-serif text-lg text-[#F7F4EE] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8A8175] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commission Inquiry Form */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-24">
        <div className="border border-[#B9975B]/40 bg-[#12100E] p-8 md:p-14 shadow-2xl relative">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full border border-[#B9975B] bg-[#173C32]/50 text-[#B9975B] flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#B9975B] font-sans block mb-2">
                DOSSIER REGISTERED
              </span>
              <h3 className="font-serif text-3xl text-[#F7F4EE] mb-3">
                Your Commission Has Been Transmitted
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C7A0] max-w-md mx-auto leading-relaxed mb-6 font-light">
                Our Creative Director and Head of High Jewellery will review your request under strict confidentiality and contact you personally within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 border border-[#B9975B] text-xs uppercase tracking-widest text-[#D8C7A0]"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-10">
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#B9975B] font-sans block mb-2">
                  CONFIDENTIAL INQUIRY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE]">
                  Initiate a Private Commission
                </h2>
                <p className="text-xs text-[#8A8175] mt-2 font-light">
                  Commissions begin at ₹20,00,000. Each piece is crafted in strict secrecy.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      FULL NAME & TITLE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maharani Gayatri Devi / Patron"
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] placeholder-[#8A8175]/60 focus:outline-none focus:border-[#B9975B]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      PRIVATE PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] placeholder-[#8A8175]/60 focus:outline-none focus:border-[#B9975B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@residence.com"
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] placeholder-[#8A8175]/60 focus:outline-none focus:border-[#B9975B]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      SALON RESIDENCE OR CITY
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Mumbai, New Delhi, London, Dubai, Zurich"
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      COMMISSION NATURE
                    </label>
                    <select
                      value={formData.commissionType}
                      onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                    >
                      <option value="New Bespoke High Jewellery Creation">New Bespoke High Jewellery Creation</option>
                      <option value="Heirloom Gemstone Reset & Metamorphosis">Heirloom Gemstone Reset & Metamorphosis</option>
                      <option value="Type IIa Solitaire Engagement Suite">Type IIa Solitaire Engagement Suite</option>
                      <option value="Royal Wedding Regalia Ensemble">Royal Wedding Regalia Ensemble</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                      ANTICIPATED INVESTMENT SCALE
                    </label>
                    <select
                      value={formData.budgetTier}
                      onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                      className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#B9975B]"
                    >
                      <option value="₹25,00,000 to ₹50,00,000">₹25,00,000 to ₹50,00,000</option>
                      <option value="₹50,00,000 to ₹1,50,00,000">₹50,00,000 to ₹1,50,00,000</option>
                      <option value="₹1,50,00,000 to ₹5,00,00,000+">₹1,50,00,000 to ₹5,00,00,000+</option>
                      <option value="Undisclosed / Sovereign Level">Undisclosed / Sovereign Level</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] tracking-[0.2em] uppercase text-[#8A8175] block mb-1">
                    VISION, MOTIFS, OR HEIRLOOM GEMSTONES
                  </label>
                  <textarea
                    rows={4}
                    value={formData.narrative}
                    onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                    placeholder="Describe your desired motifs, preferred gemstone cuts (e.g. portrait cut, Golconda rose cut, untreated emerald cabochon), or historical references..."
                    className="w-full bg-[#141210] border border-[#B9975B]/30 px-4 py-3 text-xs text-[#F7F4EE] placeholder-[#8A8175]/60 focus:outline-none focus:border-[#B9975B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 border border-[#B9975B] bg-[#B9975B] hover:bg-[#D8C7A0] text-[#0B0B0A] text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all shadow-xl"
                  data-cursor="gold"
                >
                  TRANSMIT BESPOKE COMMISSION DOSSIER
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
