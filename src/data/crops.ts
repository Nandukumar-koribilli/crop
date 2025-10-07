import { CropType } from '../types';

export const cropDatabase: CropType[] = [
  // Fruits
  {
    id: 'apple',
    name: 'Apple',
    category: 'fruits',
    seasons: ['Winter', 'Spring'],
    soilTypes: ['Red Lateritic', 'Well-drained'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 1460, // 4-5 years to first yield
    avgYield: 20,
    marketPrice: 80, // ₹60-₹100/kg
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruits',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Well-drained Loamy', 'pH 6.0-7.5'],
    minTemp: 26,
    maxTemp: 35,
    waterRequirement: 'high',
    growthDays: 405, // 360-450 days
    marketPrice: 32, // ₹25-₹40/kg
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruits',
    seasons: ['Summer'],
    soilTypes: ['Red Loamy', 'Well-drained'],
    minTemp: 24,
    maxTemp: 35,
    waterRequirement: 'medium',
    growthDays: 900, // 2.5-3 years to first yield
    avgYield: 8,
    marketPrice: 90, // ₹60-₹120/kg
    image: 'https://imageafter.com/dbase/images/nature_food/b1mango01.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'grapes',
    name: 'Grapes',
    category: 'fruits',
    seasons: ['Summer', 'Winter'],
    soilTypes: ['Rich Loamy', 'Well-drained'],
    minTemp: 20,
    maxTemp: 32,
    waterRequirement: 'medium',
    growthDays: 750, // 600-900 days from planting to first
    marketPrice: 65, // ₹50-₹80/kg
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    category: 'fruits',
    seasons: ['Winter'],
    soilTypes: ['Wide range Loamy to Sandy', 'Tolerant to salinity'],
    minTemp: 25,
    maxTemp: 35,
    waterRequirement: 'low',
    growthDays: 450, // 365-540 days (1-1.5 years to first)
    marketPrice: 100, // ₹80-₹120/kg
    image: 'https://fthmb.tqn.com/o5VvwMoCqHImZj-RYWI67nYigRM=/5130x3420/filters:fill(auto,1)/usa--california--san-benito-county--ripe-pomegranates-on-tree-159237544-594ab22d5f9b58d58a2de6b0.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'papaya',
    name: 'Papaya',
    category: 'fruits',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Well-drained Uniform Texture'],
    minTemp: 21,
    maxTemp: 33,
    waterRequirement: 'medium',
    growthDays: 815, // 730-900 days (2-2.5 years)
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/papaya-benefits-1296x728-feature.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'guava',
    name: 'Guava',
    category: 'fruits',
    seasons: ['Winter', 'Monsoon'],
    soilTypes: ['Well-drained Loamy', 'Tolerant to salinity/alkalinity'],
    minTemp: 23,
    maxTemp: 28,
    waterRequirement: 'medium',
    growthDays: 912, // 730-1095 days (2-3 years)
    marketPrice: 50, // ₹40-₹60/kg
    image: 'https://tropikalmeyveler.com/wp-content/uploads/2019/03/whole-fresh-guava-fruit-PK5DQQB-1.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    category: 'fruits',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Light Well-drained Sandy/Loamy'],
    minTemp: 22,
    maxTemp: 32,
    waterRequirement: 'medium',
    growthDays: 630, // 540-720 days (1.5-2 years)
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    category: 'fruits',
    seasons: ['Summer'],
    soilTypes: ['Sandy Loam Rich in Organics'],
    minTemp: 25,
    maxTemp: 35,
    waterRequirement: 'high',
    growthDays: 105, // 90-120 days
    avgYield: 25,
    marketPrice: 20, // ₹15-₹25/kg
    image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'fruits',
    seasons: ['Winter'],
    soilTypes: ['Deep Loamy', 'Well-drained'],
    minTemp: 15,
    maxTemp: 30,
    waterRequirement: 'medium',
    growthDays: 1825, // 5 years to first yield
    marketPrice: 60, // ₹50-₹70/kg
    image: 'https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    category: 'fruits',
    seasons: ['Summer', 'Winter'],
    soilTypes: ['Deep Loamy/Alluvial'],
    minTemp: 21,
    maxTemp: 30,
    waterRequirement: 'medium',
    growthDays: 1277, // 1095-1460 days (3-4 years)
    marketPrice: 50, // ₹40-₹60/kg
    image: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'jackfruit',
    name: 'Jackfruit',
    category: 'fruits',
    seasons: ['Summer'],
    soilTypes: ['Deep Well-drained'],
    minTemp: 25,
    maxTemp: 35,
    waterRequirement: 'medium',
    growthDays: 2372, // 1825-2920 days (5-8 years)
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://healthyfamilyproject.com/wp-content/uploads/2020/05/Jackfruit-background.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'lychee',
    name: 'Lychee',
    category: 'fruits',
    seasons: ['Summer'],
    soilTypes: ['Well-drained Loamy'],
    minTemp: 20,
    maxTemp: 33,
    waterRequirement: 'high',
    growthDays: 2007, // 1825-2190 days (5-6 years)
    marketPrice: 125, // ₹100-₹150/kg
    image: 'https://www.thespruceeats.com/thmb/6Zv_jaeLj557Xfpu4vczVqAw5jc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-583920053-8afcb3f991144493a3a0c67770d9619d.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'fig',
    name: 'Fig',
    category: 'fruits',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Well-drained Sandy/Loamy'],
    minTemp: 15,
    maxTemp: 21,
    waterRequirement: 'low',
    growthDays: 912, // 730-1095 days (2-3 years)
    marketPrice: 175, // ₹150-₹200/kg
    image: 'https://minnetonkaorchards.com/wp-content/uploads/2023/03/fig-tree-seeds-2.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'muskmelon',
    name: 'Muskmelon',
    category: 'fruits',
    seasons: ['Summer'],
    soilTypes: ['Sandy Loam', 'Well-drained'],
    minTemp: 20,
    maxTemp: 30,
    waterRequirement: 'high',
    growthDays: 90, // 80-100 days
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://static.toiimg.com/photo/78075710.cms?auto=compress&cs=tinysrgb&w=800'
  },
  // Vegetables
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetables',
    seasons: ['Winter', 'Spring'],
    soilTypes: ['Well-drained Loamy/Sandy'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 135, // 120-150 days
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetables',
    seasons: ['Winter', 'Summer'],
    soilTypes: ['Sandy Loam', 'Well-drained'],
    minTemp: 18,
    maxTemp: 29,
    waterRequirement: 'medium',
    growthDays: 75, // 60-80 days
    avgYield: 60,
    marketPrice: 30, // ₹20-₹40/kg
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Loose'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 105, // 90-120 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Deep'],
    minTemp: 15,
    maxTemp: 20,
    waterRequirement: 'medium',
    growthDays: 75, // 70-80 days
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'brinjal',
    name: 'Brinjal (Eggplant)',
    category: 'vegetables',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Loamy', 'Well-drained'],
    minTemp: 21,
    maxTemp: 29,
    waterRequirement: 'medium',
    growthDays: 135, // 120-150 days
    marketPrice: 30, // ₹20-₹40/kg
    image: 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Fertile'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 75, // 60-90 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Well-drained'],
    minTemp: 15,
    maxTemp: 20,
    waterRequirement: 'medium',
    growthDays: 75, // 60-90 days
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://tse3.mm.bing.net/th/id/OIP.ZcL2dB0mrVQzSZzgQ1NBhwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Rich Organics'],
    minTemp: 10,
    maxTemp: 22,
    waterRequirement: 'medium',
    growthDays: 35, // 30-40 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'okra',
    name: 'Okra (Lady\'s Finger)',
    category: 'vegetables',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Well-drained Loamy'],
    minTemp: 25,
    maxTemp: 35,
    waterRequirement: 'medium',
    growthDays: 55, // 50-60 days
    marketPrice: 50, // ₹40-₹60/kg
    image: 'https://tse4.mm.bing.net/th/id/OIP.-NHbaSs-yboVqnYXwTkDggHaE8?rs=1&pid=ImgDetMain&o=7&rm=3?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    category: 'vegetables',
    seasons: ['Summer'],
    soilTypes: ['Sandy Loam', 'Well-drained'],
    minTemp: 20,
    maxTemp: 30,
    waterRequirement: 'high',
    growthDays: 60, // 50-70 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper (Capsicum)',
    category: 'vegetables',
    seasons: ['Winter', 'Summer'],
    soilTypes: ['Well-drained Loamy'],
    minTemp: 21,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 70, // 60-80 days
    marketPrice: 70, // ₹60-₹80/kg
    image: 'https://www.healthbenefitstimes.com/9/gallery/bell-peppers/cache/Bell-peppers.jpg-nggid041295-ngg0dyn-218x146x100-00f0w010c011r110f110r010t010.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'radish',
    name: 'Radish',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Loose'],
    minTemp: 10,
    maxTemp: 18,
    waterRequirement: 'medium',
    growthDays: 40, // 30-50 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://gardenerspath.com/wp-content/uploads/2023/05/How-to-Grow-Radishes-FB.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'beetroot',
    name: 'Beetroot',
    category: 'vegetables',
    seasons: ['Winter'],
    soilTypes: ['Sandy Loam', 'Well-drained'],
    minTemp: 15,
    maxTemp: 22,
    waterRequirement: 'medium',
    growthDays: 70, // 60-80 days
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://th.bing.com/th/id/R.cc6e617b404980aaf862da9334a86f0c?rik=Q71U4mpjD9WrHw&riu=http%3a%2f%2fhealtheatingfood.com%2fwp-content%2fuploads%2f2016%2f03%2fBeetroot-nutritional-composition.jpg&ehk=J9LlpYYpDvyWxlvKfmH6rXzgZeKFXoOHNjDktkmdGHw%3d&risl=&pid=ImgRaw&r=0?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'green-beans',
    name: 'Green Beans',
    category: 'vegetables',
    seasons: ['Monsoon', 'Winter'],
    soilTypes: ['Loamy', 'Well-drained'],
    minTemp: 15,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 55, // 50-60 days
    marketPrice: 60, // ₹50-₹70/kg
    image: 'https://th.bing.com/th/id/R.c48f9474c3135a33c6005083effd11e7?rik=IZPaE%2f6OsbRT4A&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f80000%2fvelka%2ffresh-greenbeans.jpg&ehk=iostP5pzM1YaMJee2CjIQmQcU9aqtsrNnoLKVcLpQCM%3d&risl=&pid=ImgRaw&r=0?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    category: 'vegetables',
    seasons: ['Monsoon', 'Winter'],
    soilTypes: ['Sandy Loam', 'Fertile'],
    minTemp: 18,
    maxTemp: 30,
    waterRequirement: 'medium',
    growthDays: 105, // 90-120 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://tse4.mm.bing.net/th/id/OIP.-06upNMc0ar7Olw1zr5ojQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3?auto=compress&cs=tinysrgb&w=800'
  },
  // Grains
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'grains',
    seasons: ['Winter'],
    soilTypes: ['Loamy/Clayey', 'Well-drained'],
    minTemp: 10,
    maxTemp: 25,
    waterRequirement: 'medium',
    growthDays: 115, // 110-120 days
    avgYield: 3.2,
    marketPrice: 27, // ₹25-₹30/kg
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'grains',
    seasons: ['Monsoon', 'Summer'],
    soilTypes: ['Clayey/Loamy', 'Flooded'],
    minTemp: 20,
    maxTemp: 35,
    waterRequirement: 'high',
    growthDays: 135, // 120-150 days
    marketPrice: 40, // ₹30-₹50/kg
    image: 'https://english.ahram.org.eg/Media/News/2023/12/5/41_2023-638374065617680784-768.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    category: 'grains',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Well-drained Loamy/Sandy'],
    minTemp: 21,
    maxTemp: 27,
    waterRequirement: 'medium',
    growthDays: 100, // 90-110 days
    marketPrice: 25, // ₹20-₹30/kg
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'barley',
    name: 'Barley',
    category: 'grains',
    seasons: ['Winter'],
    soilTypes: ['Loamy', 'Well-drained'],
    minTemp: 12,
    maxTemp: 22,
    waterRequirement: 'low',
    growthDays: 110, // 100-120 days
    marketPrice: 30, // ₹25-₹35/kg
    image: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/295/295268/barley-grains-in-a-wooden-bowl.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  // Pulses
  {
    id: 'chickpea',
    name: 'Chickpea (Chana)',
    category: 'pulses',
    seasons: ['Winter'],
    soilTypes: ['Black Loamy', 'Well-drained'],
    minTemp: 15,
    maxTemp: 30,
    waterRequirement: 'low',
    growthDays: 92, // 85-100 days
    marketPrice: 80, // ₹70-₹90/kg
    image: 'https://www.momjunction.com/wp-content/uploads/2014/08/8-Health-Benefits-of-Chickpeas-Chana-During-Pregnancy.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    category: 'pulses',
    seasons: ['Winter'],
    soilTypes: ['Loamy/Sandy', 'Well-drained'],
    minTemp: 18,
    maxTemp: 30,
    waterRequirement: 'low',
    growthDays: 120, // 110-130 days
    marketPrice: 90, // ₹80-₹100/kg
    image: 'https://onelifetoeat.files.wordpress.com/2010/04/brown-lentil-masoor-dal.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'black-gram',
    name: 'Black Gram (Urad)',
    category: 'pulses',
    seasons: ['Summer', 'Winter'],
    soilTypes: ['Black/Red Loamy'],
    minTemp: 25,
    maxTemp: 35,
    waterRequirement: 'medium',
    growthDays: 70, // 65-75 days
    marketPrice: 100, // ₹90-₹110/kg
    image: 'https://img.freepik.com/free-photo/urad-dal-black-gram-vigna-mungo-wooden-bowl-white-surface_136354-1704.jpg?size=626&ext=jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'green-gram',
    name: 'Green Gram (Moong)',
    category: 'pulses',
    seasons: ['Summer', 'Monsoon'],
    soilTypes: ['Sandy Loam', 'Well-drained'],
    minTemp: 20,
    maxTemp: 40,
    waterRequirement: 'low',
    growthDays: 65, // 60-70 days
    marketPrice: 80, // ₹60-₹100/kg (pulses average)
    image: 'https://www.naatigrains.com/image/cache/catalog/naatigrains-products/NG195/green-gram-paasi-payiru-masala-multi-vitamins-nuts-seeds-order-now-bangalore-naati-grains-1000x1000.jpg?auto=compress&cs=tinysrgb&w=800'
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
  'Mountain Soil', 'Loamy', 'Sandy Loam', 'Clay Loam', 'Clay',
  'Red Lateritic', 'Well-drained Loamy', 'Rich Loamy', 'Light Well-drained Sandy/Loamy',
  'Sandy Loam Rich in Organics', 'Deep Loamy/Alluvial', 'Deep Well-drained',
  'Well-drained Sandy/Loamy', 'Well-drained Loamy/Sandy', 'Black Loamy',
  'Black/Red Loamy', 'Well-drained Uniform Texture', 'Wide range Loamy to Sandy'
];

export const seasons = ['Summer', 'Monsoon', 'Winter', 'Spring'];