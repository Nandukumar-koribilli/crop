import React, { useState } from 'react';
import { TestTube, TrendingUp, BarChart3, Leaf } from 'lucide-react';

interface SoilAnalysisProps {
  onAnalysisUpdate: (analysis: SoilAnalysis) => void;
  soilAnalysis: SoilAnalysis | null;
}

export interface SoilAnalysis {
  overallQuality: string;
  phLevel: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

const SoilAnalysis: React.FC<SoilAnalysisProps> = ({ onAnalysisUpdate, soilAnalysis }) => {
  const [analysis, setAnalysis] = useState<SoilAnalysis>({
    overallQuality: soilAnalysis?.overallQuality || '',
    phLevel: soilAnalysis?.phLevel || 7.0,
    nitrogen: soilAnalysis?.nitrogen || 50,
    phosphorus: soilAnalysis?.phosphorus || 30,
    potassium: soilAnalysis?.potassium || 40,
    organicMatter: soilAnalysis?.organicMatter || 3.5
  });

  const handleInputChange = (field: keyof SoilAnalysis, value: string | number) => {
    const updatedAnalysis = { ...analysis, [field]: value };
    setAnalysis(updatedAnalysis);
    onAnalysisUpdate(updatedAnalysis);
  };

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getNutrientLevel = (value: number, type: 'ph' | 'nutrient' | 'organic') => {
    if (type === 'ph') {
      if (value < 6.0) return { level: 'Acidic', color: 'text-red-500' };
      if (value > 8.0) return { level: 'Alkaline', color: 'text-blue-500' };
      return { level: 'Neutral', color: 'text-green-500' };
    }
    if (type === 'organic') {
      if (value < 2.0) return { level: 'Low', color: 'text-red-500' };
      if (value > 4.0) return { level: 'High', color: 'text-green-500' };
      return { level: 'Medium', color: 'text-yellow-500' };
    }
    // nutrient levels (percentage)
    if (value < 30) return { level: 'Low', color: 'text-red-500' };
    if (value > 70) return { level: 'High', color: 'text-green-500' };
    return { level: 'Medium', color: 'text-yellow-500' };
  };

  const qualityOptions = ['Excellent', 'Good', 'Fair', 'Poor'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <TestTube className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Soil Analysis</h2>
      </div>
      
      {/* Overall Quality */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overall Soil Quality
        </label>
        <select
          value={analysis.overallQuality}
          onChange={(e) => handleInputChange('overallQuality', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select Overall Quality</option>
          {qualityOptions.map((quality) => (
            <option key={quality} value={quality}>{quality}</option>
          ))}
        </select>
        {analysis.overallQuality && (
          <div className={`mt-2 p-3 rounded-lg border ${getQualityColor(analysis.overallQuality)}`}>
            <p className="font-medium">Soil Quality: {analysis.overallQuality}</p>
          </div>
        )}
      </div>
      
      {/* pH Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          pH Level
        </label>
        <input
          type="number"
          value={analysis.phLevel}
          onChange={(e) => handleInputChange('phLevel', parseFloat(e.target.value) || 7.0)}
          min="0"
          max="14"
          step="0.1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <div className="mt-2 flex items-center">
          <span className={`text-sm font-medium ${getNutrientLevel(analysis.phLevel, 'ph').color}`}>
            {getNutrientLevel(analysis.phLevel, 'ph').level} (pH {analysis.phLevel})
          </span>
        </div>
      </div>
      
      {/* Nutrient Levels */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Nutrient Levels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nitrogen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nitrogen (%)
            </label>
            <input
              type="number"
              value={analysis.nitrogen}
              onChange={(e) => handleInputChange('nitrogen', parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className={getNutrientLevel(analysis.nitrogen, 'nutrient').color}>
                  {getNutrientLevel(analysis.nitrogen, 'nutrient').level}
                </span>
                <span className="text-gray-500">{analysis.nitrogen}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${analysis.nitrogen}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Phosphorus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phosphorus (%)
            </label>
            <input
              type="number"
              value={analysis.phosphorus}
              onChange={(e) => handleInputChange('phosphorus', parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className={getNutrientLevel(analysis.phosphorus, 'nutrient').color}>
                  {getNutrientLevel(analysis.phosphorus, 'nutrient').level}
                </span>
                <span className="text-gray-500">{analysis.phosphorus}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${analysis.phosphorus}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Potassium */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Potassium (%)
            </label>
            <input
              type="number"
              value={analysis.potassium}
              onChange={(e) => handleInputChange('potassium', parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className={getNutrientLevel(analysis.potassium, 'nutrient').color}>
                  {getNutrientLevel(analysis.potassium, 'nutrient').level}
                </span>
                <span className="text-gray-500">{analysis.potassium}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${analysis.potassium}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Organic Matter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Leaf className="w-4 h-4 inline mr-2" />
          Organic Matter (%)
        </label>
        <input
          type="number"
          value={analysis.organicMatter}
          onChange={(e) => handleInputChange('organicMatter', parseFloat(e.target.value) || 0)}
          min="0"
          max="10"
          step="0.1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <div className="mt-2 flex items-center">
          <span className={`text-sm font-medium ${getNutrientLevel(analysis.organicMatter, 'organic').color}`}>
            {getNutrientLevel(analysis.organicMatter, 'organic').level} ({analysis.organicMatter}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;

export { SoilAnalysis }