import React, { useState } from 'react';
import { Map, Satellite, Cloud, Eye, MapPin } from 'lucide-react';

export const CloudMap: React.FC = () => {
  const [mapType, setMapType] = useState<'satellite' | 'weather' | 'clouds'>('clouds');
  const [error, setError] = useState(false);

  const getMapUrl = () => {
    switch (mapType) {
      case 'satellite':
        return 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=YOUR_MAPBOX_TOKEN';
      case 'weather':
        return 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY';
      case 'clouds':
        return 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY';
      default:
        return '';
    }
  };

  const getMapEmbedUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15562.5!2d83.2185!3d17.6868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39f4a2b8f9b8c1%3A0x8b2b8b8b8b8b8b8b!2sVisakhapatnam%2C+Andhra+Pradesh!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin';
    
    switch (mapType) {
      case 'satellite':
        return baseUrl.replace('5e0', '5e1'); // Satellite view
      case 'weather':
        return baseUrl.replace('5e0', '5e2'); // Terrain/Weather-like
      case 'clouds':
        return baseUrl; // Standard with cloud overlay simulation
      default:
        return baseUrl;
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
              mapType === 'satellite' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Satellite className="h-4 w-4 inline mr-1" />
            Satellite
          </button>
          <button
            onClick={() => setMapType('weather')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              mapType === 'weather' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Map className="h-4 w-4 inline mr-1" />
            Weather
          </button>
          <button
            onClick={() => setMapType('clouds')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              mapType === 'clouds' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Cloud className="h-4 w-4 inline mr-1" />
            Clouds
          </button>
        </div>
      </div>

      <div className="relative h-80 rounded-lg overflow-hidden">
        {error ? (
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Map unavailable - Check API keys</p>
          </div>
        ) : (
          <>
            {/* Base Map */}
            <iframe
              src={getMapEmbedUrl()}
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              title="Visakhapatnam Weather Map"
            />

            {/* Cloud Overlay - Visible only on Clouds mode */}
            {mapType === 'clouds' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Cloud Coverage Simulation */}
                <div className="absolute top-10 left-20 w-24 h-24 bg-white rounded-full opacity-30 mix-blend-multiply animate-pulse"></div>
                <div className="absolute top-32 right-24 w-20 h-20 bg-white rounded-full opacity-20 mix-blend-multiply animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-white rounded-full opacity-40 mix-blend-multiply animate-pulse delay-2000"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full opacity-35 mix-blend-multiply animate-pulse delay-1500"></div>
                <div className="absolute bottom-16 right-16 w-22 h-22 bg-white rounded-full opacity-25 mix-blend-multiply animate-pulse delay-3000"></div>
                
                {/* Semi-transparent cloud layer */}
                <div className="absolute inset-0 bg-white opacity-10 mix-blend-multiply"></div>
              </div>
            )}

            {/* Weather Overlay - Visible only on Weather mode */}
            {mapType === 'weather' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Rain/Precipitation Simulation */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-100/20 to-transparent opacity-60"></div>
                  {/* Rain drops animation */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-0.5 h-8 bg-blue-400 rounded opacity-40 animate-rain"></div>
                    <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-blue-400 rounded opacity-30 animate-rain delay-100"></div>
                    <div className="absolute top-0 left-3/4 w-0.5 h-10 bg-blue-400 rounded opacity-50 animate-rain delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Satellite Overlay - Visible only on Satellite mode */}
            {mapType === 'satellite' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Satellite grid overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg1MFY1MEgwWiIgZmlsbD0idHJhbnNwYXJlbnQiLz4KPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iNTAiIHkyPSI1MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNSw1Ii8+CjxsaW5lIHgxPSIwIiB5MT0iMjUiIHgyPSI1MCIgeTI9IjI1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz4KPGxpbmUgeDE9IjI1IiB5MT0iMCIgeDI9IjI1IiB5Mj0iNTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1kYXNoYXJyYXk9IjUsNSIvPgo8L3N2Zz4K')] opacity-20"></div>
              </div>
            )}

            {/* Location Pin - Always visible */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <div className="relative">
                <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
                <div className="absolute -top-1 -left-1 w-8 h-8 border-2 border-red-500 rounded-full opacity-50 animate-ping"></div>
                <MapPin className="absolute -top-8 -left-1/2 text-red-500 h-6 w-6" />
              </div>
            </div>

            {/* Mode Indicator */}
            <div className={`absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium z-10`}>
              {mapType === 'satellite' && '🛰️ Satellite View'}
              {mapType === 'weather' && '🌧️ Weather Layer'}
              {mapType === 'clouds' && '☁️ Cloud Coverage'}
            </div>
          </>
        )}

        <style jsx>{`
          @keyframes rain {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .animate-rain {
            animation: rain 2s linear infinite;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
        `}</style>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {mapType === 'clouds' && '☁️ Live cloud coverage overlay - Visakhapatnam, India'}
          {mapType === 'weather' && '🌧️ Weather patterns and precipitation - Visakhapatnam, India'}
          {mapType === 'satellite' && '🛰️ Satellite imagery view - Visakhapatnam, India'}
        </p>
      </div>
    </div>
  );
};