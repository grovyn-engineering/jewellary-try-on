import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Award, FileText, CheckCircle2, Download, Printer } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const ProvenanceDossierModal: React.FC = () => {
  const { provenanceProduct, isProvenanceOpen, setIsProvenanceOpen, showToast } = useShop();
  const [isRequested, setIsRequested] = useState(false);

  if (!isProvenanceOpen || !provenanceProduct) return null;

  const serialNumber = `AUR-${provenanceProduct.id.toUpperCase()}-2026-${provenanceProduct.craftsmanshipHours}H`;

  const handleRequestRecord = () => {
    setIsRequested(true);
    showToast(`Physical Archival Dossier requested for ${provenanceProduct.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#272522]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsProvenanceOpen(false)} />

      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FCFAF6] border border-[#272522]/20 shadow-2xl p-6 sm:p-10 z-10 text-[#272522]">
        {/* Certificate Header */}
        <div className="text-center pb-6 border-b border-[#272522]/15 mb-8 relative">
          <button
            onClick={() => setIsProvenanceOpen(false)}
            className="absolute top-0 right-0 p-1 text-[#6D655B] hover:text-[#272522]"
            aria-label="Close dossier"
          >
            <X size={20} />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F3EC] border border-[#A98B58] flex items-center justify-center text-[#A98B58] mb-3">
            <ShieldCheck size={24} />
          </div>

          <span className="text-[9px] tracking-[0.45em] uppercase text-[#A98B58] font-sans font-medium block mb-1">
            ARCHIVAL GENEALOGY & PROVENANCE DOSSIER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272522] font-light">
            Certificate of Sole Provenance
          </h2>
          <p className="text-[10px] tracking-[0.25em] text-[#6D655B] uppercase font-sans mt-2">
            REGISTRATION SERIAL: {serialNumber}
          </p>
        </div>

        {/* Ledger Details */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mb-8">
          {/* Piece Miniature */}
          <div className="sm:col-span-4 bg-[#F7F3EC] border border-[#272522]/10 p-3 flex flex-col justify-between">
            <div className="relative aspect-square overflow-hidden bg-[#EEE8DE] mb-3">
              <ImageWithFallback
                src={provenanceProduct.images[0]}
                alt={provenanceProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-wider text-[#A98B58] block font-sans">
                SOVEREIGN CREATION
              </span>
              <h4 className="font-serif text-base text-[#272522] font-medium leading-tight">
                {provenanceProduct.title}
              </h4>
              <p className="font-serif text-xs text-[#A98B58] mt-1">
                {provenanceProduct.formattedPrice}
              </p>
            </div>
          </div>

          {/* Archival Attributes */}
          <div className="sm:col-span-8 space-y-4">
            <div className="p-3.5 bg-[#F7F3EC] border border-[#272522]/10">
              <div className="flex items-center gap-2 mb-1">
                <Award size={12} className="text-[#A98B58]" />
                <span className="text-[8px] tracking-widest uppercase text-[#A98B58] font-sans font-medium">
                  01 • THE ORIGIN & EXTRACTION
                </span>
              </div>
              <p className="text-xs text-[#272522] font-serif">
                {provenanceProduct.provenance}
              </p>
              <p className="text-[11px] text-[#6D655B] font-light mt-0.5">
                Primary Stone: {provenanceProduct.primaryStone} • {provenanceProduct.specs[0]?.origin}
              </p>
            </div>

            <div className="p-3.5 bg-[#F7F3EC] border border-[#272522]/10">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={12} className="text-[#A98B58]" />
                <span className="text-[8px] tracking-widest uppercase text-[#A98B58] font-sans font-medium">
                  02 • GEMMOLOGICAL CERTIFICATION
                </span>
              </div>
              <p className="text-xs text-[#272522] font-serif">
                {provenanceProduct.certification}
              </p>
              <p className="text-[11px] text-[#6D655B] font-light mt-0.5">
                Clarity: {provenanceProduct.specs[0]?.clarity} • Color Grade: {provenanceProduct.specs[0]?.color}
              </p>
            </div>

            <div className="p-3.5 bg-[#F7F3EC] border border-[#272522]/10">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={12} className="text-[#A98B58]" />
                <span className="text-[8px] tracking-widest uppercase text-[#A98B58] font-sans font-medium">
                  03 • ATELIER FABRICATION
                </span>
              </div>
              <p className="text-xs text-[#272522] font-serif">
                {provenanceProduct.craftsmanshipHours} Hours of Solitary Handcraft
              </p>
              <p className="text-[11px] text-[#6D655B] font-light mt-0.5">
                Assay: {provenanceProduct.goldPurity} • Net Mass: {provenanceProduct.totalWeight}
              </p>
            </div>
          </div>
        </div>

        {/* Archival Wax Seal & Signature Block */}
        <div className="p-4 bg-[#F7F3EC] border border-[#272522]/15 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8E3A3A] text-[#FCFAF6] flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              AV
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-[#A98B58] block font-sans">
                ATELIER TOUCHMARK VERIFIED
              </span>
              <p className="text-xs text-[#272522] font-serif italic">
                Sealed in the presence of Senior Gemmological Archivist
              </p>
            </div>
          </div>

          <span className="text-[9px] uppercase tracking-wider font-sans text-[#6D655B]">
            PERMANENT REGISTER NO. {serialNumber.slice(-8)}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={() => {
              window.print();
            }}
            className="px-5 py-3 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[9px] tracking-wider uppercase font-sans text-[#272522] flex items-center gap-1.5"
          >
            <Printer size={12} />
            <span>PRINT DOSSIER</span>
          </button>

          <button
            onClick={handleRequestRecord}
            disabled={isRequested}
            className="px-6 py-3 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[9px] tracking-[0.2em] uppercase font-sans font-medium flex items-center gap-2 shadow-xs"
          >
            <Download size={12} className="text-[#C9B38A]" />
            <span>{isRequested ? 'DISPATCH RECORD CONFIRMED' : 'REQUEST PHYSICAL ARCHIVAL RECORD'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
