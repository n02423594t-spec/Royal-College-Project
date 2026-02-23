
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { SoilAnalysis, FertilityLevel, AnalysisState } from './types';
import { analyzeSoilImage } from './services/geminiService';
import Dashboard from './components/Dashboard';
import History from './components/History';
import AnalysisDetails from './components/AnalysisDetails';
import Header from './components/Header';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    error: null,
    currentResult: null,
    history: [],
  });

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('fertile_map_history');
    if (savedHistory) {
      try {
        setState(prev => ({ ...prev, history: JSON.parse(savedHistory) }));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleAnalysis = useCallback(async (image: string) => {
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));
    try {
      const result = await analyzeSoilImage(image);
      const fullResult: SoilAnalysis = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        image,
        fertilityLevel: result.fertilityLevel as FertilityLevel,
        confidence: result.confidence || 0.85,
        soilType: result.soilType || 'Loamy',
        organicMatterEstimate: result.organicMatterEstimate || 'Unknown',
        nutrientProfile: result.nutrientProfile || { nitrogen: 50, phosphorus: 50, potassium: 50 },
        recommendations: result.recommendations || {
          fertilizerType: 'Balanced NPK',
          dosage: 'Standard application',
          notes: 'No specific notes available.'
        }
      };

      setState(prev => {
        const newHistory = [fullResult, ...prev.history];
        localStorage.setItem('fertile_map_history', JSON.stringify(newHistory));
        return {
          ...prev,
          isAnalyzing: false,
          currentResult: fullResult,
          history: newHistory
        };
      });
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        error: 'Failed to analyze soil. Please ensure you uploaded a clear image of soil.' 
      }));
    }
  }, []);

  const deleteRecord = (id: string) => {
    setState(prev => {
      const newHistory = prev.history.filter(h => h.id !== id);
      localStorage.setItem('fertile_map_history', JSON.stringify(newHistory));
      return { ...prev, history: newHistory };
    });
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                isAnalyzing={state.isAnalyzing} 
                error={state.error} 
                currentResult={state.currentResult}
                onAnalyze={handleAnalysis}
              />
            } />
            <Route path="/history" element={
              <History 
                history={state.history} 
                onDelete={deleteRecord} 
              />
            } />
            <Route path="/analysis/:id" element={
              <AnalysisDetails history={state.history} />
            } />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>Fertile Map © 2024 - Academic Decision Support Tool</p>
            <p className="mt-1">Disclaimer: Not a replacement for professional laboratory testing.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
