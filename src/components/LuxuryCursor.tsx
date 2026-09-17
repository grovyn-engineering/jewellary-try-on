import React, { useEffect, useState } from 'react';

export const LuxuryCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'tryon' | 'gold' | 'explore' | 'hidden'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or fine pointer absent
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check cursor targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorType(cursorAttr as any);
      } else if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('select')) {
        setCursorType('gold');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setCursorType('hidden');
    };

    // Smooth spring trailing
    const renderLoop = () => {
      setTrailingPos(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22
        };
      });
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice || cursorType === 'hidden') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central Precision Charcoal Dot */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#272522] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: cursorType === 'view' || cursorType === 'tryon' ? 0 : 1
        }}
      />

      {/* Trailing Antique Gold Architectural Halo */}
      <div
        className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
          cursorType === 'view'
            ? 'w-16 h-16 border border-[#A98B58] bg-[#FCFAF6]/90 shadow-sm'
            : cursorType === 'tryon'
            ? 'w-18 h-18 border border-[#A98B58] bg-[#F7F3EC]/95 shadow-sm'
            : cursorType === 'explore'
            ? 'w-16 h-16 border border-[#272522]/30 bg-[#FCFAF6]/90'
            : cursorType === 'gold'
            ? 'w-9 h-9 border border-[#A98B58]/60 bg-transparent'
            : 'w-6 h-6 border border-[#272522]/20 bg-transparent'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`
        }}
      >
        {cursorType === 'view' && (
          <span className="text-[8px] font-sans font-medium tracking-[0.25em] uppercase text-[#272522]">
            VIEW
          </span>
        )}
        {cursorType === 'tryon' && (
          <span className="text-[7px] font-sans font-medium tracking-[0.2em] uppercase text-[#A98B58]">
            TRY ON
          </span>
        )}
        {cursorType === 'explore' && (
          <span className="text-[7px] font-sans font-medium tracking-[0.2em] uppercase text-[#272522]">
            EXPLORE
          </span>
        )}
      </div>
    </div>
  );
};
