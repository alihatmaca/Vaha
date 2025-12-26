import React, { useState, useEffect, useCallback } from 'react';
import { FeatureType, FeatureData } from './types';
import { Button } from './components/Button';
import { ContentCard } from './components/ContentCard';
import * as GeminiService from './services/geminiService';

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureType | null>(null);
  const [data, setData] = useState<FeatureData>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load data based on feature type
  const loadFeatureContent = useCallback(async (type: FeatureType) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      let result: FeatureData = null;
      switch (type) {
        case FeatureType.NEWS:
          result = await GeminiService.fetchGoodNews();
          break;
        case FeatureType.QUOTE:
          result = await GeminiService.fetchDailyQuote();
          break;
        case FeatureType.FRIENDS:
          result = await GeminiService.generateCuteFriendImage();
          break;
        case FeatureType.SCENES:
          result = await GeminiService.generateSerenitySceneImage();
          break;
      }
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Bağlantı sağlanamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle Tab Click
  const handleFeatureClick = (type: FeatureType) => {
    setActiveFeature(type);
    loadFeatureContent(type);
  };

  // Allow retry/refresh
  const handleRefresh = () => {
    if (activeFeature) {
      loadFeatureContent(activeFeature);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8">
      
      {/* Header */}
      <header className="text-center space-y-2 mb-4">
        <h1 className="text-5xl font-bold text-stone-800 tracking-tight font-serif">Vaha.</h1>
        <p className="text-stone-500 font-light text-lg">Zor zamanlarda sığınabileceğiniz huzurlu bir köşe.</p>
      </header>

      {/* Grid Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          label="İyi Haberler"
          icon={<span className="text-emerald-500">🌱</span>}
          onClick={() => handleFeatureClick(FeatureType.NEWS)}
          isActive={activeFeature === FeatureType.NEWS}
          colorClass="bg-emerald-50 hover:bg-emerald-100"
        />
        <Button
          label="Umut Veren Sözler"
          icon={<span className="text-rose-500">✨</span>}
          onClick={() => handleFeatureClick(FeatureType.QUOTE)}
          isActive={activeFeature === FeatureType.QUOTE}
          colorClass="bg-rose-50 hover:bg-rose-100"
        />
        <Button
          label="Sevimli Dostlar"
          icon={<span className="text-amber-500">🐾</span>}
          onClick={() => handleFeatureClick(FeatureType.FRIENDS)}
          isActive={activeFeature === FeatureType.FRIENDS}
          colorClass="bg-amber-50 hover:bg-amber-100"
        />
        <Button
          label="Huzur Köşeleri"
          icon={<span className="text-sky-500">🌅</span>}
          onClick={() => handleFeatureClick(FeatureType.SCENES)}
          isActive={activeFeature === FeatureType.SCENES}
          colorClass="bg-sky-50 hover:bg-sky-100"
        />
      </div>

      {/* Main Content Area */}
      <main className="min-h-[400px] flex flex-col">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center shadow-sm">
            {error}
            <button onClick={handleRefresh} className="ml-2 underline font-semibold">Tekrar Dene</button>
          </div>
        )}

        {/* Initial Empty State */}
        {!activeFeature && !loading && !error && (
          <div className="flex-grow flex flex-col items-center justify-center text-center text-stone-400 p-8 rounded-3xl border-2 border-dashed border-stone-200">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-light">
              Bugün ruhunuz neye ihtiyaç duyuyor? <br />
              Yukarıdan bir kart seçin.
            </p>
          </div>
        )}

        {/* Content Display */}
        {activeFeature && (
          <ContentCard 
            type={activeFeature}
            data={data}
            loading={loading}
            onRefresh={handleRefresh}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-stone-300 text-sm mt-auto pt-8">
        <p>Vaha &copy; {new Date().getFullYear()} • Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;