import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, SavedLook, JewelleryDNA, OccasionType, StoneType } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  currentPath: string;
  navigate: (path: string) => void;
  // Wishlist & Private Edit
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Bag & Acquisition
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, bespokeEngraving?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  cartTotal: number;
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Virtual Mirror
  isTryOnOpen: boolean;
  setIsTryOnOpen: (open: boolean) => void;
  activeTryOnProduct: Product;
  setActiveTryOnProduct: (product: Product) => void;
  openTryOnForProduct: (product: Product) => void;
  // Appointments & Curations
  appointmentModalOpen: boolean;
  setAppointmentModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  preselectedJewel: string;
  setPreselectedJewel: (jewel: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // FINAL EXPERIENCE LAYER
  // 01. Recently Viewed & Jewellery DNA
  recentlyViewed: string[];
  trackProductView: (product: Product) => void;
  jewelleryDNA: JewelleryDNA;
  // 02. Compare Looks & Saved Looks
  savedLooks: SavedLook[];
  addSavedLook: (look: SavedLook) => void;
  removeSavedLook: (lookId: string) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  compareLookIds: [string, string];
  setCompareLookIds: (ids: [string, string]) => void;
  // 03. Social Share Look Card
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  shareLook: SavedLook | null;
  openShareModal: (look: SavedLook) => void;
  // 04. Occasion Discovery
  activeOccasion: OccasionType;
  setActiveOccasion: (occ: OccasionType) => void;
  // 05. Aurevya Concierge
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  conciergeInitialIntent?: string;
  openConciergeWithIntent: (intent: string) => void;
  // 06. Provenance Dossier
  provenanceProduct: Product | null;
  isProvenanceOpen: boolean;
  openProvenance: (product: Product) => void;
  setIsProvenanceOpen: (open: boolean) => void;
  // 07. Contextual Jewel-Tone Atmosphere
  atmosphereGemstone: StoneType | null;
  setAtmosphereGemstone: (stone: StoneType | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial mock looks so patrons immediately experience the comparison feature
const INITIAL_SAVED_LOOKS: SavedLook[] = [
  {
    id: 'look-01',
    pieceId: 'aur-01',
    pieceTitle: 'The Noor-E-Nizam',
    piecePrice: '₹18,45,000',
    category: 'High Jewellery Collar',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    lighting: 'Salon Daylight',
    date: '14 Sept 2026',
    notes: 'Anatomical fit evaluated with Colombian emerald collar drape.'
  },
  {
    id: 'look-02',
    pieceId: 'aur-02',
    pieceTitle: 'The Maharani Gala Choker',
    piecePrice: '₹36,50,000',
    category: 'Royal Bridal Regalia',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
    lighting: 'Candlelight Sovereign',
    date: '14 Sept 2026',
    notes: 'Persian Gulf natural pearl rows with reverse Meenakari aura.'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurevya_wishlist');
      return saved ? JSON.parse(saved) : ['aur-01', 'aur-03'];
    } catch {
      return ['aur-01', 'aur-03'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurevya_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from Private Edit');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(product ? `Saved ${product.title} to Private Edit` : 'Added to Private Edit');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart / Bag
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurevya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurevya_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, bespokeEngraving?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, bespokeEngraving }];
    });
    showToast(`Added ${product.title} to Salon Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Piece removed from Salon Bag');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [activeTryOnProduct, setActiveTryOnProduct] = useState<Product>(PRODUCTS[0]);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [preselectedJewel, setPreselectedJewel] = useState('');

  const openTryOnForProduct = (product: Product) => {
    setActiveTryOnProduct(product);
    setIsTryOnOpen(true);
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // FINAL EXPERIENCE LAYER STATES
  // 1. Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurevya_recent_views');
      return saved ? JSON.parse(saved) : ['aur-01', 'aur-02', 'aur-03'];
    } catch {
      return ['aur-01', 'aur-02', 'aur-03'];
    }
  });

  const trackProductView = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('aurevya_recent_views', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // 2. Saved AI Looks (for Look Comparison and Social Sharing)
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>(() => {
    try {
      const saved = localStorage.getItem('aurevya_saved_looks');
      return saved ? JSON.parse(saved) : INITIAL_SAVED_LOOKS;
    } catch {
      return INITIAL_SAVED_LOOKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurevya_saved_looks', JSON.stringify(savedLooks));
    } catch {
      // ignore
    }
  }, [savedLooks]);

  const addSavedLook = (look: SavedLook) => {
    setSavedLooks(prev => [look, ...prev]);
    showToast(`Look with ${look.pieceTitle} saved to your Private Edit`);
  };

  const removeSavedLook = (lookId: string) => {
    setSavedLooks(prev => prev.filter(l => l.id !== lookId));
    showToast('Look removed from archive');
  };

  // 3. Compare Looks
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareLookIds, setCompareLookIds] = useState<[string, string]>(['look-01', 'look-02']);

  // 4. Social Sharing Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareLook, setShareLook] = useState<SavedLook | null>(null);

  const openShareModal = (look: SavedLook) => {
    setShareLook(look);
    setIsShareModalOpen(true);
  };

  // 5. Occasion Discovery State
  const [activeOccasion, setActiveOccasion] = useState<OccasionType>('red-carpet');

  // 6. Concierge Panel State
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeInitialIntent, setConciergeInitialIntent] = useState<string | undefined>(undefined);

  const openConciergeWithIntent = (intent: string) => {
    setConciergeInitialIntent(intent);
    setIsConciergeOpen(true);
  };

  // 7. Provenance Dossier Modal
  const [provenanceProduct, setProvenanceProduct] = useState<Product | null>(null);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);

  const openProvenance = (product: Product) => {
    setProvenanceProduct(product);
    setIsProvenanceOpen(true);
  };

  // 8. Contextual Atmosphere Gemstone
  const [atmosphereGemstone, setAtmosphereGemstone] = useState<StoneType | null>(null);

  // 9. Intelligent Jewellery DNA Engine
  const jewelleryDNA = useMemo<JewelleryDNA>(() => {
    // Collect all products patron has interacted with (wishlist + recently viewed)
    const interactedIds = Array.from(new Set([...wishlist, ...recentlyViewed]));
    const interactedProducts = PRODUCTS.filter(p => interactedIds.includes(p.id));

    // Count stones
    const stoneCounts: Record<string, number> = {};
    interactedProducts.forEach(p => {
      stoneCounts[p.primaryStone] = (stoneCounts[p.primaryStone] || 0) + 1;
    });

    let dominantStone: StoneType = 'Emerald';
    let maxStoneCount = 0;
    Object.entries(stoneCounts).forEach(([stone, count]) => {
      if (count > maxStoneCount) {
        maxStoneCount = count;
        dominantStone = stone as StoneType;
      }
    });

    // Average price to evaluate statement level
    const avgPrice = interactedProducts.reduce((sum, p) => sum + p.price, 0) / (interactedProducts.length || 1);
    let statementLevel: JewelleryDNA['statementLevel'] = 'Refined Statement';
    if (avgPrice > 2000000) {
      statementLevel = 'Sovereign Presence';
    } else if (avgPrice < 700000) {
      statementLevel = 'Subtle & Intimate';
    }

    // Determine aesthetic style
    let dominantStyle: JewelleryDNA['dominantStyle'] = 'Quietly Regal';
    if (dominantStone === 'Emerald') {
      dominantStyle = 'Quietly Regal';
    } else if (dominantStone === 'Polki') {
      dominantStyle = 'Imperial Grandeur';
    } else if (dominantStone === 'Diamond') {
      dominantStyle = 'Architectural';
    } else if (dominantStone === 'Ruby') {
      dominantStyle = 'Heirloom Romance';
    } else {
      dominantStyle = 'Contemporary Minimal';
    }

    // Curate 3 recommended pieces fitting this DNA
    const curatedPieceIds = PRODUCTS
      .filter(p => p.primaryStone === dominantStone || p.category === 'high-jewellery')
      .slice(0, 3)
      .map(p => p.id);

    return {
      dominantStone,
      dominantStyle,
      statementLevel,
      preferredOccasion: activeOccasion === 'red-carpet' ? 'Red Carpet & Gala' : 'Imperial Celebrations',
      affinityScore: 94,
      summary: `Your edit leans toward ${dominantStyle.toLowerCase()} pieces with ${dominantStone.toLowerCase()} sovereignty and ${statementLevel.toLowerCase()} silhouette balance.`,
      curatedPieceIds
    };
  }, [wishlist, recentlyViewed, activeOccasion]);

  return (
    <ShopContext.Provider
      value={{
        currentPath,
        navigate,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isTryOnOpen,
        setIsTryOnOpen,
        activeTryOnProduct,
        setActiveTryOnProduct,
        openTryOnForProduct,
        appointmentModalOpen,
        setAppointmentModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        preselectedJewel,
        setPreselectedJewel,
        toastMessage,
        showToast,
        // Final Experience Layer
        recentlyViewed,
        trackProductView,
        jewelleryDNA,
        savedLooks,
        addSavedLook,
        removeSavedLook,
        isCompareOpen,
        setIsCompareOpen,
        compareLookIds,
        setCompareLookIds,
        isShareModalOpen,
        setIsShareModalOpen,
        shareLook,
        openShareModal,
        activeOccasion,
        setActiveOccasion,
        isConciergeOpen,
        setIsConciergeOpen,
        conciergeInitialIntent,
        openConciergeWithIntent,
        provenanceProduct,
        isProvenanceOpen,
        openProvenance,
        setIsProvenanceOpen,
        atmosphereGemstone,
        setAtmosphereGemstone
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
