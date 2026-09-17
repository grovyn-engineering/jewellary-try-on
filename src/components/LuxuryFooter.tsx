import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ShieldCheck, Gem, Sparkles, Clock, PhoneCall, Award } from 'lucide-react';

export const LuxuryFooter: React.FC = () => {
  const { navigate, setAppointmentModalOpen, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Privileged salon dispatches enabled for ' + email);
  };

  return (
    <footer className="bg-[#F7F3EC] text-[#272522] border-t border-[#272522]/10 pt-20 pb-12 selection:bg-[#A98B58]/20">
      {/* Luxury Trust Marks Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-8 border-y border-[#272522]/10 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <ShieldCheck size={20} className="text-[#A98B58] mb-2 stroke-[1.2]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">BIS Hallmarked</span>
            <span className="text-[9px] text-[#6D655B] mt-0.5">Government Assayed 916/750</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <Gem size={20} className="text-[#A98B58] mb-2 stroke-[1.2]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">GIA & SSEF Dual Certified</span>
            <span className="text-[9px] text-[#6D655B] mt-0.5">Dual Swiss Lab Reports</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <Award size={20} className="text-[#A98B58] mb-2 stroke-[1.2]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">Kimberley Process</span>
            <span className="text-[9px] text-[#6D655B] mt-0.5">Ethically Sourced Provenance</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <Sparkles size={20} className="text-[#A98B58] mb-2 stroke-[1.2]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">Virtual Mirror</span>
            <span className="text-[9px] text-[#6D655B] mt-0.5">AI Optical Drape & Fit</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <Clock size={20} className="text-[#A98B58] mb-2 stroke-[1.2]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">Perpetual Care</span>
            <span className="text-[9px] text-[#6D655B] mt-0.5">Annual Polishing & Check</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <PhoneCall size={20} className="text-[#A98B58] mb-2 stroke-[1.2]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#272522] font-medium">Private Concierge</span>
            <span className="text-[9px] text-[#6D655B] mt-0.5">Discreet Armored Transit</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand statement */}
        <div className="lg:col-span-2 pr-0 lg:pr-12">
          <span className="font-serif text-3xl tracking-[0.25em] text-[#272522] block font-light">AUREVYA</span>
          <span className="text-[9px] tracking-[0.45em] uppercase text-[#A98B58] font-sans font-medium block mt-1">HAUTE JOAILLERIE</span>
          <p className="font-serif italic text-lg text-[#6D655B] mt-6">
            "Jewels with a memory."
          </p>
          <p className="text-xs text-[#6D655B] font-light leading-relaxed mt-4 max-w-sm">
            An Indian-origin contemporary haute joaillerie house uniting centuries of imperial lapidary heritage with modern architectural geometry and private digital visualization.
          </p>

          {/* Minimalist Privileged Journal Sign-up */}
          <div className="mt-8">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#272522] block mb-3 font-sans font-medium">
              PRIVILEGED SALON DISPATCHES
            </span>
            {subscribed ? (
              <p className="text-xs text-[#A98B58] font-serif italic">
                Thank you. You will receive private previews before public disclosure.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your confidential email"
                  className="flex-grow bg-[#FCFAF6] border border-[#272522]/15 text-[#272522] placeholder-[#6D655B]/60 text-xs px-3 py-2.5 outline-none focus:border-[#A98B58]"
                />
                <button
                  type="submit"
                  className="px-4 bg-[#272522] text-[#FCFAF6] text-[9px] tracking-[0.2em] uppercase font-sans hover:bg-[#3D3A35] transition-colors"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 1: Collections */}
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium block mb-6">
            COLLECTIONS
          </span>
          <ul className="space-y-3 text-xs text-[#6D655B]">
            <li>
              <button onClick={() => navigate('/collections/high-jewellery')} className="hover:text-[#272522] transition-colors">
                High Jewellery
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/collections/bridal')} className="hover:text-[#272522] transition-colors">
                Royal Bridal Regalia
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/collections/solitaires')} className="hover:text-[#272522] transition-colors">
                Solitaires & Type IIa
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/collections/polki-heritage')} className="hover:text-[#272522] transition-colors">
                Imperial Jadau & Polki
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/collections/contemporary')} className="hover:text-[#272522] transition-colors">
                Contemporary Salon
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: The House & Services */}
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium block mb-6">
            THE HOUSE
          </span>
          <ul className="space-y-3 text-xs text-[#6D655B]">
            <li>
              <button onClick={() => navigate('/house')} className="hover:text-[#272522] transition-colors">
                Maison Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/atelier')} className="hover:text-[#272522] transition-colors">
                The Seven Stages Atelier
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/bespoke')} className="hover:text-[#272522] transition-colors">
                Bespoke Commissions
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/ai-try-on')} className="hover:text-[#272522] transition-colors">
                Virtual Mirror Studio
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/journal')} className="hover:text-[#272522] transition-colors">
                The Aurevya Gazette
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Salons & Private Concierge */}
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A98B58] font-sans font-medium block mb-6">
            PRIVATE SALONS
          </span>
          <ul className="space-y-3 text-xs text-[#6D655B]">
            <li>
              <span className="text-[#272522] font-medium block">Mumbai Flagship</span>
              <span className="text-[10px] text-[#6D655B]">Altamount Road, Cumballa Hill</span>
            </li>
            <li>
              <span className="text-[#272522] font-medium block">London Mayfair</span>
              <span className="text-[10px] text-[#6D655B]">New Bond Street, W1S</span>
            </li>
            <li>
              <span className="text-[#272522] font-medium block">Dubai DIFC</span>
              <span className="text-[10px] text-[#6D655B]">Gate Village Building 03</span>
            </li>
            <li className="pt-2">
              <button
                onClick={() => setAppointmentModalOpen(true)}
                className="text-[#A98B58] hover:text-[#272522] font-medium text-[10px] uppercase tracking-wider underline transition-colors"
              >
                REQUEST SALON AUDIENCE →
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Disclaimers, Legal */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 border-t border-[#272522]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#6D655B]">
        <div className="flex flex-wrap items-center gap-4">
          <span>© {new Date().getFullYear()} AUREVYA HAUTE JOAILLERIE. ALL RIGHTS RESERVED.</span>
          <span>•</span>
          <span>MUSEUM GRADE ARCHIVE</span>
          <span>•</span>
          <span>ALL GEMSTONES CERTIFIED UNTREATED</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => showToast('Terms of Discretion and Custody')} className="hover:text-[#272522]">Terms of Custody</button>
          <button onClick={() => showToast('Confidentiality Protocol')} className="hover:text-[#272522]">Client Privacy</button>
          <button onClick={() => showToast('Provenance Integrity')} className="hover:text-[#272522]">Provenance Registry</button>
        </div>
      </div>
    </footer>
  );
};
