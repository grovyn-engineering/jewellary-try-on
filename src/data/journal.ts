import { JournalArticle } from '../types';
import necklace1 from '../images/necklace1.jpg';
import necklace2 from '../images/necklace2.jpg';
import diamond2 from '../images/diamond2.jpg';
import diamond5 from '../images/diamond5.jpg';
import rare1 from '../images/rare1.jpg';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-muzo-green-miracle',
    category: 'THE WORLD OF GEMSTONES',
    title: 'The Verde Deep: Inside the High-Altitude Veins of Muzo',
    subtitle: 'Why the world\'s most coveted emeralds carry an emerald sea within their crystalline heart.',
    date: 'OCTOBER 2024',
    readTime: '6 MIN READ',
    coverImage: diamond5,
    excerpt: 'To hold a historic Colombian emerald is to witness an ancient geological mystery: pure beryl infused with chromium, forming the distinctive jardin that connoisseurs prize above absolute clarity.',
    author: 'Elena Vance, Senior Gemmological Curator',
    paragraphs: [
      'In the cloud forests of Boyacá, emeralds do not form in quiet seclusion. They are born under violent tectonic clashes millions of years ago, where hydrothermal brine met black shale.',
      'Unlike diamonds, which achieve perfection through total crystalline purity, an imperial emerald tells its story through its internal garden, or jardin. Microscopic three-phase inclusions: tiny bubbles of ancient liquid, gas, and halite cubes trapped since prehistoric epochs.',
      'When our master lapidaries examine rough crystals from Muzo, they spend months studying how ambient light travels through the stone. Only when the facet angles are mathematically calculated to amplify the natural blue-green dispersion do they place chisel to gem.'
    ]
  },
  {
    id: 'art-02',
    slug: 'secrets-of-jadau-enameling',
    category: 'THE ATELIER',
    title: 'The Hidden Reverse: The Forgotten Art of Jaipur Meenakari',
    subtitle: 'Why the most precious part of a royal Indian jewel was traditionally hidden from public sight.',
    date: 'DECEMBER 2024',
    readTime: '8 MIN READ',
    coverImage: rare1,
    excerpt: 'In Mughal and Rajput court culture, the reverse of a necklace was not a structural backing, it was an intimate canvas meant exclusively for the wearer\'s skin.',
    author: 'Virendra Singh Rathore, Master Enamelist',
    paragraphs: [
      'Before modern jewellery turned into mass-market spectacle, high joaillerie was an intimate tactile ritual. The front commanded respect with diamonds and emeralds; the reverse conferred personal joy with vitreous glass enamel.',
      'Each pigment is powdered mineral oxide: cobalt for lapis blue, copper for emerald green, silver and gold for royal ruby reds. The goldsmith engraves delicate grooves into solid 22K gold, fires each color one at a time at escalating temperatures, and finishes with agates and lemon juice.',
      'At Aurevya, we maintain one of only three active ateliers capable of true five-fire champlevé Meenakari. A single reverse plate requires forty hours of solitary handcraft.'
    ]
  },
  {
    id: 'art-03',
    slug: 'golconda-diamonds-type-iia',
    category: 'COLLECTOR\'S EDIT',
    title: 'The Purest Light: Type IIa Diamonds and the Golconda Legacy',
    subtitle: 'Chemically pure carbon with zero detectable nitrogen: the rarest 1% of diamonds on earth.',
    date: 'JANUARY 2025',
    readTime: '5 MIN READ',
    coverImage: diamond2,
    excerpt: 'Golconda diamonds do not simply reflect light; they appear to hold liquid starlight within their limpid bodies, a quality that gem historians describe as water of first water.',
    author: 'Dr. Alistair Finch, Gemmological Historian',
    paragraphs: [
      'Centuries before southern Africa became the diamond center of the modern world, the river valleys between the Godavari and Krishna rivers yielded stones that mesmerized European monarchs and Persian shahs.',
      'What sets Type IIa diamonds apart is the complete absence of nitrogen impurities in the diamond lattice. This allows light to traverse the crystal structure with unparalleled velocity and clarity, resulting in an ethereal, limpid glow.',
      'At Aurevya, our Solitaire collection strictly prioritizes Type IIa certification for stones over three carats, ensuring our patrons acquire not merely gemstones, but geological rarities of generational significance.'
    ]
  },
  {
    id: 'art-04',
    slug: 'modern-bridal-haute-joaillerie',
    category: 'BRIDAL',
    title: 'The Architecture of Vows: The Modern Royal Bridal Suite',
    subtitle: 'Redefining imperial grandeur for the contemporary international bride.',
    date: 'FEBRUARY 2025',
    readTime: '7 MIN READ',
    coverImage: necklace1,
    excerpt: 'Bridal jewellery today must balance supreme weight of tradition with lightness of wear. Discover how architectural articulating joints transform historical chokers into second skins.',
    author: 'Meera Sen-Gupta, Couture Director',
    paragraphs: [
      'The modern bride is global, commanding, and discerning. While she honors her roots through uncut Polki diamonds and South Sea pearls, she demands kinetic comfort that permits effortless movement across international ceremonies.',
      'Our engineers and goldsmiths developed custom concealed ball-and-socket links in solid 22K gold, allowing collars of over 100 carats of gems to curve naturally against the collarbone without pinching or stiffness.',
      'Every Aurevya bridal commission begins with a digital postural scan and an intimate consultation in our private salons in Mumbai, London, or Dubai.'
    ]
  }
];
