import React, { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind, Thermometer, Sun, Eye } from 'lucide-react';

interface WeatherConditionsProps {
  selectedLocation: { lat: number; lng: number; name: string } | null;
}

interface CurrentWeather {
  condition: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex?: number;
}

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  rainfall: number;
}

const WeatherConditions: React.FC<WeatherConditionsProps> = ({ selectedLocation }) => {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedLocation) return;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          latitude: String(selectedLocation.lat),
          longitude: String(selectedLocation.lng),
          current: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'apparent_temperature'].join(','),
          hourly: ['visibility', 'precipitation_probability', 'weather_code'].join(','),
          daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max', 'weather_code'].join(','),
          timezone: 'auto',
        });
        const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();

        const cur = data.current || {};
        const hr = data.hourly || {};
        const daily = data.daily || {};

        setCurrent({
          condition: mapWeatherCodeToText(cur.weather_code ?? hr.weather_code?.[0]),
          temperature: Math.round(cur.temperature_2m ?? 0),
          feelsLike: Math.round(cur.apparent_temperature ?? cur.temperature_2m ?? 0),
          humidity: Math.round(cur.relative_humidity_2m ?? 0),
          windSpeed: Math.round(cur.wind_speed_10m ?? 0),
          visibility: Math.max(0, Math.round((hr.visibility?.[0] ?? 0) / 1000)),
        });

        const days: ForecastDay[] = (daily.time ?? []).slice(0, 5).map((iso: string, i: number) => ({
          day: new Date(iso).toLocaleDateString(undefined, { weekday: 'short' }),
          high: Math.round(daily.temperature_2m_max?.[i] ?? 0),
          low: Math.round(daily.temperature_2m_min?.[i] ?? 0),
          condition: mapWeatherCodeToText(daily.weather_code?.[i]),
          rainfall: Math.round(daily.precipitation_probability_max?.[i] ?? 0),
        }));
        setForecast(days);
      } catch (e: any) {
        setError(e.message || 'Failed to load weather');
        setCurrent(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [selectedLocation?.lat, selectedLocation?.lng]);

  if (!selectedLocation) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Conditions</h2>
        <div className="text-center text-gray-500 py-8">
          Please select a location on the map to view weather conditions
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Weather Conditions</h2>

      {loading && (
        <div className="text-center text-gray-500 py-8">Loading weather…</div>
      )}
      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{error}</div>
      )}

      {current && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Weather - {selectedLocation.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Cloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Condition</p>
              <p className="font-bold text-gray-800">{current.condition}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="font-bold text-gray-800">{current.temperature}°C</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <Sun className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Feels Like</p>
              <p className="font-bold text-gray-800">{current.feelsLike}°C</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg text-center">
              <Droplets className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-bold text-gray-800">{current.humidity}%</p>
            </div>
          </div>
        </div>
      )}

      {current && (
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Wind className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="font-bold text-gray-800">{current.windSpeed} km/h</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Visibility</p>
              <p className="font-bold text-gray-800">{current.visibility} km</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">UV Index</p>
              <p className="font-bold text-gray-800">—</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Conditions</p>
              <p className="font-bold text-gray-800">{current.condition}</p>
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg text-center">
                <p className="font-medium text-gray-700 mb-2">{day.day}</p>
                <p className="text-sm text-gray-600 mb-2">{day.condition}</p>
                <p className="text-lg font-bold text-gray-800">{day.high}°/{day.low}°</p>
                <div className="flex items-center justify-center mt-2">
                  <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-gray-600">{day.rainfall}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function mapWeatherCodeToText(code?: number): string {
  if (code === undefined || code === null) return 'N/A';
  // Simplified mapping per Open-Meteo weather codes
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Partly Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';
  if ([71, 73, 75, 77].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Showers';
  if ([85, 86].includes(code)) return 'Snow Showers';
  if ([95].includes(code)) return 'Thunderstorm';
  if ([96, 99].includes(code)) return 'Thunderstorm (Hail)';
  return 'N/A';
}

export default WeatherConditions;