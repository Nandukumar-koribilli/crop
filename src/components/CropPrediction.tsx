import React from 'react';
import { Brain, TrendingUp, DollarSign, Calendar, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { cropDatabase } from '../data/crops';

interface CropPredictionProps {
  selectedLocation: { lat: number; lng: number; name: string } | null;
  selectedCrop: { category: string; name: string } | null;
  farmDetails: any;
  soilAnalysis: any;
}

const CropPrediction: React.FC<CropPredictionProps> = ({ 
  selectedLocation, 
  selectedCrop, 
  farmDetails, 
  soilAnalysis 
}) => {
  // Check if all required data is available
  const isDataComplete = selectedLocation && selectedCrop && farmDetails && soilAnalysis;
  
  // Get crop data for selected crop
  const selectedCropData = selectedCrop ? cropDatabase.find(crop => crop.name.toLowerCase() === selectedCrop.name.toLowerCase()) : null;
  
  // Mock AI prediction results - in real app, this would come from ML model
  const predictionResults = isDataComplete && selectedCropData ? {
    survivalProbability: 85,
    expectedYield: {
      quantity: 2.8,
      unit: 'tonnes/hectare'
    },
    marketValue: {
      pricePerUnit: selectedCropData.marketPrice * 1000, // Convert to per tonne
      totalValue: 126000,
      currency: 'INR'
    },
    harvestTime: {
      duration: selectedCropData.growthDays,
      optimalMonth: 'March 2025'
    },
    netProfit: {
      amount: 78000,
      roi: 62
    },
    riskFactors: [
      { factor: 'Weather Dependency', level: 'Medium', description: 'Monsoon variations may affect yield' },
      { factor: 'Soil pH Imbalance', level: 'Low', description: 'Current pH levels are within acceptable range' },
      { factor: 'Market Volatility', level: 'High', description: 'Price fluctuations expected during harvest season' },
      { factor: 'Pest & Disease', level: 'Medium', description: 'Regular monitoring required for common pests' }
    ],
    recommendations: [
      'Apply organic fertilizer to improve soil health',
      'Install drip irrigation system for water efficiency',
      'Use integrated pest management practices',
      'Consider crop insurance for weather protection',
      'Plan harvest timing based on market prices',
      'Maintain soil moisture during flowering stage'
    ]
  } : null;

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-50';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!isDataComplete) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Brain className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">AI Crop Prediction Results</h2>
        </div>
        <div className="text-center text-gray-500 py-12">
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">Complete all sections to get AI predictions</p>
          <p className="text-sm">Please provide location, crop selection, farm details, and soil analysis data.</p>
          
          {/* Progress Checklist */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="space-y-3 text-left">
              <div className={`flex items-center p-3 rounded-lg ${selectedLocation ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                {selectedLocation ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
                <span>Select location on map</span>
              </div>
              <div className={`flex items-center p-3 rounded-lg ${selectedCrop ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                {selectedCrop ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
                <span>Choose crop type</span>
              </div>
              <div className={`flex items-center p-3 rounded-lg ${farmDetails?.state ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                {farmDetails?.state ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
                <span>Enter farm details</span>
              </div>
              <div className={`flex items-center p-3 rounded-lg ${soilAnalysis?.overallQuality ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                {soilAnalysis?.overallQuality ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
                <span>Provide soil analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">AI Crop Prediction Results</h2>
        </div>
        {selectedCrop && (
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg">
            <span className="font-medium">Selected Crop: </span>
            <span className="font-bold">{selectedCrop.name}</span>
          </div>
        )}
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Survival Probability */}
        <div className={`p-6 rounded-lg text-center ${getProbabilityColor(predictionResults!.survivalProbability)}`}>
          <TrendingUp className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Survival Probability</h3>
          <p className="text-3xl font-bold">{predictionResults!.survivalProbability}%</p>
        </div>
        
        {/* Expected Yield */}
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-3 text-blue-600" />
          <h3 className="font-semibold text-blue-700 mb-2">Expected Yield</h3>
          <p className="text-3xl font-bold text-blue-800">{predictionResults!.expectedYield.quantity}</p>
          <p className="text-sm text-blue-600">{predictionResults!.expectedYield.unit}</p>
        </div>
        
        {/* Market Value */}
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <DollarSign className="w-8 h-8 mx-auto mb-3 text-green-600" />
          <h3 className="font-semibold text-green-700 mb-2">Market Value</h3>
          <p className="text-3xl font-bold text-green-800">₹{predictionResults!.marketValue.totalValue.toLocaleString()}</p>
          <p className="text-sm text-green-600">₹{predictionResults!.marketValue.pricePerUnit}/tonne</p>
        </div>
        
        {/* Harvest Time */}
        <div className="bg-orange-50 p-6 rounded-lg text-center">
          <Calendar className="w-8 h-8 mx-auto mb-3 text-orange-600" />
          <h3 className="font-semibold text-orange-700 mb-2">Harvest Time</h3>
          <p className="text-3xl font-bold text-orange-800">{predictionResults!.harvestTime.duration}</p>
          <p className="text-sm text-orange-600">days ({predictionResults!.harvestTime.optimalMonth})</p>
        </div>
      </div>
      
      {/* Net Profit */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Estimated Net Profit</p>
            <p className="text-3xl font-bold text-green-700">₹{predictionResults!.netProfit.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Return on Investment</p>
            <p className="text-3xl font-bold text-blue-700">{predictionResults!.netProfit.roi}%</p>
          </div>
        </div>
      </div>
      
      {/* Risk Factors */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Risk Factors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictionResults!.riskFactors.map((risk, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{risk.factor}</h4>
                <span className="text-xs font-bold px-2 py-1 rounded-full">
                  {risk.level.toUpperCase()}
                </span>
              </div>
              <p className="text-sm">{risk.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          AI Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {predictionResults!.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropPrediction;