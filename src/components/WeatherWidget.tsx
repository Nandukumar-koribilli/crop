import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  forecast: Array<{
    day: string;
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
  }>;
}

const mockWeatherData: WeatherData = {
  temperature: 24,
  humidity: 68,
  windSpeed: 12,
  rainfall: 15,
  condition: 'cloudy',
  forecast: [
    { day: 'Today', temp: 24, condition: 'cloudy' },
    { day: 'Tomorrow', temp: 26, condition: 'sunny' },
    { day: 'Thu', temp: 22, condition: 'rainy' },
    { day: 'Fri', temp: 25, condition: 'sunny' },
    { day: 'Sat', temp: 23, condition: 'cloudy' },
  ]
};

export const WeatherWidget: React.FC = () => {
  const getWeatherIcon = (condition: string, size: string = 'h-6 w-6') => {
    switch (condition) {
      case 'sunny': return <Sun className={`${size} text-yellow-500`} />;
      case 'cloudy': return <Cloud className={`${size} text-gray-500`} />;
      case 'rainy': return <CloudRain className={`${size} text-blue-500`} />;
      default: return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
      <h2 className="text-xl font-bold mb-4">Weather Conditions</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getWeatherIcon(mockWeatherData.condition, 'h-10 w-10')}
          <div>
            <div className="text-3xl font-bold">{mockWeatherData.temperature}°C</div>
            <div className="text-blue-100 capitalize">{mockWeatherData.condition}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4 text-blue-200" />
          <div>
            <div className="text-sm text-blue-200">Humidity</div>
            <div className="font-semibold">{mockWeatherData.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="h-4 w-4 text-blue-200" />
          <div>
            <div className="text-sm text-blue-200">Wind Speed</div>
            <div className="font-semibold">{mockWeatherData.windSpeed} km/h</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CloudRain className="h-4 w-4 text-blue-200" />
          <div>
            <div className="text-sm text-blue-200">Rainfall</div>
            <div className="font-semibold">{mockWeatherData.rainfall} mm</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4 text-blue-200" />
          <div>
            <div className="text-sm text-blue-200">Feels Like</div>
            <div className="font-semibold">{mockWeatherData.temperature + 2}°C</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-blue-100 mb-3">5-Day Forecast</h3>
        <div className="flex justify-between space-x-2">
          {mockWeatherData.forecast.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-blue-200 mb-1">{day.day}</div>
              <div className="mb-1">{getWeatherIcon(day.condition, 'h-4 w-4 mx-auto')}</div>
              <div className="text-sm font-semibold">{day.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};