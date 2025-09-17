import React from 'react';
import { X, Calendar, MapPin, TrendingUp, Droplets, Sun, AlertCircle } from 'lucide-react';

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

interface CropModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CropModal: React.FC<CropModalProps> = ({ crop, isOpen, onClose }) => {
  if (!isOpen || !crop) return null;

  const yieldChange = crop.predictedYield - crop.currentYield;
  const yieldChangePercent = ((yieldChange / crop.currentYield) * 100).toFixed(1);

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthBg = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-blue-50 border-blue-200';
      case 'fair': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{crop.name} Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <img 
                src={crop.image} 
                alt={crop.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{crop.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Stage:</span>
                    <span className="font-medium">{crop.growthStage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Health Status:</span>
                    <span className={`font-semibold capitalize ${getHealthColor(crop.healthStatus)}`}>
                      {crop.healthStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${getHealthBg(crop.healthStatus)}`}>
                <div className="flex items-center mb-2">
                  <AlertCircle className={`h-5 w-5 mr-2 ${getHealthColor(crop.healthStatus)}`} />
                  <h4 className="font-semibold">Health Assessment</h4>
                </div>
                <p className="text-sm text-gray-700">
                  {crop.healthStatus === 'excellent' && 'Crop is in optimal condition with excellent growth patterns and no visible stress indicators.'}
                  {crop.healthStatus === 'good' && 'Crop shows good development with minor areas for improvement in nutrition or water management.'}
                  {crop.healthStatus === 'fair' && 'Crop requires attention. Consider adjusting irrigation, fertilization, or pest management practices.'}
                  {crop.healthStatus === 'poor' && 'Immediate intervention required. Crop shows signs of stress and may need professional assessment.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-900">Yield Prediction</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Current:</span>
                  <span className="font-bold">{crop.currentYield} tons/ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Predicted:</span>
                  <span className="font-bold text-green-600">{crop.predictedYield} tons/ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Change:</span>
                  <span className={`font-bold ${yieldChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {yieldChangePercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Droplets className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-900">Soil Conditions</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Moisture:</span>
                  <span className="font-bold">{crop.soilMoisture}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${crop.soilMoisture}%` }}
                  ></div>
                </div>
                <div className="text-xs text-green-600">
                  {crop.soilMoisture >= 60 ? 'Optimal' : crop.soilMoisture >= 40 ? 'Adequate' : 'Low'}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Sun className="h-5 w-5 text-orange-600 mr-2" />
                <h4 className="font-semibold text-orange-900">Temperature</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-orange-700">Current:</span>
                  <span className="font-bold">{crop.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-orange-700">Optimal Range:</span>
                  <span className="font-medium">20-26°C</span>
                </div>
                <div className="text-xs text-orange-600">
                  {crop.temperature >= 20 && crop.temperature <= 26 ? 'Optimal' : 'Monitor closely'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Growth Timeline
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Planted</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Germination</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current: {crop.growthStage}</span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Maturity</span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Harvest</span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Field ID:</span>
                  <span className="font-medium">{crop.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium">12.5 hectares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coordinates:</span>
                  <span className="font-medium">40.7128°N, 74.0060°W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Elevation:</span>
                  <span className="font-medium">245m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};