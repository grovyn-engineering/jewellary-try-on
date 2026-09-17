import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { LuxuryHeader } from './components/LuxuryHeader';
import { LuxuryFooter } from './components/LuxuryFooter';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { VirtualMirrorModal } from './components/VirtualMirrorModal';
import { AppointmentModal } from './components/AppointmentModal';
import { CompareLooksModal } from './components/CompareLooksModal';
import { ShareLookModal } from './components/ShareLookModal';
import { AurevyaConciergePanel } from './components/AurevyaConciergePanel';
import { ProvenanceDossierModal } from './components/ProvenanceDossierModal';
import { QuickViewModal } from './components/QuickViewModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { VirtualMirrorPage } from './pages/VirtualMirrorPage';
import { TheHousePage } from './pages/TheHousePage';
import { AtelierPage } from './pages/AtelierPage';
import { BespokePage } from './pages/BespokePage';
import { AppointmentPage } from './pages/AppointmentPage';
import { JournalPage } from './pages/JournalPage';

import { Sparkles, CheckCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPath, toastMessage, atmosphereGemstone } = useShop();

  const atmosphereBg = {
    'Emerald': 'bg-[#F2F6F3]',
    'Ruby': 'bg-[#FAF4F4]',
    'Sapphire': 'bg-[#F2F5F8]',
    'Diamond': 'bg-[#F7F8FA]',
    'Polki': 'bg-[#FAF7F2]',
    'Basra Pearl': 'bg-[#FAF6F0]'
  }[atmosphereGemstone || ''] || 'bg-[#FCFAF6]';

  // Simple client-side router
  const renderRoute = () => {
    // Check product detail: /product/:slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // Check collections: /collections or /collections/:cat
    if (currentPath.startsWith('/collections')) {
      const segments = currentPath.split('/');
      const cat = segments[2] || 'all';
      return <CollectionsPage initialCategory={cat} />;
    }

    // Direct route matching
    switch (currentPath) {
      case '/ai-try-on':
        return <VirtualMirrorPage />;
      case '/the-house':
        return <TheHousePage />;
      case '/atelier':
        return <AtelierPage />;
      case '/bespoke':
        return <BespokePage />;
      case '/appointment':
        return <AppointmentPage />;
      case '/journal':
        return <JournalPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`relative min-h-screen ${atmosphereBg} text-[#272522] font-sans antialiased transition-colors duration-1000 selection:bg-[#A98B58]/20 selection:text-[#272522]`}>
      {/* Global Luxury Header */}
      <LuxuryHeader />

      {/* Main Routed Page Content */}
      <main className="w-full overflow-hidden">
        {renderRoute()}
      </main>

      {/* Global Luxury Footer */}
      <LuxuryFooter />

      {/* Global Drawers & Modals */}
      <WishlistDrawer />
      <CartDrawer />
      <SearchOverlay />
      <VirtualMirrorModal />
      <AppointmentModal />
      <CompareLooksModal />
      <ShareLookModal />
      <AurevyaConciergePanel />
      <ProvenanceDossierModal />
      <QuickViewModal />

      {/* Haute Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300 pointer-events-none">
          <div className="border border-[#A98B58] bg-[#FCFAF6] text-[#272522] px-5 py-3 shadow-[0_10px_35px_rgba(39,37,34,0.15)] flex items-center gap-3 backdrop-blur-md">
            <Sparkles size={14} className="text-[#A98B58] animate-pulse" />
            <span className="text-xs font-sans tracking-wider uppercase font-medium">
              {toastMessage}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
