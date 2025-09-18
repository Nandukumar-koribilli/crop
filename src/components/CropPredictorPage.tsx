import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { CropSelector } from './CropSelector';
import { FarmingForm } from './FarmingForm';
import { SoilAnalysis } from './SoilAnalysis';
import { WeatherWidget } from './WeatherWidget';
import { CloudMap } from './CloudMap';
import { WeatherAlerts } from './WeatherAlerts';
import { CropPredictionResult } from './CropPredictionResult';
import { FormData, SoilData, CropPrediction } from '../types';
import { cropDatabase } from '../data/crops';

const CropPredictorPage: React.FC = () => {
  // mobile menu state removed (unused)
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

  // Preset soil profiles per soil type to reflect different metrics
  const soilProfiles: Record<string, Partial<SoilData>> = {
    'Loamy': { type: 'Loamy', ph: 6.5, nitrogen: 65, phosphorus: 45, potassium: 70, organicMatter: 35, quality: 'good' },
    'Sandy Loam': { type: 'Sandy Loam', ph: 6.2, nitrogen: 40, phosphorus: 35, potassium: 45, organicMatter: 15, quality: 'fair' },
    'Black Soil': { type: 'Black Soil', ph: 7.0, nitrogen: 75, phosphorus: 60, potassium: 80, organicMatter: 40, quality: 'excellent' },
    'Red Soil': { type: 'Red Soil', ph: 6.0, nitrogen: 50, phosphorus: 40, potassium: 50, organicMatter: 20, quality: 'fair' },
    'Clay': { type: 'Clay', ph: 6.8, nitrogen: 55, phosphorus: 50, potassium: 60, organicMatter: 30, quality: 'good' }
  };

  // When soilType selection changes, set soilData to the profile so UI reflects chosen soil type
  useEffect(() => {
    if (formData.soilType && soilProfiles[formData.soilType]) {
      const profile = soilProfiles[formData.soilType];
      setSoilData(prev => ({ ...prev, ...profile } as SoilData));
    }
  }, [formData.soilType]);

  const [prediction, setPrediction] = useState<CropPrediction | null>(null);

  const selectedCrop = cropDatabase.find(crop => crop.id === selectedCropId);

  useEffect(() => {
    if (selectedCropId && formData.season && formData.soilType && formData.landArea && formData.state) {
      generatePrediction();
    } else {
      setPrediction(null);
    }
  }, [selectedCropId, formData, soilData]);

  const generatePrediction = () => {
    if (!selectedCrop) return;
    let survivalScore = 70;
    if (selectedCrop.seasons.includes(formData.season)) survivalScore += 15;
    else survivalScore -= 20;
    if (selectedCrop.soilTypes.includes(formData.soilType)) survivalScore += 10;
    else survivalScore -= 15;
    switch (soilData.quality) {
      case 'excellent': survivalScore += 15; break;
      case 'good': survivalScore += 10; break;
      case 'fair': survivalScore += 0; break;
      case 'poor': survivalScore -= 20; break;
    }
    const avgNutrients = (soilData.nitrogen + soilData.phosphorus + soilData.potassium) / 3;
    if (avgNutrients >= 70) survivalScore += 10;
    else if (avgNutrients >= 50) survivalScore += 5;
    else survivalScore -= 10;
    if (soilData.ph >= 6.0 && soilData.ph <= 7.5) survivalScore += 5;
    else survivalScore -= 10;
    const survival = Math.max(0, Math.min(100, survivalScore));
  // prefer crop-specific average yield (tons/ha) if present, otherwise fallback to a reasonable default
  const baseYield = (selectedCrop as any).avgYield ?? (selectedCrop.category === 'vegetables' ? 10 : 3.5);
  const yieldModifier = survival / 100;
  const expectedYield = baseYield * yieldModifier * (1 + Math.random() * 0.2); // reduce random noise for stability
    const harvestDate = new Date();
    harvestDate.setDate(harvestDate.getDate() + selectedCrop.growthDays);
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
    // compute market value in INR by converting tons -> kg (x1000) and multiplying by price/kg
    const marketValue = selectedCrop.marketPrice * expectedYield * formData.landArea * 1000;

    // store prediction
    setPrediction({
      cropId: selectedCropId,
      survival,
      expectedYield: parseFloat(expectedYield.toFixed(2)), // tons per hectare
      marketValue: parseFloat(marketValue.toFixed(2)),
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
    <div className="min-h-screen bg-[url('https://blog.agribegri.com/public/blog_images/sustainable-farming-techniques-crop-rotation-and-intercropping-patterns-in-indian-agriculture-600x400.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Header */}
      <header className="bg-[rgba(255,255,255,0.2)] backdrop-blur-[10px] shadow-lg border-b border-[rgba(255,255,255,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              {/* Left logos */}
              <div className="flex items-center space-x-3">
                <img src="https://www.gvpcdpgc.edu.in/gvplogo.jpg" alt="GVP Logo" className="h-14 w-14 rounded-full object-cover bg-white/10 p-1" />
                <img src="/imgs/tecos.png" alt="Tecos Logo" className="h-14 w-14 rounded-full object-cover bg-white/10 p-1" />
              </div>

              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-xl mr-3">
                  <Sprout className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Smart Crop Predictor
                  </h1>
                  <p className="text-sm text-black">AI-Powered Agricultural Intelligence</p>
                </div>
              </div>
            </div>
            {/* ...existing code for header stats and menu... */}
          </div>
        </div>
        {/* ...existing code for mobile stats... */}
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
            soilType={formData.soilType}
            state={formData.state}
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
      <footer className="bg-[rgba(255,255,255,0.2)] backdrop-blur-[10px] border-t border-[rgba(255,255,255,0.3)] mt-16">
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
            <p className="text-sm text-white/70 mb-4">
              Empowering farmers with AI-driven insights for sustainable agriculture
            </p>
            <div className="flex justify-center space-x-6 text-sm text-white/50">
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
};

export default CropPredictorPage;