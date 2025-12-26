import React from 'react';
import { FeatureType, FeatureData, NewsData, QuoteData, ImageData } from '../types';

interface ContentCardProps {
  type: FeatureType;
  data: FeatureData;
  loading: boolean;
  onRefresh: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ type, data, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center rounded-3xl glass-panel p-8 text-stone-500 animate-pulse">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-rose-300 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-light animate-bounce">
            {type === FeatureType.NEWS && "Dünyadan güzel haberler aranıyor..."}
            {type === FeatureType.QUOTE && "Umut veren bir söz aranıyor..."}
            {type === FeatureType.FRIENDS && "Sevimli dostumuz hazırlanıyor..."}
            {type === FeatureType.SCENES && "Huzurlu bir manzara resmediliyor..."}
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full rounded-3xl glass-panel shadow-2xl overflow-hidden fade-in flex flex-col relative">
      <div className="p-8 flex-grow flex flex-col items-center justify-center text-center">
        
        {/* Render News */}
        {type === FeatureType.NEWS && (
          <div className="space-y-4 max-w-lg">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase">
              {(data as NewsData).location || 'Dünya'}
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-800 leading-tight">
              {(data as NewsData).headline}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              {(data as NewsData).summary}
            </p>
          </div>
        )}

        {/* Render Quote */}
        {type === FeatureType.QUOTE && (
          <div className="space-y-6 max-w-lg">
            <svg className="w-10 h-10 text-rose-300 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24">
               <path d="M14.017 21L14.017 18C14.017 16.0547 15.3533 14.7188 17.5857 14.7188C18.1729 14.7188 18.7291 14.8086 19.2319 14.9756V10.2549C18.6656 10.1553 18.0699 10.1162 17.4741 10.1162C14.7061 10.1162 12.8715 11.6494 12.2857 14.1553H11.0857L11.0857 21H14.017ZM8.08571 21L8.08571 18C8.08571 16.0547 9.42206 14.7188 11.6545 14.7188C12.2417 14.7188 12.7979 14.8086 13.3006 14.9756V10.2549C12.7344 10.1553 12.1387 10.1162 11.5429 10.1162C8.77494 10.1162 6.94034 11.6494 6.35449 14.1553H5.15449L5.15449 21H8.08571Z" />
            </svg>
            <blockquote className="text-2xl md:text-3xl font-medium text-stone-700 italic font-serif">
              "{(data as QuoteData).text}"
            </blockquote>
            <cite className="block text-stone-500 font-medium not-italic">
              — {(data as QuoteData).author}
            </cite>
          </div>
        )}

        {/* Render Image (Friend or Scene) */}
        {(type === FeatureType.FRIENDS || type === FeatureType.SCENES) && (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
            <img 
              src={(data as ImageData).url} 
              alt={(data as ImageData).description} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-white/90 text-sm font-medium text-center">
                {(data as ImageData).description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="p-4 bg-white/40 border-t border-white/40 flex justify-center gap-4">
        <button 
          onClick={onRefresh}
          className="px-6 py-2 rounded-full bg-stone-800 text-white font-medium hover:bg-stone-700 transition-colors shadow-lg active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Yenile
        </button>
      </div>
    </div>
  );
};