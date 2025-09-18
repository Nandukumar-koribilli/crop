import React, { useState } from 'react';
import { Search, Filter, Leaf, Apple, Wheat, Bean } from 'lucide-react';
import { cropDatabase } from '../data/crops';

interface CropSelectorProps {
  selectedCrop: string;
  onCropSelect: (cropId: string) => void;
}

export const CropSelector: React.FC<CropSelectorProps> = ({ selectedCrop, onCropSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Crops', icon: Leaf, color: 'text-green-600' },
    { id: 'fruits', name: 'Fruits', icon: Apple, color: 'text-red-600' },
    { id: 'vegetables', name: 'Vegetables', icon: Leaf, color: 'text-green-600' },
    { id: 'grains', name: 'Grains', icon: Wheat, color: 'text-yellow-600' },
    { id: 'pulses', name: 'Pulses', icon: Bean, color: 'text-orange-600' }
  ];

  const filteredCrops = cropDatabase.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Leaf className="h-6 w-6 mr-2 text-green-600" />
        Select Crop Type
      </h2>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search crops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              <IconComponent className={`h-4 w-4 mr-1 ${category.color}`} />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => onCropSelect(crop.id)}
            className={`cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md ${
              selectedCrop === crop.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-20 object-cover rounded-md mb-2"
            />
            <h3 className="font-medium text-sm text-gray-900 text-center">{crop.name}</h3>
            <p className="text-xs text-gray-600 text-center capitalize">{crop.category}</p>
            <div className="mt-2 text-center">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                ₹{crop.marketPrice}/kg
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Filter className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No crops found matching your criteria</p>
        </div>
      )}
    </div>
  );
};