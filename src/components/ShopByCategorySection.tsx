import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import necklace1 from '../images/necklace1.jpg';
import necklace2 from '../images/necklace2.jpg';
import necklace3 from '../images/necklace3.jpg';
import earrings1 from '../images/earinings1.jpg';
import earrings2 from '../images/earings2.jpg';
import bangles1 from '../images/bangles1.webp';
import bangles2 from '../images/bangles2.jpeg';
import diamond2 from '../images/diamond2.jpg';
import diamond5 from '../images/diamond5.jpg';
import solitaires1 from '../images/solitaires1.jpeg';
import solitaires3 from '../images/solitaires3.webp';
import rare1 from '../images/rare1.jpg';
import rare2 from '../images/rare2.jpg';

interface CategoryItem {
  id: string;
  name: string;
  path: string;
  count: number;
  image: string;
  description: string;
}

export const ShopByCategorySection: React.FC = () => {
  const { navigate } = useShop();

  const categories: CategoryItem[] = [
    {
      id: 'high-jewellery',
      name: 'High Jewellery',
      path: '/collections/high-jewellery',
      count: PRODUCTS.filter(p => p.category === 'high-jewellery' || p.featured).length || 6,
      image: rare1,
      description: 'Pièces uniques and museum colliers'
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      path: '/collections/necklaces',
      count: PRODUCTS.filter(p => p.category === 'necklaces' || p.category === 'high-jewellery').length || 7,
      image: necklace1,
      description: 'Architectural pendants and cascading collars'
    },
    {
      id: 'earrings',
      name: 'Earrings',
      path: '/collections/earrings',
      count: PRODUCTS.filter(p => p.category === 'earrings').length || 8,
      image: earrings1,
      description: 'Chandelier drops, ear cuffs, and studs'
    },
    {
      id: 'rings',
      name: 'Rings',
      path: '/collections/rings',
      count: PRODUCTS.filter(p => p.category === 'rings').length || 6,
      image: diamond5,
      description: 'Sovereign solitaires and cocktail bands'
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      path: '/collections/bracelets',
      count: PRODUCTS.filter(p => p.category === 'bracelets').length || 4,
      image: bangles1,
      description: 'Articulated cuffs and diamond tennis rows'
    },
    {
      id: 'bangles',
      name: 'Bangles',
      path: '/collections/bangles',
      count: PRODUCTS.filter(p => p.category === 'bangles' || p.category === 'bracelets').length || 5,
      image: bangles2,
      description: 'Imperial Jadau kadas and pave spirals'
    },
    {
      id: 'sets',
      name: 'Sets',
      path: '/collections/sets',
      count: 3,
      image: necklace2,
      description: 'Coordinated parures for celebratory gala'
    },
    {
      id: 'solitaire',
      name: 'Solitaires',
      path: '/collections/solitaire',
      count: 4,
      image: solitaires1,
      description: 'Type IIa Golconda diamonds and untreated cuts'
    },
    {
      id: 'bridal',
      name: 'Bridal',
      path: '/collections/bridal',
      count: 6,
      image: necklace3,
      description: 'Heirloom trousseau and imperial jadau'
    },
    {
      id: 'gemstones',
      name: 'Gemstones',
      path: '/collections/gemstones',
      count: 8,
      image: solitaires3,
      description: 'Muzo emeralds, Burma rubies, and Kashmir sapphires'
    }
  ];

  return (
    <section className="relative w-full bg-[#F8F5EE] text-[#171717] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#171717]/10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#171717]/12">
          <div className="space-y-2">
            <span className="text-[9px] font-sans tracking-[0.32em] uppercase text-[#A98B58] font-semibold block">
              CATEGORY ARCHITECTURE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-light leading-tight">
              Explore by Creation
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#5F5A52] font-light max-w-md leading-relaxed">
            Ten distinct expressions of architectural fine jewellery, conceived with untreated gemstones and crafted for lifelong permanence.
          </p>
        </div>

        {/* Responsive Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className="group cursor-pointer flex flex-col bg-[#FCFAF6] border border-[#171717]/10 hover:border-[#A98B58] transition-all duration-500 shadow-xs hover:shadow-md"
            >
              {/* Category Image with Subtle Hover Scale */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EEE8DE]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                
                {/* Micro Count Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#FCFAF6]/90 backdrop-blur-xs text-[8px] font-sans font-medium text-[#171717] border border-[#171717]/10">
                  {cat.count} PIECES
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#FCFAF6]/90 flex items-center justify-center text-[#171717] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5">
                  <ArrowUpRight size={13} />
                </div>
              </div>

              {/* Category Metadata */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#171717] group-hover:text-[#A98B58] transition-colors font-light leading-snug">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[11px] text-[#5F5A52] font-light mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
