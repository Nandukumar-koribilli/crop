export interface CropType {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'pulses';
  seasons: string[];
  soilTypes: string[];
  minTemp: number;
  maxTemp: number;
  waterRequirement: 'low' | 'medium' | 'high';
  growthDays: number;
  avgYield?: number;
  marketPrice: number;
  image: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}