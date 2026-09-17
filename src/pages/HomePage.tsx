import React from 'react';
import { HeroAlive } from '../components/HeroAlive';
import { ShopByCategorySection } from '../components/ShopByCategorySection';
import { EmeraldRoomSection } from '../components/EmeraldRoomSection';
import { AiTryOnLandingSection } from '../components/AiTryOnLandingSection';
import { PrivateEditShopTheLook } from '../components/PrivateEditShopTheLook';
import { JewelleryRunwaySection } from '../components/JewelleryRunwaySection';
import { DiamondRoomSection } from '../components/DiamondRoomSection';
import { TheStoneKnowsFirst } from '../components/TheStoneKnowsFirst';
import { CinematicAtelierSection } from '../components/CinematicAtelierSection';
import { BespokeWorkbenchSection } from '../components/BespokeWorkbenchSection';
import { WhatIsTheMomentSection } from '../components/WhatIsTheMomentSection';
import { PrivateAccessSalonSection } from '../components/PrivateAccessSalonSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden bg-[#F8F5EE] text-[#171717]">
      {/* Scene 01: The Jewel Enters the Room (Monumental, 60-75% viewport presence, Gloock typography) */}
      <HeroAlive />

      {/* Category Architecture Discovery (10 Categories with Hero Photography & Direct Navigation) */}
      <ShopByCategorySection />

      {/* Scene 02: The Emerald Room (Color Blocker Visual Interruption in Deep Emerald #073B32) */}
      <EmeraldRoomSection />

      {/* Scene 03: See It On You (Dominant 80-100vh AI Try-On Architectural Campaign Section) */}
      <AiTryOnLandingSection />

      {/* Scene 04: The Private Edit / Celebrity "Shop the Look" (Hotspot Styling Board + 3 Oversized Pieces) */}
      <PrivateEditShopTheLook />

      {/* Scene 05: The Jewellery Runway (Horizontal Scroll / Scrub Experience with Giant Numbers) */}
      <JewelleryRunwaySection />

      {/* Scene 06: The Diamond Room (Optical Crystal White Refraction #FFFFFF) */}
      <DiamondRoomSection />

      {/* Scene 07: The Stone Knows First (Gemmological 360° Non-Destructive Facet & Jardin Scrub) */}
      <TheStoneKnowsFirst />

      {/* Scene 08: 340 Hours at the Bench (Gouache Draft ↔ Finished Collier Transformation Wipe Slider) */}
      <CinematicAtelierSection />

      {/* Scene 09: Design Yours (Interactive Goldsmith Workbench: Stone, Metal, Form, Mood) */}
      <BespokeWorkbenchSection />

      {/* Scene 10: What is the Moment? (Occasion Discovery Architecture) */}
      <WhatIsTheMomentSection />

      {/* Scene 11: Private Access Salon (Confidential Enclave Protocol & Booking) */}
      <PrivateAccessSalonSection />
    </div>
  );
};
