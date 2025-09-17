import React from 'react';
import { MapPin, Calendar, Mountain, Ruler } from 'lucide-react';
import { FormData } from '../types';
import { indianStates, soilTypes, seasons } from '../data/crops';

interface FarmingFormProps {
  formData: FormData;
  onFormChange: (data: Partial<FormData>) => void;
}

export const FarmingForm: React.FC<FarmingFormProps> = ({ formData, onFormChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Mountain className="h-6 w-6 mr-2 text-blue-600" />
        Farm Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Season Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Growing Season
          </label>
          <select
            value={formData.season}
            onChange={(e) => onFormChange({ season: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Season</option>
            {seasons.map((season) => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </div>

        {/* State Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            State
          </label>
          <select
            value={formData.state}
            onChange={(e) => onFormChange({ state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Soil Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Mountain className="h-4 w-4 mr-1" />
            Soil Type
          </label>
          <select
            value={formData.soilType}
            onChange={(e) => onFormChange({ soilType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Soil Type</option>
            {soilTypes.map((soil) => (
              <option key={soil} value={soil}>{soil}</option>
            ))}
          </select>
        </div>

        {/* Land Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Ruler className="h-4 w-4 mr-1" />
            Land Area (Hectares)
          </label>
          <input
            type="number"
            value={formData.landArea || ''}
            onChange={(e) => onFormChange({ landArea: parseFloat(e.target.value) || 0 })}
            placeholder="Enter area in hectares"
            min="0.1"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};