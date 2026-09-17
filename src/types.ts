export type CategoryType = 
  | 'high-jewellery'
  | 'bridal'
  | 'solitaires'
  | 'earrings'
  | 'bangles'
  | 'bracelets'
  | 'necklaces'
  | 'sets'
  | 'gemstones'
  | 'rings'
  | 'all';

export type StoneType = 
  | 'Emerald'
  | 'Diamond'
  | 'Ruby'
  | 'Sapphire'
  | 'Pearl'
  | 'Polki';

export type MetalType = 
  | '18K Yellow Gold'
  | '18K Rose Gold'
  | '18K White Gold'
  | '22K Gold'
  | 'Platinum';

export interface GemstoneSpec {
  type: string;
  weight: string;
  origin: string;
  clarity: string;
  color: string;
  cut: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  collection: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  category: CategoryType;
  primaryStone: StoneType;
  metal: MetalType;
  description: string;
  provenance: string;
  craftsmanshipHours: number;
  certification: string;
  images: string[];
  macroImage: string;
  modelImage: string;
  specs: GemstoneSpec[];
  dimensions: string;
  totalWeight: string;
  goldPurity: string;
  inStock: boolean;
  featured?: boolean;
  limitedEdition?: string;
  editorialQuote?: string;
  tryOnCompatible: boolean;
  tryOnType: 'necklace' | 'earrings' | 'ring' | 'bangle';
  tryOnOverlayUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  bespokeEngraving?: string;
}

export interface AppointmentData {
  name: string;
  phone: string;
  email: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  appointmentType: 'PRIVATE BOUTIQUE VIEWING' | 'VIDEO CONSULTATION' | 'BESPOKE COMMISSION' | 'AI STYLE CONSULTATION';
  jewelleryInterest: string;
  message?: string;
}

export interface BespokeCommissionData {
  occasion: string;
  jewelleryType: string;
  preferredGemstone: string;
  metal: string;
  budgetRange: string;
  timeline: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  category: 'THE WORLD OF GEMSTONES' | 'THE ATELIER' | 'STYLE' | 'HERITAGE' | 'COLLECTOR\'S EDIT' | 'BRIDAL';
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  author: string;
  paragraphs: string[];
}

export interface SavedLook {
  id: string;
  pieceId: string;
  pieceTitle: string;
  piecePrice: string;
  category: string;
  imageUrl: string;
  userImage?: string;
  lighting: string;
  date: string;
  notes?: string;
}

export interface JewelleryDNA {
  dominantStone: StoneType;
  dominantStyle: 'Quietly Regal' | 'Architectural' | 'Imperial Grandeur' | 'Contemporary Minimal' | 'Heirloom Romance';
  statementLevel: 'Subtle & Intimate' | 'Refined Statement' | 'Sovereign Presence';
  preferredOccasion: string;
  affinityScore: number;
  summary: string;
  curatedPieceIds: string[];
}

export type OccasionType =
  | 'wedding'
  | 'engagement'
  | 'red-carpet'
  | 'gala'
  | 'anniversary'
  | 'private-moment';

export interface OccasionInfo {
  id: OccasionType;
  title: string;
  microcopy: string;
  leadQuote: string;
  atmosphereTone: 'emerald' | 'ruby' | 'sapphire' | 'pearl';
  bannerImage: string;
  stylingNotes: string;
  recommendedProductIds: string[];
}
