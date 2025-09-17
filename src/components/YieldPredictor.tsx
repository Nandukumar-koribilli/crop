import React from 'react';
import { BarChart3, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

interface PredictionData {
  crop: string;
  currentYield: number;
  predictedYield: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

const mockPredictions: PredictionData[] = [
  {
    crop: 'Wheat',
    currentYield: 3.2,
    predictedYield: 3.8,
    confidence: 87,
    factors: ['Optimal rainfall', 'Good soil moisture', 'Favorable temperature'],
    recommendations: ['Apply fertilizer in week 3', 'Monitor for pests']
  },
  {
    crop: 'Corn',
    currentYield: 4.5,
    predictedYield: 5.1,
    confidence: 92,
    factors: ['Excellent weather conditions', 'High soil nutrients'],
    recommendations: ['Continue current irrigation', 'Harvest timing optimal']
  },
  {
    crop: 'Soybeans',
    currentYield: 2.8,
    predictedYield: 3.2,
    confidence: 79,
    factors: ['Moderate rainfall', 'Good pollination period'],
    recommendations: ['Increase irrigation frequency', 'Monitor growth stages']
  }
];

export const YieldPredictor: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
          Yield Predictions
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Next 30 days</span>
        </div>
      </div>

      <div className="space-y-6">
        {mockPredictions.map((prediction, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900">{prediction.crop}</h3>
              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  prediction.confidence >= 85 
                    ? 'bg-green-100 text-green-800' 
                    : prediction.confidence >= 70 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {prediction.confidence}% Confidence
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Current Yield</div>
                <div className="text-xl font-bold text-gray-900">{prediction.currentYield} tons/ha</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Predicted Yield</div>
                <div className="text-xl font-bold text-green-600 flex items-center">
                  {prediction.predictedYield} tons/ha
                  <TrendingUp className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Yield Improvement</span>
                <span className="font-medium">
                  +{((prediction.predictedYield - prediction.currentYield) / prediction.currentYield * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(((prediction.predictedYield - prediction.currentYield) / prediction.currentYield) * 100 * 2, 100)}%` 
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                  Key Factors
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {prediction.factors.map((factor, factorIndex) => (
                    <li key={factorIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-orange-600" />
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {prediction.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};