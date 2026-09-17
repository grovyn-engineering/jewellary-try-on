import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Clock, Calendar, X, Sparkles } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { navigate, setAppointmentModalOpen } = useShop();
  const [selectedArticle, setSelectedArticle] = useState<typeof JOURNAL_ARTICLES[0] | null>(null);

  return (
    <div className="bg-[#0B0B0A] text-[#EEE9DF] min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-[#B9975B]/20 text-center">
        <span className="text-[9px] tracking-[0.45em] uppercase text-[#B9975B] font-sans block mb-3">
          HAUTE JOAILLERIE DISPATCHES
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F7F4EE] font-light mb-4">
          The Aurevya Gazette
        </h1>
        <p className="text-xs sm:text-sm text-[#8A8175] font-light max-w-xl mx-auto leading-relaxed">
          Critical essays on rare gemmology, imperial court regalia provenance, and the architecture of precious metals.
        </p>
      </div>

      {/* Featured Lead Article */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div
          onClick={() => setSelectedArticle(JOURNAL_ARTICLES[0])}
          className="group cursor-pointer border border-[#B9975B]/25 hover:border-[#B9975B]/60 p-6 md:p-10 bg-[#12100E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-[#B9975B]/20 bg-[#141210]">
            <img
              src={JOURNAL_ARTICLES[0].coverImage}
              alt={JOURNAL_ARTICLES[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <span className="absolute top-4 left-4 bg-[#0B0B0A]/85 text-[8px] tracking-[0.25em] text-[#B9975B] px-3 py-1 font-sans border border-[#B9975B]/30 uppercase">
              LEAD EDITORIAL
            </span>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-[10px] text-[#8A8175] font-sans uppercase mb-3">
                <span>{JOURNAL_ARTICLES[0].category}</span>
                <span>•</span>
                <span>{JOURNAL_ARTICLES[0].date}</span>
                <span>•</span>
                <span>{JOURNAL_ARTICLES[0].readTime}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE] group-hover:text-[#B9975B] transition-colors leading-tight mb-4">
                {JOURNAL_ARTICLES[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-[#8A8175] font-light leading-relaxed mb-6">
                {JOURNAL_ARTICLES[0].excerpt}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-[#D8C7A0] tracking-wider uppercase">
              <span>READ ESSAY</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Remaining Articles */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer border border-[#B9975B]/20 hover:border-[#B9975B]/60 p-6 bg-[#12100E] flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border border-[#B9975B]/15 mb-5 bg-[#171412]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#0B0B0A]/85 text-[8px] tracking-[0.2em] text-[#B9975B] uppercase px-2 py-0.5">
                    {article.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[9px] text-[#8A8175] font-sans uppercase mb-2">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-[#F7F4EE] group-hover:text-[#B9975B] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>
                <p className="text-xs text-[#8A8175] font-light leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#B9975B]/10 mt-6 flex items-center justify-between text-[9px] text-[#D8C7A0] uppercase tracking-wider">
                <span>FULL DISPATCH</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0B0B0A]/95 backdrop-blur-xl">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedArticle(null)}
          />

          <div className="relative w-full max-w-3xl bg-[#0B0B0A] border border-[#B9975B]/40 p-6 md:p-12 z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-[#8A8175] hover:text-[#B9975B] transition-colors"
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            <span className="text-[9px] tracking-[0.35em] uppercase text-[#B9975B] font-sans block mb-2">
              {selectedArticle.category} • {selectedArticle.date}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F7F4EE] leading-tight mb-4">
              {selectedArticle.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#8A8175] border-b border-[#B9975B]/15 pb-6 mb-6">
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden border border-[#B9975B]/20 mb-8">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="font-serif text-base sm:text-lg text-[#D8C7A0] leading-relaxed mb-6 italic">
              "{selectedArticle.excerpt}"
            </div >

            <div className="text-xs sm:text-sm text-[#EEE9DF]/80 font-light leading-relaxed space-y-4 border-t border-[#B9975B]/15 pt-6">
              {selectedArticle.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#B9975B]/20 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setAppointmentModalOpen(true);
                }}
                className="px-6 py-3 border border-[#B9975B] bg-[#173C32] text-xs uppercase tracking-widest text-[#F7F4EE]"
              >
                Inquire With Atelier
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs uppercase tracking-widest text-[#8A8175] hover:text-[#EEE9DF]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
