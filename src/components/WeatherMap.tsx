import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, LayersControl, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MarkedLocation {
  lat: number;
  lng: number;
  name: string;
}

interface WeatherMapProps {
  onLocationSelect: (location: MarkedLocation) => void;
  selectedLocation: MarkedLocation | null;
}

const indiaCenter: [number, number] = [22.9734, 78.6569];
const indiaBounds: [[number, number], [number, number]] = [
  [6.0, 68.0],
  [37.5, 97.5],
];

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, Math.max(map.getZoom(), 6));
  }, [center]);
  return null;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ onLocationSelect, selectedLocation }) => {
  const owmKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<MarkedLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<MarkedLocation[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  const saveFavorites = (next: MarkedLocation[]) => {
    setFavorites(next);
    try { localStorage.setItem('favorites', JSON.stringify(next)); } catch {}
  };

  const addFavorite = () => {
    if (!selectedLocation) return;
    const exists = favorites.some(f => Math.abs(f.lat - selectedLocation.lat) < 1e-6 && Math.abs(f.lng - selectedLocation.lng) < 1e-6);
    if (exists) return;
    saveFavorites([selectedLocation, ...favorites].slice(0, 10));
  };

  const removeFavorite = (loc: MarkedLocation) => {
    saveFavorites(favorites.filter(f => !(Math.abs(f.lat - loc.lat) < 1e-6 && Math.abs(f.lng - loc.lng) < 1e-6)));
  };

  const handleSelect = async (lat: number, lng: number) => {
    const rounded = { lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) };
    const name = await reverseGeocode(rounded.lat, rounded.lng);
    const location: MarkedLocation = {
      lat: rounded.lat,
      lng: rounded.lng,
      name: name || `Lat ${rounded.lat.toFixed(2)}, Lng ${rounded.lng.toFixed(2)}`,
    };
    onLocationSelect(location);
  };

  const cloudTileUrl = useMemo(() => (owmKey ? `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${owmKey}` : undefined), [owmKey]);
  const tempTileUrl = useMemo(() => (owmKey ? `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${owmKey}` : undefined), [owmKey]);
  const precipTileUrl = useMemo(() => (owmKey ? `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${owmKey}` : undefined), [owmKey]);
  const windTileUrl = useMemo(() => (owmKey ? `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${owmKey}` : undefined), [owmKey]);

  // Search: Open-Meteo geocoding API (no key), scoped to India
  const searchDebounceRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!search) { setSuggestions([]); return; }
    window.clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = window.setTimeout(async () => {
      setIsSearching(true);
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=5&language=en&format=json&country=IN`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('search failed');
        const data = await res.json();
        const items: MarkedLocation[] = (data.results || []).map((r: any) => ({
          lat: r.latitude,
          lng: r.longitude,
          name: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}${r.country ? ', ' + r.country : ''}`,
        }));
        setSuggestions(items);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => window.clearTimeout(searchDebounceRef.current);
  }, [search]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Weather & Cloud Map</h2>
        <div className="flex items-center space-x-2 w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city in India…"
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {selectedLocation && (
            <button onClick={addFavorite} className="px-3 py-2 rounded-lg text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200">★ Save</button>
          )}
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mb-3 bg-white border rounded-lg shadow-sm divide-y">
          {suggestions.map((s, i) => (
            <button
              key={`${s.lat}-${s.lng}-${i}`}
              onClick={() => { setSuggestions([]); onLocationSelect(s); }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <div className="w-full h-96 rounded-lg overflow-hidden relative">
        <MapContainer center={indiaCenter} zoom={5} style={{ width: '100%', height: '100%' }} maxBounds={indiaBounds} maxBoundsViscosity={1.0}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LayersControl position="topright">
            {cloudTileUrl && (
              <LayersControl.Overlay name="Clouds">
                <TileLayer url={cloudTileUrl} opacity={0.8} attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>' />
              </LayersControl.Overlay>
            )}
            {tempTileUrl && (
              <LayersControl.Overlay name="Temperature">
                <TileLayer url={tempTileUrl} opacity={0.7} attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>' />
              </LayersControl.Overlay>
            )}
            {precipTileUrl && (
              <LayersControl.Overlay name="Precipitation">
                <TileLayer url={precipTileUrl} opacity={0.7} attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>' />
              </LayersControl.Overlay>
            )}
            {windTileUrl && (
              <LayersControl.Overlay name="Wind">
                <TileLayer url={windTileUrl} opacity={0.7} attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>' />
              </LayersControl.Overlay>
            )}
          </LayersControl>

          <ClickHandler onClick={handleSelect} />

          {selectedLocation && (
            <>
              <RecenterMap center={[selectedLocation.lat, selectedLocation.lng]} />
              <CircleMarker center={[selectedLocation.lat, selectedLocation.lng]} radius={8} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.9 }}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-medium mb-1">{selectedLocation.name}</div>
                    <div>Lat {selectedLocation.lat.toFixed(2)}, Lng {selectedLocation.lng.toFixed(2)}</div>
                    <button onClick={addFavorite} className="mt-2 px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200">★ Save favorite</button>
                  </div>
                </Popup>
              </CircleMarker>
            </>
          )}
        </MapContainer>
        {!owmKey && (
          <div className="absolute bottom-3 left-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">
            Optional overlays require VITE_OPENWEATHER_API_KEY
          </div>
        )}
      </div>

      {favorites.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Favorites</div>
          <div className="flex flex-wrap gap-2">
            {favorites.map((f, idx) => (
              <div key={`${f.lat}-${f.lng}-${idx}`} className="flex items-center gap-1">
                <button
                  onClick={() => onLocationSelect(f)}
                  className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                >
                  {f.name}
                </button>
                <button
                  onClick={() => removeFavorite(f)}
                  className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 hover:bg-red-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    // Use Nominatim reverse geocoding (no key). Respect usage policy by sending acceptable referer via browser
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    const addr = data.address || {};
    const name = data.name || addr.city || addr.town || addr.village || addr.county || addr.state;
    if (name && addr.state) return `${name}, ${addr.state}`;
    return name || null;
  } catch {
    return null;
  }
}

export default WeatherMap;