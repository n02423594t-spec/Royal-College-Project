
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { NutrientProfile } from '../types';

interface NutrientChartProps {
  profile: NutrientProfile;
}

const NutrientChart: React.FC<NutrientChartProps> = ({ profile }) => {
  const data = [
    { name: 'Nitrogen (N)', value: profile.nitrogen, color: '#10b981' },
    { name: 'Phosphorus (P)', value: profile.phosphorus, color: '#f59e0b' },
    { name: 'Potassium (K)', value: profile.potassium, color: '#3b82f6' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
        />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutrientChart;
