import React, { useState } from 'react';
import { Map, Satellite, Cloud, Eye } from 'lucide-react';

export const CloudMap: React.FC = () => {
  const [mapType, setMapType] = useState<'satellite' | 'weather' | 'clouds'>('clouds');

  const getMapBackground = () => {
    switch (mapType) {
      case 'satellite':
        return 'from-green-600 to-green-800';
      case 'weather':
        return 'from-blue-600 to-blue-800';
      case 'clouds':
        return 'from-gray-600 to-gray-800';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Weather & Cloud Map</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setMapType('satellite')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              mapType === 'satellite' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Satellite className="h-4 w-4 inline mr-1" />
            Satellite
          </button>
          <button
            onClick={() => setMapType('weather')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              mapType === 'weather' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Map className="h-4 w-4 inline mr-1" />
            Weather
          </button>
          <button
            onClick={() => setMapType('clouds')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              mapType === 'clouds' 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Cloud className="h-4 w-4 inline mr-1" />
            Clouds
          </button>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${getMapBackground()} rounded-lg h-80 relative overflow-hidden`}>
        {/* Simulated map with weather patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-16 w-20 h-20 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-24 right-20 w-16 h-16 bg-white rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white rounded-full opacity-70"></div>
          <div className="absolute bottom-16 right-16 w-18 h-18 bg-white rounded-full opacity-45"></div>
        </div>

        {/* Location markers */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Farm Locations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
              <span>Cloud Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-3 w-3" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>

        {/* Weather data overlay */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
          <div className="text-xs space-y-1">
            <div>Cloud Cover: 45%</div>
            <div>Precipitation: 12mm</div>
            <div>Visibility: 8km</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Real-time weather and cloud coverage data for your farming locations
        </p>
      </div>
    </div>
  );
};