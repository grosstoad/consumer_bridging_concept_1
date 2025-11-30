import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { month: 'Jan', percentBelow: 45, avgDiscount: 15000 },
  { month: 'Feb', percentBelow: 52, avgDiscount: 18500 },
  { month: 'Mar', percentBelow: 48, avgDiscount: 16000 },
  { month: 'Apr', percentBelow: 60, avgDiscount: 22000 },
  { month: 'May', percentBelow: 55, avgDiscount: 19500 },
  { month: 'Jun', percentBelow: 40, avgDiscount: 12000 },
];

export const SellingPerformanceChart = () => {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#f5f5f5" vertical={false} />
          <XAxis dataKey="month" scale="band" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" hide />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" hide />
          <Tooltip 
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
             formatter={(value: number, name: string) => {
                 if (name === 'percentBelow') return [`${value}%`, '% Sold Below Price'];
                 return [`$${value.toLocaleString()}`, 'Avg. Discount'];
             }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar yAxisId="left" dataKey="percentBelow" name="% Sold Below Price" barSize={20} fill="#e4002b" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="avgDiscount" name="Avg. Discount ($)" stroke="#1f2937" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

