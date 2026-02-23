
import React, { useRef, useState } from 'react';
import { FertilityLevel, SoilAnalysis } from '../types';
import NutrientChart from './NutrientChart';

interface DashboardProps {
  isAnalyzing: boolean;
  error: string | null;
  currentResult: SoilAnalysis | null;
  onAnalyze: (image: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isAnalyzing, error, currentResult, onAnalyze }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onAnalyze(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Upload Section */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Start New Analysis</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Upload a high-resolution photo of your soil sample. Ensure the photo is taken in natural daylight for the most accurate fertility assessment.
          </p>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <button 
            onClick={triggerUpload}
            disabled={isAnalyzing}
            className={`w-full py-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
              isAnalyzing 
                ? 'bg-slate-50 border-slate-200 cursor-not-allowed' 
                : 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100 group'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-slate-500 font-medium">Analyzing Soil Profile...</span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <span className="text-emerald-700 font-semibold text-lg">Upload Soil Photo</span>
                <span className="text-slate-400 text-sm mt-1">PNG, JPG, or Camera Capture</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        {preview && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Analysis Image</h3>
            <img src={preview} alt="Soil Preview" className="w-full h-64 object-cover rounded-xl border border-slate-100" />
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7">
        {!currentResult && !isAnalyzing ? (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">No Analysis Results</h2>
            <p className="text-slate-500 max-w-sm mt-2">
              Results will appear here once you upload and analyze a soil sample.
            </p>
          </div>
        ) : isAnalyzing ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-32 bg-slate-200 rounded-2xl"></div>
            <div className="h-64 bg-slate-200 rounded-2xl"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-slate-200 rounded-xl"></div>
              <div className="h-32 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Fertility Badge Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Fertility Level</span>
                <div className="flex items-center mt-1">
                  <h2 className={`text-4xl font-black ${
                    currentResult!.fertilityLevel === FertilityLevel.HIGH ? 'text-emerald-600' :
                    currentResult!.fertilityLevel === FertilityLevel.MEDIUM ? 'text-amber-500' : 'text-rose-500'
                  }`}>
                    {currentResult!.fertilityLevel}
                  </h2>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">AI Confidence</span>
                <div className="text-2xl font-bold text-slate-700 mt-1">{(currentResult!.confidence * 100).toFixed(1)}%</div>
              </div>
            </div>

            {/* Nutrient Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Nutrient Concentration Estimate</h3>
              <div className="h-[300px] w-full">
                <NutrientChart profile={currentResult!.nutrientProfile} />
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h3 className="text-amber-800 font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Soil Characteristics
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-amber-700/60 uppercase">Soil Type</div>
                    <div className="text-slate-800 font-medium">{currentResult!.soilType}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-amber-700/60 uppercase">Organic Matter</div>
                    <div className="text-slate-800 font-medium">{currentResult!.organicMatterEstimate}</div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="text-emerald-800 font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Recommendation
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-emerald-700/60 uppercase">Fertilizer</div>
                    <div className="text-slate-800 font-medium">{currentResult!.recommendations.fertilizerType}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-700/60 uppercase">Dosage</div>
                    <div className="text-slate-800 font-medium">{currentResult!.recommendations.dosage}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Scientific Notes</h3>
              <p className="text-slate-600 leading-relaxed italic">
                "{currentResult!.recommendations.notes}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
