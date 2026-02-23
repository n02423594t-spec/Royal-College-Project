
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SoilAnalysis, FertilityLevel } from '../types';
import NutrientChart from './NutrientChart';

interface AnalysisDetailsProps {
  history: SoilAnalysis[];
}

const AnalysisDetails: React.FC<AnalysisDetailsProps> = ({ history }) => {
  const { id } = useParams<{ id: string }>();
  const record = history.find(h => h.id === id);

  if (!record) {
    return <Navigate to="/history" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link to="/history" className="flex items-center text-emerald-700 font-bold hover:underline">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to History
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm font-medium"
        >
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print Report</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 print:shadow-none print:border-none">
        {/* Report Header */}
        <div className="bg-emerald-900 text-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">SOIL FERTILITY REPORT</h1>
              <div className="flex flex-wrap gap-4 text-emerald-100/70 text-sm font-medium uppercase tracking-widest">
                <span>Record ID: {record.id.slice(0, 8)}</span>
                <span>•</span>
                <span>Date: {new Date(record.timestamp).toLocaleDateString()}</span>
                <span>•</span>
                <span>Time: {new Date(record.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
            <div className={`px-8 py-4 rounded-2xl text-2xl font-black shadow-lg border-b-4 ${
              record.fertilityLevel === FertilityLevel.HIGH ? 'bg-emerald-600 border-emerald-800' :
              record.fertilityLevel === FertilityLevel.MEDIUM ? 'bg-amber-500 border-amber-700' : 'bg-rose-500 border-rose-700'
            }`}>
              {record.fertilityLevel} FERTILITY
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          {/* Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-3 text-sm">01</span>
                Sample Imagery
              </h2>
              <div className="relative group">
                <img src={record.image} alt="Soil Sample" className="w-full h-80 object-cover rounded-2xl shadow-md" />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium">
                  Analysis Confidence: {(record.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-3 text-sm">02</span>
                Nutrient Profile
              </h2>
              <div className="bg-slate-50 p-6 rounded-2xl h-64 border border-slate-100">
                <NutrientChart profile={record.nutrientProfile} />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">Nitrogen</div>
                  <div className="font-black text-emerald-800">{record.nutrientProfile.nitrogen}%</div>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <div className="text-[10px] font-bold text-amber-600 uppercase">Phosphorus</div>
                  <div className="font-black text-amber-800">{record.nutrientProfile.phosphorus}%</div>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <div className="text-[10px] font-bold text-blue-600 uppercase">Potassium</div>
                  <div className="font-black text-blue-800">{record.nutrientProfile.potassium}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Soil Classification
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Taxonomy Type</div>
                  <div className="text-xl font-bold text-slate-800">{record.soilType}</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Organic Matter Est.</div>
                  <div className="text-xl font-bold text-slate-800">{record.organicMatterEstimate}</div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Decision Support
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-bold text-emerald-700/60 uppercase tracking-widest mb-1">Suggested Fertilizer</div>
                  <div className="text-xl font-bold text-emerald-900">{record.recommendations.fertilizerType}</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-700/60 uppercase tracking-widest mb-1">Dosage Guidance</div>
                  <div className="text-xl font-bold text-emerald-900">{record.recommendations.dosage}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Analyst Notes & Context</h3>
            <p className="text-slate-600 text-lg leading-relaxed italic">
              "{record.recommendations.notes}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
