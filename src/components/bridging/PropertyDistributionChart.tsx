import React, { 
  BarChart, 
  Bar, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

interface PropertyDistributionChartProps {
  maxPrice: number;
  suburb?: string;
  propertyType?: string;
  isLocked?: boolean;
}

const generateMockData = (meanPrice: number = 1000000) => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    const price = meanPrice * (0.5 + i * 0.1); 
    const count = Math.exp(-Math.pow(price - meanPrice, 2) / (2 * Math.pow(meanPrice * 0.4, 2))) * 100;
    data.push({
      priceRange: `$${(price/1000000).toFixed(1)}m`,
      priceValue: price,
      count: Math.floor(count)
    });
  }
  return data;
};

export const PropertyDistributionChart: React.FC<PropertyDistributionChartProps> = ({ 
  maxPrice, 
  suburb = 'your area',
  propertyType = 'All',
  isLocked = false
}) => {
  const data = generateMockData(1200000); 
  
  const affordableCount = data.filter(d => d.priceValue <= maxPrice).reduce((acc, curr) => acc + curr.count, 0);
  const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);
  const percentage = Math.min(100, Math.round((affordableCount / totalCount) * 100));

  return (
    <div className="p-6">
      
      <div className="mb-6 flex justify-between items-start">
        <div>
            <h3 className="text-lg font-bold text-gray-900">Affordability Analysis</h3>
            {!isLocked ? (
                <p className="text-gray-500 text-sm mt-1">
                Based on your borrowing capacity of <span className="font-semibold text-green-600">${(maxPrice/1000000).toFixed(2)}m</span>, 
                you may be able to afford approximately <span className="font-bold text-gray-900">{percentage}%</span> of {propertyType.toLowerCase()} in {suburb}.
                </p>
            ) : (
                <p className="text-gray-400 text-sm mt-1 filter blur-sm select-none">
                Based on your borrowing capacity of $X.XXm, you may be able to afford approximately XX% of properties in {suburb}.
                </p>
            )}
        </div>
      </div>

      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="priceRange" 
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              axisLine={false}
              tickLine={false}
            />
            {!isLocked && (
                <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
            )}
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.priceValue <= maxPrice ? '#16a34a' : '#e5e7eb'} 
                />
              ))}
            </Bar>
            {!isLocked && (
                <ReferenceLine 
                    x={data.find(d => d.priceValue > maxPrice)?.priceRange || data[data.length-1].priceRange} 
                    stroke="#dc2626" 
                    strokeDasharray="3 3" 
                    label={{ 
                        position: 'top', 
                        value: 'Your Limit', 
                        fill: '#dc2626',
                        fontSize: 12,
                        fontWeight: 600
                    }} 
                />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {!isLocked && (
          <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-sm mr-2"></div>
                Affordable
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div>
                Out of budget
            </div>
        </div>
      )}
    </div>
  );
};
