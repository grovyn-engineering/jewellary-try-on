import React, { useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

interface GemstoneLoupeProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  macroUrl?: string;
  title: string;
  specsSubtitle?: string;
}

export const GemstoneLoupe: React.FC<GemstoneLoupeProps> = ({
  isOpen,
  onClose,
  imageUrl,
  macroUrl,
  title,
  specsSubtitle
}) => {
  const [activeImage, setActiveImage] = useState<string>(macroUrl || imageUrl);
  const [zoomLevel, setZoomLevel] = useState<number>(2.2);
  const [loupePosition, setLoupePosition] = useState({ x: 0, y: 0 });
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#272522]/40 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl h-[88vh] border border-[#272522]/15 bg-[#FCFAF6] flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(39,37,34,0.15)] animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#272522]/10 bg-[#F7F3EC]">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-[#A98B58]" />
            <div>
              <h3 className="font-serif text-lg md:text-xl text-[#272522] tracking-wide font-light">
                ATELIER GEMSTONE LOUPE
              </h3>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium">
                {title} • {specsSubtitle || '40x Optical Facet Analysis'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {macroUrl && (
              <div className="flex items-center border border-[#272522]/15 text-[9px] tracking-[0.2em] uppercase font-sans">
                <button
                  onClick={() => setActiveImage(imageUrl)}
                  className={`px-3 py-1 transition-colors ${
                    activeImage === imageUrl ? 'bg-[#272522] text-[#FCFAF6]' : 'text-[#6D655B] hover:text-[#272522]'
                  }`}
                >
                  FULL PIECE
                </button>
                <button
                  onClick={() => setActiveImage(macroUrl)}
                  className={`px-3 py-1 transition-colors ${
                    activeImage === macroUrl ? 'bg-[#272522] text-[#FCFAF6]' : 'text-[#6D655B] hover:text-[#272522]'
                  }`}
                >
                  MACRO FACET
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1 text-[#6D655B] hover:text-[#272522] transition-colors"
              aria-label="Close loupe"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Center Viewing Stage */}
        <div
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsLoupeActive(true)}
          onMouseLeave={() => setIsLoupeActive(false)}
          className="flex-grow relative overflow-hidden bg-[#EEE8DE]/30 flex items-center justify-center cursor-crosshair select-none"
        >
          {/* Base Image */}
          <img
            src={activeImage}
            alt={title}
            referrerPolicy="no-referrer"
            className="max-h-[68vh] max-w-[85%] object-contain transition-all drop-shadow-sm"
          />

          {/* Floating High-Power Optical Loupe Circle */}
          {isLoupeActive && (
            <div
              className="pointer-events-none absolute w-56 h-56 rounded-full border-2 border-[#A98B58] shadow-[0_10px_35px_rgba(39,37,34,0.3)] overflow-hidden hidden md:block"
              style={{
                left: `${loupePosition.x}%`,
                top: `${loupePosition.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundImage: `url(${activeImage})`,
                backgroundPosition: `${loupePosition.x}% ${loupePosition.y}%`,
                backgroundSize: `${zoomLevel * 300}%`,
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Reticle / Measurement Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="w-full h-[1px] bg-[#A98B58]" />
                <div className="h-full w-[1px] bg-[#A98B58] absolute" />
              </div>
              <span className="absolute bottom-3 inset-x-0 text-center text-[8px] tracking-[0.25em] text-[#272522] bg-[#FCFAF6]/90 py-0.5 font-sans font-medium">
                {zoomLevel}X FACET PURITY
              </span>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#272522]/10 bg-[#F7F3EC]">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6D655B] font-sans">
            HOVER OVER GEMSTONE TO MAGNIFY MICRO-FACETS AND NATURAL JARDIN
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setZoomLevel(prev => Math.max(1.5, prev - 0.5))}
              className="p-1.5 text-[#6D655B] hover:text-[#272522] border border-[#272522]/15 bg-[#FCFAF6]"
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-xs font-mono text-[#272522] font-medium">{zoomLevel.toFixed(1)}x</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(4.0, prev + 0.5))}
              className="p-1.5 text-[#6D655B] hover:text-[#272522] border border-[#272522]/15 bg-[#FCFAF6]"
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
