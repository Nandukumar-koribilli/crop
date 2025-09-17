import React from 'react';
import { TrendingUp, TrendingDown, Droplets, Sun, Cloud } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  type: string;
  currentYield: number;
  predictedYield: number;
  growthStage: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  soilMoisture: number;
  temperature: number;
  image: string;
}

interface CropCardProps {
  crop: Crop;
  onClick: () => void;
}

export const CropCard: React.FC<CropCardProps> = ({ crop, onClick }) => {
  const yieldChange = crop.predictedYield - crop.currentYield;
  const yieldChangePercent = ((yieldChange / crop.currentYield) * 100).toFixed(1);
  
  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative h-48">
        <img 
          src={crop.image} 
          alt={crop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHealthColor(crop.healthStatus)}`}>
            {crop.healthStatus}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
            <p className="text-sm text-gray-600">{crop.type}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              {yieldChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm font-semibold ${yieldChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {yieldChangePercent}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Current Yield:</span>
            <span className="font-semibold">{crop.currentYield} tons/ha</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Predicted Yield:</span>
            <span className="font-semibold text-blue-600">{crop.predictedYield} tons/ha</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Growth Stage:</span>
            <span className="font-medium">{crop.growthStage}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-600">Soil: {crop.soilMoisture}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-gray-600">{crop.temperature}°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};