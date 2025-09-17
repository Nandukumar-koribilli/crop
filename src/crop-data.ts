export const crops = [
  // Grains
  { 
    name: 'Wheat', type: 'Grains', image: '/image.png', marketPrice: 22, priceUnit: '₹',
    cultivationSteps: [
      "Land Preparation: Plough the field 2-3 times to get a fine tilth.",
      "Sowing: Sow seeds in rows at a depth of 5-6 cm. Use a seed drill for uniformity.",
      "Irrigation: Provide the first irrigation 20-25 days after sowing and subsequent irrigations at critical growth stages.",
      "Fertilization: Apply a balanced dose of NPK fertilizers based on soil test results.",
      "Weed Control: Use herbicides or manual weeding to keep the field weed-free.",
      "Harvesting: Harvest the crop when grains are hard and the straw is dry and brittle."
    ]
  },
  { 
    name: 'Corn', type: 'Grains', image: '/image.png', marketPrice: 20, priceUnit: '₹',
    cultivationSteps: ["Step 1: Land preparation.", "Step 2: Sowing at the right time.", "Step 3: Apply irrigation.", "Step 4: Fertilize as needed.", "Step 5: Harvest when ready."]
  },
  { 
    name: 'Rice', type: 'Grains', image: '/image.png', marketPrice: 28, priceUnit: '₹',
    cultivationSteps: [
        "Nursery Preparation: Prepare a raised nursery bed and sow healthy seeds.",
        "Transplanting: Transplant 25-30 day old seedlings into the main field.",
        "Water Management: Maintain a shallow water level of 2-5 cm throughout the crop growth period.",
        "Nutrient Management: Apply nitrogen in split doses for better efficiency.",
        "Pest and Disease Control: Monitor for common pests like stem borer and diseases like blast.",
        "Harvesting: Harvest when 80-85% of the grains in the panicle are straw-colored."
    ]
  },
  { name: 'Barley', type: 'Grains', image: '/image.png', marketPrice: 25, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Oats', type: 'Grains', image: '/image.png', marketPrice: 35, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Millet', type: 'Grains', image: '/image.png', marketPrice: 30, priceUnit: '₹', cultivationSteps: [] },
  // Vegetables
  { name: 'Potatoes', type: 'Vegetables', image: '/image.png', marketPrice: 20, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Onion', type: 'Vegetables', image: '/image.png', marketPrice: 25, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Tomatoes', type: 'Vegetables', image: '/image.png', marketPrice: 30, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Cabbage', type: 'Vegetables', image: '/image.png', marketPrice: 15, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Eggplant', type: 'Vegetables', image: '/image.png', marketPrice: 22, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Cauliflower', type: 'Vegetables', image: '/image.png', marketPrice: 28, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Cucumbers', type: 'Vegetables', image: '/image.png', marketPrice: 18, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Garlic', type: 'Vegetables', image: '/image.png', marketPrice: 150, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Okra', type: 'Vegetables', image: '/image.png', marketPrice: 40, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Carrots', type: 'Vegetables', image: '/image.png', marketPrice: 35, priceUnit: '₹', cultivationSteps: [] },
  // Fruits
  { name: 'Mango', type: 'Fruits', image: '/image.png', marketPrice: 60, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Banana', type: 'Fruits', image: '/image.png', marketPrice: 40, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Apple', type: 'Fruits', image: '/image.png', marketPrice: 80, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Papaya', type: 'Fruits', image: '/image.png', marketPrice: 30, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Guava', type: 'Fruits', image: '/image.png', marketPrice: 50, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Pineapple', type: 'Fruits', image: '/image.png', marketPrice: 45, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Watermelon', type: 'Fruits', image: '/image.png', marketPrice: 20, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Grapes', type: 'Fruits', image: '/image.png', marketPrice: 70, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Pomegranate', type: 'Fruits', image: '/image.png', marketPrice: 120, priceUnit: '₹', cultivationSteps: [] },
  // Pulses
  { name: 'Soybeans', type: 'Pulses', image: '/image.png', marketPrice: 50, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Bean', type: 'Pulses', image: '/image.png', marketPrice: 60, priceUnit: '₹', cultivationSteps: [] },
  { 
    name: 'Lentil (Masoor)', type: 'Pulses', image: '/image.png', marketPrice: 80, priceUnit: '₹', 
    cultivationSteps: ["Step 1: Land preparation.", "Step 2: Sowing.", "Step 3: Irrigation.", "Step 4: Weed control.", "Step 5: Harvesting."]
  },
  { 
    name: 'Chickpea (Chana)', type: 'Pulses', image: '/image.png', marketPrice: 70, priceUnit: '₹',
    cultivationSteps: [
        "Land Preparation: The field should be well-ploughed and leveled.",
        "Sowing: Sow seeds in the second fortnight of October.",
        "Irrigation: One or two irrigations are sufficient. Avoid waterlogging.",
        "Weed Control: Keep the field free of weeds for the first 30-40 days.",
        "Pest Management: Watch for pod borer and apply control measures if necessary.",
        "Harvesting: Harvest when the leaves turn reddish-brown and start shedding."
    ]
  },
  // Others
  { name: 'Cotton', type: 'Others', image: '/image.png', marketPrice: 150, priceUnit: '₹', cultivationSteps: [] },
  { name: 'Sugarcane', type: 'Others', image: '/image.png', marketPrice: 5, priceUnit: '₹', cultivationSteps: [] },
];

export const seasons = ['Kharif', 'Rabi', 'Zaid'];