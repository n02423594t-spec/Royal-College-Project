
import React from 'react';
import { Link } from 'react-router-dom';
import { SoilAnalysis, FertilityLevel } from '../types';

interface HistoryProps {
  history: SoilAnalysis[];
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No History Yet</h2>
        <p className="text-slate-500 mt-2 mb-8">You haven't performed any soil analyses yet.</p>
        <Link to="/" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
          Start Analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">ANALYSIS HISTORY</h1>
          <p className="text-slate-500 mt-1">Review and manage your academic soil sample records.</p>
        </div>
        <div className="bg-slate-200 px-4 py-1 rounded-full text-slate-600 text-sm font-bold">
          {history.length} Records
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.map((record) => (
          <div key={record.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-32 h-24 flex-shrink-0">
              <img src={record.image} alt="Soil" className="w-full h-full object-cover rounded-xl border border-slate-100" />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-1">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase ${
                  record.fertilityLevel === FertilityLevel.HIGH ? 'bg-emerald-100 text-emerald-700' :
                  record.fertilityLevel === FertilityLevel.MEDIUM ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {record.fertilityLevel} Fertility
                </span>
                <span className="text-slate-400 text-sm">{new Date(record.timestamp).toLocaleDateString()} at {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{record.soilType} Soil Profile</h3>
              <p className="text-slate-500 text-sm line-clamp-1 italic">"{record.recommendations.notes}"</p>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Link 
                to={`/analysis/${record.id}`} 
                className="flex-grow md:flex-none px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-center transition-colors"
              >
                View Report
              </Link>
              <button 
                onClick={() => { if(confirm('Delete this record?')) onDelete(record.id) }}
                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
