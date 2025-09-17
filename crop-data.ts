export const crops = [
  // Grains
  'Wheat',
  'Corn',
  'Rice',
  'Barley',
  'Oats',
  'Brown Rice',
  'White Rice',
  'Rye',
  'Millet',
  // Vegetables
  'Potatoes',
  'Onion',
  'Tomatoes',
  'Cabbage',
  'Bean',
  'Eggplant',
  'Cauliflower',
  'Cucumbers',
  'Frozen Peas',
  'Garlic',
  'Okra',
  'Beetroot',
  'Green Pepper',
  'Baby Spinach',
  'Cloves',
  'Cucurbits',
  'Carrots',
  'Lettuce',
  // Fruits
  'Mango',
  'Banana',
  'Papaya',
  'Guava',
  'Pineapple',
  'Jackfruit',
  'Custard Apple',
  'Sapota',
  'Coconut',
  'Watermelon',
  'Muskmelon',
  'Blackberry',
  'Gooseberry',
  'Litchi',
  'Avocado',
  'Orange',
  'Lemon',
  'Apple',
  'Grapes',
  'Pomegranate',
  'Peach',
  'Plum',
  'Apricot',
  'Mulberry',
  'Strawberries',
  'Dragon Fruit',
  'Kiwi Fruit',
  // Legumes & Others
  'Soybeans',
  'Cotton',
  'Sugarcane',
];
export const seasons = ['Kharif', 'Rabi', 'Zaid'];
export const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite'];

export interface PredictionRequest {
  crop: string;
  season: string;
  soil: string;
}

export interface PredictionResult {
  cropName: string;
  predictedYield: string;
  profitability: string;
  isSafe: boolean;
  recommendation: string;
  alternatives: { name: string; reason: string }[];
}

// Mock prediction logic
export function getCropPrediction(request: PredictionRequest): PredictionResult {
  // This is a mock logic. In a real application, this would call a machine learning model.
  const { crop, season, soil } = request;

  let predictedYield = 0;
  let profitability = 0;
  let isSafe = false;
  let recommendation = '';
  const alternatives: PredictionResult['alternatives'] = [];

  // Simple rules for demonstration
  if (crop === 'Rice') {
    predictedYield = 5; // tons per hectare
    profitability = 1500; // $ per hectare
    if (season === 'Kharif' && (soil === 'Alluvial' || soil === 'Red')) {
      isSafe = true;
      recommendation = 'This is a good choice for the selected season and soil. Ensure adequate water supply.';
    } else {
      isSafe = false;
      recommendation = 'Rice is not ideal for this season/soil. It requires a heavy water supply and specific soil conditions.';
      alternatives.push({ name: 'Corn', reason: 'More versatile and requires less water.' });
      alternatives.push({ name: 'Sugarcane', reason: 'Profitable alternative if water is available.' });
    }
  } else if (crop === 'Wheat') {
    predictedYield = 4;
    profitability = 1200;
    if (season === 'Rabi' && (soil === 'Alluvial' || soil === 'Black')) {
      isSafe = true;
      recommendation = 'Wheat is well-suited for these conditions. Monitor for pests.';
    } else {
      isSafe = false;
      recommendation = 'Wheat cultivation is risky in this season/soil combination.';
      alternatives.push({ name: 'Sugarcane', reason: 'Can be a profitable alternative if water is available.' });
      alternatives.push({ name: 'Corn', reason: 'A good alternative for Rabi season in some regions.' });
    }
  } else if (crop === 'Corn') {
    predictedYield = 6;
    profitability = 1300;
    if (soil === 'Red' || soil === 'Alluvial') {
      isSafe = true;
      recommendation = 'Corn is a good fit. It is versatile across various seasons.';
    } else {
      isSafe = false;
      recommendation = 'Corn may not yield well in this soil. Consider soil amendments.';
      alternatives.push({ name: 'Cotton', reason: 'Grows well in Black soil.' });
      alternatives.push({ name: 'Wheat', reason: 'A good Rabi crop alternative.' });
    }
  } else if (crop === 'Cotton') {
    predictedYield = 1.5;
    profitability = 2000;
    if (season === 'Kharif' && soil === 'Black') {
      isSafe = true;
      recommendation = 'Ideal conditions for Cotton. High profit potential but also high risk.';
    } else {
      isSafe = false;
      recommendation = 'Cotton requires specific conditions not met here. High risk of crop failure.';
      alternatives.push({ name: 'Wheat', reason: 'A safer bet in Black soil during Rabi season.' });
    }
  } else if (crop === 'Sugarcane') {
    predictedYield = 70;
    profitability = 2500;
    if (soil === 'Alluvial' || soil === 'Black') {
      isSafe = true;
      recommendation = 'Sugarcane is highly profitable but requires significant water and a long growing season.';
    } else {
      isSafe = false;
      recommendation = 'Sugarcane is not recommended for this soil type.';
      alternatives.push({ name: 'Corn', reason: 'A shorter duration crop with good returns.' });
    }
  } else {
    // Default case for other crops
    predictedYield = Math.floor(Math.random() * 10 + 2);
    profitability = Math.floor(Math.random() * 1500 + 800);
    isSafe = Math.random() > 0.4; // 60% chance of being safe
    if (isSafe) {
      recommendation = `Conditions seem generally favorable for ${crop}, but specific data is limited. Proceed with caution and local consultation.`;
    } else {
      recommendation = `There is not enough data to recommend cultivating ${crop} under these conditions. It may be risky.`;
      if (soil === 'Black') {
        alternatives.push({ name: 'Cotton', reason: 'A suitable cash crop for Black soil.' });
      }
      if (season === 'Rabi') {
        alternatives.push({ name: 'Wheat', reason: 'A generally safe and well-understood Rabi crop.' });
      } else {
        alternatives.push({ name: 'Rice', reason: 'A staple crop suitable for many regions if water is available.' });
      }
    }
  }

  return {
    cropName: crop,
    predictedYield: `${predictedYield} tons/hectare`,
    profitability: `$${profitability}/hectare (estimated)`,
    isSafe,
    recommendation,
    alternatives,
  };
}