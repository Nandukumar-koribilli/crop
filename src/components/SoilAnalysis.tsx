import React from 'react';
import { TestTube, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { SoilData } from '../types';

interface SoilAnalysisProps {
  soilData: SoilData;
  onSoilDataChange: (data: Partial<SoilData>) => void;
}

export const SoilAnalysis: React.FC<SoilAnalysisProps> = ({ soilData, onSoilDataChange }) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNutrientLevel = (value: number, type: 'ph' | 'nutrient') => {
    if (type === 'ph') {
      if (value >= 6.0 && value <= 7.5) return { level: 'Optimal', color: 'text-green-600' };
      if (value >= 5.5 && value < 6.0) return { level: 'Slightly Acidic', color: 'text-yellow-600' };
      if (value > 7.5 && value <= 8.0) return { level: 'Slightly Alkaline', color: 'text-yellow-600' };
      return { level: 'Poor', color: 'text-red-600' };
    } else {
      if (value >= 75) return { level: 'High', color: 'text-green-600' };
      if (value >= 50) return { level: 'Medium', color: 'text-yellow-600' };
      return { level: 'Low', color: 'text-red-600' };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <TestTube className="h-6 w-6 mr-2 text-purple-600" />
        Soil Analysis
      </h2>

      {/* Soil Quality Overview */}
      <div className="mb-6 p-4 rounded-lg border-2 border-dashed border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Overall Soil Quality</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getQualityColor(soilData.quality)}`}>
            {soilData.quality}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{soilData.ph}</div>
            <div className="text-xs text-gray-600">pH Level</div>
            <div className={`text-xs font-medium ${getNutrientLevel(soilData.ph, 'ph').color}`}>
              {getNutrientLevel(soilData.ph, 'ph').level}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{soilData.nitrogen}%</div>
            <div className="text-xs text-gray-600">Nitrogen</div>
            <div className={`text-xs font-medium ${getNutrientLevel(soilData.nitrogen, 'nutrient').color}`}>
              {getNutrientLevel(soilData.nitrogen, 'nutrient').level}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{soilData.phosphorus}%</div>
            <div className="text-xs text-gray-600">Phosphorus</div>
            <div className={`text-xs font-medium ${getNutrientLevel(soilData.phosphorus, 'nutrient').color}`}>
              {getNutrientLevel(soilData.phosphorus, 'nutrient').level}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{soilData.potassium}%</div>
            <div className="text-xs text-gray-600">Potassium</div>
            <div className={`text-xs font-medium ${getNutrientLevel(soilData.potassium, 'nutrient').color}`}>
              {getNutrientLevel(soilData.potassium, 'nutrient').level}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 mr-1" />
            Nutrient Levels
          </h4>
          <div className="space-y-3">
            {[
              { name: 'Nitrogen', value: soilData.nitrogen, color: 'bg-green-500' },
              { name: 'Phosphorus', value: soilData.phosphorus, color: 'bg-orange-500' },
              { name: 'Potassium', value: soilData.potassium, color: 'bg-purple-500' },
              { name: 'Organic Matter', value: soilData.organicMatter, color: 'bg-brown-500' }
            ].map((nutrient) => (
              <div key={nutrient.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{nutrient.name}</span>
                  <span className="font-medium">{nutrient.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${nutrient.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${nutrient.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Recommendations
          </h4>
          <div className="space-y-2 text-sm">
            {soilData.nitrogen < 50 && (
              <div className="flex items-start p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-yellow-800">Consider adding nitrogen-rich fertilizers</span>
              </div>
            )}
            {soilData.phosphorus < 50 && (
              <div className="flex items-start p-2 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-orange-800">Phosphorus levels are low, add bone meal or rock phosphate</span>
              </div>
            )}
            {soilData.potassium < 50 && (
              <div className="flex items-start p-2 bg-purple-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-purple-800">Increase potassium with wood ash or potash</span>
              </div>
            )}
            {(soilData.ph < 5.5 || soilData.ph > 8.0) && (
              <div className="flex items-start p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-red-800">pH adjustment needed for optimal crop growth</span>
              </div>
            )}
            {soilData.organicMatter < 30 && (
              <div className="flex items-start p-2 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Add compost or organic matter to improve soil health</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};