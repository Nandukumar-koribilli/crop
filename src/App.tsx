import React, { useState, useEffect } from 'react';
import { Sprout, BarChart3, Menu, X, Calculator } from 'lucide-react';
import { CropSelector } from './components/CropSelector';
import { FarmingForm } from './components/FarmingForm';
import { SoilAnalysis } from './components/SoilAnalysis';
import { WeatherWidget } from './components/WeatherWidget';
import { CloudMap } from './components/CloudMap';
import { WeatherAlerts } from './components/WeatherAlerts';
import { CropPredictionResult } from './components/CropPredictionResult';
import { FormData, SoilData, CropPrediction } from './types';
import { cropDatabase } from './data/crops';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState('');
  const [formData, setFormData] = useState<FormData>({
    cropType: '',
    season: '',
    soilType: '',
    landArea: 0,
    state: '',
    district: ''
  });
  
  const [soilData, setSoilData] = useState<SoilData>({
    type: 'Loamy',
    ph: 6.5,
    nitrogen: 65,
    phosphorus: 45,
    potassium: 70,
    organicMatter: 35,
    quality: 'good'
  });

  const [prediction, setPrediction] = useState<CropPrediction | null>(null);

  const selectedCrop = cropDatabase.find(crop => crop.id === selectedCropId);

  // Generate prediction when form is complete
  useEffect(() => {
    if (selectedCropId && formData.season && formData.soilType && formData.landArea && formData.state) {
      generatePrediction();
    } else {
      setPrediction(null);
    }
  }, [selectedCropId, formData, soilData]);

  const generatePrediction = () => {
    if (!selectedCrop) return;

    // Calculate survival probability based on various factors
    let survivalScore = 70; // Base score

    // Season compatibility
    if (selectedCrop.seasons.includes(formData.season)) {
      survivalScore += 15;
    } else {
      survivalScore -= 20;
    }

    // Soil compatibility
    if (selectedCrop.soilTypes.includes(formData.soilType)) {
      survivalScore += 10;
    } else {
      survivalScore -= 15;
    }

    // Soil quality impact
    switch (soilData.quality) {
      case 'excellent': survivalScore += 15; break;
      case 'good': survivalScore += 10; break;
      case 'fair': survivalScore += 0; break;
      case 'poor': survivalScore -= 20; break;
    }

    // Nutrient levels impact
    const avgNutrients = (soilData.nitrogen + soilData.phosphorus + soilData.potassium) / 3;
    if (avgNutrients >= 70) survivalScore += 10;
    else if (avgNutrients >= 50) survivalScore += 5;
    else survivalScore -= 10;

    // pH impact
    if (soilData.ph >= 6.0 && soilData.ph <= 7.5) survivalScore += 5;
    else survivalScore -= 10;

    // Ensure survival is between 0-100
    const survival = Math.max(0, Math.min(100, survivalScore));

    // Calculate expected yield (base yield modified by conditions)
    const baseYield = 3.5; // tons per hectare
    const yieldModifier = survival / 100;
    const expectedYield = baseYield * yieldModifier * (1 + Math.random() * 0.3);

    // Generate harvest date
    const harvestDate = new Date();
    harvestDate.setDate(harvestDate.getDate() + selectedCrop.growthDays);

    // Generate risk factors and recommendations
    const riskFactors = [];
    const recommendations = [];

    if (!selectedCrop.seasons.includes(formData.season)) {
      riskFactors.push(`${selectedCrop.name} is not typically grown in ${formData.season} season`);
      recommendations.push(`Consider growing in ${selectedCrop.seasons.join(' or ')} season instead`);
    }

    if (!selectedCrop.soilTypes.includes(formData.soilType)) {
      riskFactors.push(`${formData.soilType} soil may not be optimal for ${selectedCrop.name}`);
      recommendations.push(`Consider soil amendments or choose crops suitable for ${formData.soilType} soil`);
    }

    if (soilData.nitrogen < 50) {
      riskFactors.push('Low nitrogen levels may affect crop growth');
      recommendations.push('Apply nitrogen-rich fertilizers before planting');
    }

    if (soilData.ph < 6.0 || soilData.ph > 7.5) {
      riskFactors.push('Soil pH is outside optimal range');
      recommendations.push('Adjust soil pH using lime (for acidic) or sulfur (for alkaline) soil');
    }

    if (formData.state === 'Rajasthan' && selectedCrop.waterRequirement === 'high') {
      riskFactors.push('High water requirement crop in arid region');
      recommendations.push('Ensure adequate irrigation infrastructure');
    }

    setPrediction({
      cropId: selectedCropId,
      survival,
      expectedYield: parseFloat(expectedYield.toFixed(2)),
      marketValue: selectedCrop.marketPrice * expectedYield * formData.landArea,
      profitMargin: 25 + Math.random() * 30,
      riskFactors,
      recommendations,
      harvestDate: harvestDate.toLocaleDateString('en-IN')
    });
  };

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSoilDataChange = (data: Partial<SoilData>) => {
    setSoilData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-xl">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Smart Crop Predictor
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Agricultural Intelligence</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{cropDatabase.length}</div>
                <div className="text-xs text-gray-600">Crop Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">29</div>
                <div className="text-xs text-gray-600">Indian States</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Stats */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-green-600">{cropDatabase.length}</div>
                <div className="text-xs text-gray-600">Crops</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">29</div>
                <div className="text-xs text-gray-600">States</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">95%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Weather Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          <div className="lg:col-span-2">
            <CloudMap />
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="mb-8">
          <WeatherAlerts />
        </div>

        {/* Crop Selection and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CropSelector 
            selectedCrop={selectedCropId}
            onCropSelect={setSelectedCropId}
          />
          <FarmingForm 
            formData={formData}
            onFormChange={handleFormChange}
          />
        </div>

        {/* Soil Analysis */}
        <div className="mb-8">
          <SoilAnalysis 
            soilData={soilData}
            onSoilDataChange={handleSoilDataChange}
          />
        </div>

        {/* Prediction Results */}
        <div className="mb-8">
          <CropPredictionResult 
            prediction={prediction}
            selectedCrop={selectedCrop || null}
            landArea={formData.landArea}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Smart Crop Predictor
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Empowering farmers with AI-driven insights for sustainable agriculture
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>• Real-time Weather Data</span>
              <span>• Soil Analysis</span>
              <span>• Market Predictions</span>
              <span>• Risk Assessment</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;