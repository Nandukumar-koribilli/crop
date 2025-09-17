import { CropType } from '../types';

export const cropDatabase: CropType[] = [
  // Fruits
  {
    id: 'apple',
    name: 'Apple',
    category: 'fruits',
    seasons: ['Winter', 'Spring'],
    soilTypes: ['Loamy', 'Sandy Loam'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 180,
    marketPrice: 80,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruits',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Alluvial', 'Clay Loam'],
    minTemp: 26,
    maxTemp: 35,
    waterRequirement: 'high',
    growthDays: 365,
    marketPrice: 40,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruits',
    seasons: ['Summer'],
    soilTypes: ['Alluvial', 'Red Soil'],
    minTemp: 24,
    maxTemp: 35,
    waterRequirement: 'medium',
    growthDays: 120,
    marketPrice: 60,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  // Vegetables
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetables',
    seasons: ['Winter', 'Spring'],
    soilTypes: ['Sandy Loam', 'Alluvial'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 120,
    marketPrice: 25,
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetables',
    seasons: ['Winter', 'Summer'],
    soilTypes: ['Loamy', 'Sandy Loam'],
    minTemp: 18,
    maxTemp: 29,
    waterRequirement: 'medium',
    growthDays: 90,
    marketPrice: 30,
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Loamy'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 90,
    marketPrice: 20,
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  // Grains
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'grains',
    seasons: ['Winter'],
    soilTypes: ['Alluvial', 'Black Soil'],
    minTemp: 10,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 120,
    marketPrice: 22,
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'grains',
    seasons: ['Monsoon', 'Summer'],
    soilTypes: ['Clay', 'Alluvial'],
    minTemp: 20,
    maxTemp: 35,
    waterRequirement: 'high',
    growthDays: 120,
    marketPrice: 28,
    image: 'https://images.pexels.com/photos/1078359/pexels-photo-1078359.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  // Pulses
  {
    id: 'chickpea',
    name: 'Chickpea (Chana)',
    category: 'pulses',
    seasons: ['Winter'],
    soilTypes: ['Black Soil', 'Sandy Loam'],
    minTemp: 15,
    maxTemp: 30,
    waterRequirement: 'low',
    growthDays: 100,
    marketPrice: 70,
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    category: 'pulses',
    seasons: ['Winter'],
    soilTypes: ['Loamy', 'Sandy Loam'],
    minTemp: 18,
    maxTemp: 30,
    waterRequirement: 'low',
    growthDays: 95,
    marketPrice: 80,
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const soilTypes = [
  'Alluvial', 'Black Soil', 'Red Soil', 'Laterite', 'Desert Soil',
  'Mountain Soil', 'Loamy', 'Sandy Loam', 'Clay Loam', 'Clay'
];

export const seasons = ['Summer', 'Monsoon', 'Winter', 'Spring'];