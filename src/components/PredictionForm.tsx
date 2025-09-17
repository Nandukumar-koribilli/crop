import React from 'react';
import { Calendar, Sprout, ChevronDown, Search, Apple, Wheat, Leaf, Droplet } from 'lucide-react';
import { crops, seasons, soilTypes } from '../crop-data';

interface PredictionFormProps {
  onSubmit: (formData: { crop: string; season: string; soil: string }) => void;
}

const cropTypes = [
  { name: 'All Crops', icon: Leaf },
  { name: 'Fruits', icon: Apple },
  { name: 'Vegetables', icon: Leaf },
  { name: 'Grains', icon: Wheat },
  { name: 'Pulses', icon: Droplet },
];

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [selectedCrop, setSelectedCrop] = React.useState(crops[0].name);
  const [formOptions, setFormOptions] = React.useState({
    season: seasons[0],
    soil: soilTypes[0],
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('All Crops');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      crop: selectedCrop,
      ...formOptions,
    });
  };

  const filteredCrops = crops.filter(crop => {
    const matchesFilter = activeFilter === 'All Crops' || crop.type === activeFilter;
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center">
        <Sprout className="w-6 h-6 mr-2 text-green-600" />
        Select Crop Type
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search and Filter */}
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {cropTypes.map((type) => (
              <button
                key={type.name}
                type="button"
                onClick={() => setActiveFilter(type.name)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-colors duration-200 ${
                  activeFilter === type.name
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Crop Selection Grid */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg border">
            {filteredCrops.map((crop) => (
              <button
                key={crop.name}
                type="button"
                onClick={() => setSelectedCrop(crop.name)}
                className={`p-3 rounded-lg text-center transition-all duration-200 border-2 ${
                  selectedCrop === crop.name
                    ? 'border-green-500 bg-white shadow-md'
                    : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                }`}
              >
                <img src={crop.image} alt={crop.name} className="w-full h-28 mx-auto rounded-md object-cover mb-2" />
                <div className="text-sm font-bold text-gray-800 truncate">{crop.name}</div>
                <div className="text-xs text-gray-500">{crop.type}</div>
                <div className="mt-1 px-2 py-0.5 inline-block bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {`${crop.priceUnit}${crop.marketPrice}/kg`}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            {/* Season Select */}
            <div className="relative">
              <label htmlFor="season-select" className="block text-sm font-medium text-gray-700 mb-1">Season</label>
              <Calendar className="absolute left-3 top-10 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                id="season-select"
                name="season"
                value={formOptions.season}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg pl-10 pr-10 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-10 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {/* Soil Type Select */}
            <div className="relative">
              <label htmlFor="soil-select" className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
              <Sprout className="absolute left-3 top-10 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                id="soil-select"
                name="soil"
                value={formOptions.soil}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg pl-10 pr-10 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {soilTypes.map((soil) => (
                  <option key={soil} value={soil}>
                    {soil}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-10 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Predict Yield
        </button>
      </form>
    </div>
  );
};