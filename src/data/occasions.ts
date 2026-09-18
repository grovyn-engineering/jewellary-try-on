import { OccasionInfo } from '../types';
import necklace1 from '../images/necklace1.jpg';
import necklace2 from '../images/necklace2.jpg';
import necklace3 from '../images/necklace3.jpg';
import earrings1 from '../images/earinings1.jpg';
import diamond2 from '../images/diamond2.jpg';
import diamond5 from '../images/diamond5.jpg';
import bangles1 from '../images/bangles1.webp';
import rare1 from '../images/rare1.jpg';

export const OCCASIONS: OccasionInfo[] = [
  {
    id: 'red-carpet',
    title: 'THE RED CARPET',
    microcopy: 'Make an entrance.',
    leadQuote: 'High-contrast architectural silhouettes that capture blinding flashbulbs and hold the room in quiet awe.',
    atmosphereTone: 'emerald',
    bannerImage: rare1,
    stylingNotes: 'Prioritize singular sovereign statement necklaces with decolletage balance. Pair with low-key hair architecture to spotlight the collar.',
    recommendedProductIds: ['aur-01', 'aur-03', 'aur-08', 'aur-09']
  },
  {
    id: 'wedding',
    title: 'THE WEDDING',
    microcopy: 'For the beginning of forever.',
    leadQuote: 'Imperial regalia hand-crafted to endure as a royal family heirloom across generations.',
    atmosphereTone: 'ruby',
    bannerImage: necklace1,
    stylingNotes: 'Multi-tiered Polki diamond chokers paired with Basra pearl drops and reverse Meenakari enameling.',
    recommendedProductIds: ['aur-02', 'aur-07', 'aur-08', 'aur-11']
  },
  {
    id: 'gala',
    title: 'THE GALA',
    microcopy: 'Commanding presence under chandeliers.',
    leadQuote: 'Vivid gemstones reflecting candlelight with hypnotic scintillation and kinetic fluidity.',
    atmosphereTone: 'sapphire',
    bannerImage: necklace2,
    stylingNotes: 'Royal Blue Ceylon sapphires and Type IIa solitaires tailored to grand ballrooms and private museum dinners.',
    recommendedProductIds: ['aur-09', 'aur-05', 'aur-03', 'aur-01']
  },
  {
    id: 'engagement',
    title: 'THE ENGAGEMENT',
    microcopy: 'A pledge carved in sovereign stone.',
    leadQuote: 'Type IIa chemically pure diamonds that hold water-clear starlight within their limpid bodies.',
    atmosphereTone: 'pearl',
    bannerImage: diamond5,
    stylingNotes: 'Solitaires exceeding 5 carats mounted on floating platinum architectural galleries with tapered baguettes.',
    recommendedProductIds: ['aur-05', 'aur-10', 'aur-13', 'aur-06']
  },
  {
    id: 'anniversary',
    title: 'THE ANNIVERSARY',
    microcopy: 'Time crystallized in brilliance.',
    leadQuote: 'Celebrating milestone devotion with gemstones that took millions of years to forge.',
    atmosphereTone: 'ruby',
    bannerImage: earrings1,
    stylingNotes: 'Untreated Burmese pigeon blood rubies and Deccan rose-cut diamonds mounted in warm 18K yellow gold.',
    recommendedProductIds: ['aur-06', 'aur-12', 'aur-01', 'aur-04']
  },
  {
    id: 'private-moment',
    title: 'THE PRIVATE MOMENT',
    microcopy: 'Quietly unforgettable.',
    leadQuote: 'Intimate masterpieces designed for personal pleasure, tactile connection, and secret beauty.',
    atmosphereTone: 'pearl',
    bannerImage: bangles1,
    stylingNotes: 'Subtle diamond studs, delicate openwork kada bangles, and pendants carrying private inscriptions.',
    recommendedProductIds: ['aur-10', 'aur-13', 'aur-04', 'aur-07']
  }
];
