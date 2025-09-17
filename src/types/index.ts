export interface CropType {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'pulses' | 'spices' | 'cash_crops';
  seasons: string[];
  soilTypes: string[];
  minTemp: number;
  maxTemp: number;
  waterRequirement: 'low' | 'medium' | 'high';
  growthDays: number;
  marketPrice: number; // per kg
  image: string;
}

export interface SoilData {
  type: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface WeatherAlert {
  id: string;
  type: 'heavy_rain' | 'drought' | 'hail' | 'frost' | 'heat_wave';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  startDate: string;
  endDate: string;
  affectedCrops: string[];
}

export interface CropPrediction {
  cropId: string;
  survival: number; // percentage
  expectedYield: number; // tons per hectare
  marketValue: number; // total value
  profitMargin: number; // percentage
  riskFactors: string[];
  recommendations: string[];
  harvestDate: string;
}

export interface FormData {
  cropType: string;
  season: string;
  soilType: string;
  landArea: number;
  state: string;
  district: string;
}