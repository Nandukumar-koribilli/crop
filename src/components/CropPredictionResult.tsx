import React from 'react';
import { TrendingUp, DollarSign, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { CropPrediction, CropType } from '../types';

interface CropPredictionResultProps {
  prediction: CropPrediction | null;
  selectedCrop: CropType | null;
  landArea: number;
}

export const CropPredictionResult: React.FC<CropPredictionResultProps> = ({ 
  prediction, 
  selectedCrop, 
  landArea 
}) => {
  if (!prediction || !selectedCrop) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Complete the form above to get crop predictions</p>
        </div>
      </div>
    );
  }

  const getSurvivalStatus = (survival: number) => {
    if (survival >= 80) return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', status: 'Excellent' };
    if (survival >= 60) return { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100', status: 'Good' };
    if (survival >= 40) return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Fair' };
    return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', status: 'Poor' };
  };

  const survivalStatus = getSurvivalStatus(prediction.survival);
  const StatusIcon = survivalStatus.icon;
  const totalProduction = prediction.expectedYield * landArea;
  const totalRevenue = totalProduction * selectedCrop.marketPrice;
  const estimatedCost = landArea * 25000; // ₹25,000 per hectare average cost
  const netProfit = totalRevenue - estimatedCost;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
        Crop Prediction Results
      </h2>

      {/* Survival Rate */}
      <div className={`p-4 rounded-lg mb-6 ${survivalStatus.bg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StatusIcon className={`h-6 w-6 mr-2 ${survivalStatus.color}`} />
            <div>
              <h3 className="font-semibold text-gray-900">Crop Survival Probability</h3>
              <p className="text-sm text-gray-600">Based on current conditions</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${survivalStatus.color}`}>{prediction.survival}%</div>
            <div className={`text-sm font-medium ${survivalStatus.color}`}>{survivalStatus.status}</div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-900">Expected Yield</h4>
          </div>
          <div className="text-2xl font-bold text-blue-600">{prediction.expectedYield}</div>
          <div className="text-sm text-blue-700">tons/hectare</div>
          <div className="text-xs text-blue-600 mt-1">Total: {totalProduction.toFixed(1)} tons</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
            <h4 className="font-semibold text-green-900">Market Value</h4>
          </div>
          <div className="text-2xl font-bold text-green-600">₹{selectedCrop.marketPrice}</div>
          <div className="text-sm text-green-700">per kg</div>
          <div className="text-xs text-green-600 mt-1">Total Revenue: ₹{totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
            <h4 className="font-semibold text-purple-900">Harvest Time</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600">{selectedCrop.growthDays}</div>
          <div className="text-sm text-purple-700">days</div>
          <div className="text-xs text-purple-600 mt-1">Est. Date: {prediction.harvestDate}</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
            <h4 className="font-semibold text-orange-900">Net Profit</h4>
          </div>
          <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{Math.abs(netProfit).toLocaleString()}
          </div>
          <div className="text-sm text-orange-700">{netProfit >= 0 ? 'Profit' : 'Loss'}</div>
          <div className="text-xs text-orange-600 mt-1">
            Margin: {((netProfit / totalRevenue) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Risk Factors & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
            Risk Factors
          </h4>
          <div className="space-y-2">
            {prediction.riskFactors.map((risk, index) => (
              <div key={index} className="flex items-start p-2 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-sm text-red-800">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {prediction.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-sm text-green-800">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Start Cultivation
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Expert Consultation
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
};