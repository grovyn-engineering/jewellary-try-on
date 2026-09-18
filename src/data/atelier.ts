import necklace2 from '../images/necklace2.jpg';
import diamond2 from '../images/diamond2.jpg';
import diamond3 from '../images/diamond3.jpeg';
import diamond5 from '../images/diamond5.jpg';
import solitaires1 from '../images/solitaires1.jpeg';
import solitaires3 from '../images/solitaires3.webp';
import bangles3 from '../images/bangles3.jpeg';
import rare1 from '../images/rare1.jpg';
import rare2 from '../images/rare2.jpg';

export interface AtelierStage {
  step: string;
  title: string;
  hindiName: string;
  subheading: string;
  description: string;
  technicalDetails: string;
  atelierNote: string;
  tool: string;
  image: string;
}

export const ATELIER_STAGES: AtelierStage[] = [
  {
    step: 'STAGE 01',
    title: 'THE STONE',
    hindiName: 'GOHAR • MINERALOGICAL CULLING',
    subheading: 'Selection of Rare Geological Rarities',
    description: 'Before a line is drawn, the gem dictates the architecture. Fewer than one in twenty thousand diamonds and emeralds possess the saturation, purity, and personality worthy of an Aurevya hallmark.',
    technicalDetails: 'Spectroscopic analysis, origin verification via Gubelin/SSEF protocols, and thermal mapping of crystal lattice.',
    atelierNote: 'Our Head of Gem Sourcing travels directly to Muzo, Ratnapura, and Antwerp, selecting only stones with extraordinary internal life.',
    tool: 'Binocular Gemmological Microscope & Raman Spectroscope',
    image: diamond2
  },
  {
    step: 'STAGE 02',
    title: 'THE ARCHITECTURE',
    hindiName: 'NAQSHA • GOUACHE 1:1 RENDERING',
    subheading: 'Life-Size Gouache Painting on Tinted Paper',
    description: 'Every creation begins as a life-size gouache painting on tinted archival paper. The mineral watercolor captures light refraction, metal shadows, and gemstone transparency with micro-millimeter precision.',
    technicalDetails: '1:1 scale optical projection, hand-mixed mineral pigments, kinetic balance calculation for necklace curvature.',
    atelierNote: 'The gouache rendering remains alongside the craftsmen throughout the entire four-hundred-hour fabrication.',
    tool: 'Sable-Hair Brush N° 000 & Natural Ochre Pigments',
    image: necklace2
  },
  {
    step: 'STAGE 03',
    title: 'THE GOLD ARMATURE',
    hindiName: 'GHADAI • SCULPTING THE 18K CHASSIS',
    subheading: 'Hand-Forging Solid Armatures',
    description: 'Solid 18K and 22K gold is forged by hand using ancient repoussé, chasing, and micro-pierced galleries. Weight is distributed mathematically so that heavy neckwear rests effortlessly without tension.',
    technicalDetails: 'Concealed hinge engineering, tension-tested bezels, and sovereign weight validation.',
    atelierNote: 'Our master goldsmiths represent fourth-generation lineages from Jaipur, Hyderabad, and Bengal.',
    tool: 'Jeweller\'s Saw, Piercing Needle & Anvil',
    image: solitaires1
  },
  {
    step: 'STAGE 04',
    title: 'THE ENAMEL FIRE',
    hindiName: 'MEENAKARI • FIVE-FIRE VITREOUS ENAMEL',
    subheading: 'Reverse Articulation for Secret Intimacy',
    description: 'The back of every royal piece is engraved and filled with pulverized glass enamel, fired five times at 850°C. Known only to the wearer, this secret garden of colors rests directly against the skin.',
    technicalDetails: 'Temperature ramp regulation, natural lapis lazuli and cobalt oxides, zero-bubble vitreous melting.',
    atelierNote: 'Only two living master enamellers in Jaipur retain the secret formula for Aurevya imperial crimson.',
    tool: 'Muffle Kiln & Fine Stylus Engraver',
    image: diamond5
  },
  {
    step: 'STAGE 05',
    title: 'THE JADAU SETTING',
    hindiName: 'JADAI • PURE 24K GOLD REFLECTIVE FOIL',
    subheading: 'Hyper-Reflective Foil Cold-Setting',
    description: 'Uncut Polki diamonds are set over custom-shaped 24K gold foil (daak) without heat or solder. The gold foil reflects ambient daylight through the stone like an antique mirror.',
    technicalDetails: 'Pure 24K hyper-refined foil, micro-tamped gold setting walls, airtight gemstone seals.',
    atelierNote: 'No modern mechanical machine can replicate the tactile touch required to compress Jadau foil.',
    tool: 'Chisel-Tipped Salai & Agate Burnisher',
    image: bangles3
  },
  {
    step: 'STAGE 06',
    title: 'THE LUSTRE',
    hindiName: 'MANJHAI • AGATE & DIAMOND PLANISHING',
    subheading: 'Seventeen Phases of Hand Finishing',
    description: 'Gold surfaces are burnished with natural agates and walnut-shell wood laps to achieve Aurevya\'s signature silky satin-warmth without compromising crisp architectural facet lines.',
    technicalDetails: 'Microscopic inspection under 40x magnification, ultrasonic cleansing, BIS hallmark touchmark application.',
    atelierNote: 'A single necklace undergoes seventeen independent polishing phases between setting tiers.',
    tool: 'Hand Agate Burnishers & Diamond Lapping Paste',
    image: solitaires3
  },
  {
    step: 'STAGE 07',
    title: 'THE PROVENANCE',
    hindiName: 'SILSILA • PERMANENT HOUSE ARCHIVE',
    subheading: 'Registration in the Sovereign Registry',
    description: 'The finished jewel is registered in the permanent House Ledger, sealed in an archival leather trunk, and accompanied by dual Swiss gemmological lab reports and a life-size gouache artwork.',
    technicalDetails: 'Individually serialized registry number, lifetime atelier care passport, diplomatic armored delivery.',
    atelierNote: 'Aurevya pieces are made once, designed to endure for centuries, passing down generations as sacred heirlooms.',
    tool: 'Archival Calligraphy Quill & Wax Seal Stamp',
    image: rare1
  }
];
