import React, { useState, useEffect, useMemo } from 'react';
import { Droplets, AlertTriangle, CheckCircle, Gauge } from 'lucide-react';

interface SoilMoistureData {
  value: number;
  status: 'dry' | 'optimal' | 'wet';
  lastReading: Date;
  sensorId: string;
  location: string;
}

interface SoilMoistureSensorProps {
  onDataUpdate?: (data: SoilMoistureData) => void;
}

const SoilMoistureSensor: React.FC<SoilMoistureSensorProps> = ({ onDataUpdate }) => {
  const [sensorData, setSensorData] = useState<SoilMoistureData>({
    value: 45,
    status: 'dry',
    lastReading: new Date(),
    sensorId: 'SMS-001',
    location: 'Field A'
  });

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationData, setCalibrationData] = useState({
    dryValue: 20,
    wetValue: 80
  });
  const [rawV0, setRawV0] = useState<number | null>(null);
  const [adcMax, setAdcMax] = useState<number>(1023);
  const [invert, setInvert] = useState<boolean>(false);

  // Live Blynk reading for V0
  const [localToken] = useState<string | undefined>(() => {
    try { return localStorage.getItem('blynk_token') || undefined; } catch { return undefined; }
  });
  const auth = localToken || (import.meta.env.VITE_BLYNK_TOKEN as string | undefined);
  const baseGet = useMemo(() => auth ? `https://blynk.cloud/external/api/get?token=${auth}` : undefined, [auth]);

  useEffect(() => {
    if (!auth) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${baseGet}&V0`);
        const text = await res.text();
        const raw = Number(text);
        if (!Number.isFinite(raw)) return; // ignore bad reads
        setRawV0(raw);
        const mapped = invert ? Math.max(0, adcMax - raw) : raw;
        const percent = Math.round((mapped / (adcMax || 1)) * 100);
        const moisturePercent = Math.max(0, Math.min(100, percent));
        setSensorData(prev => {
          let newStatus: 'dry' | 'optimal' | 'wet';
          if (moisturePercent < calibrationData.dryValue) newStatus = 'dry';
          else if (moisturePercent > calibrationData.wetValue) newStatus = 'wet';
          else newStatus = 'optimal';
          const updated = {
            ...prev,
            value: moisturePercent,
            status: newStatus,
            lastReading: new Date()
          };
          onDataUpdate?.(updated);
          return updated;
        });
      } catch {}
    }, 3000);

    return () => clearInterval(interval);
  }, [auth, baseGet, calibrationData, onDataUpdate, adcMax, invert]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dry': return 'text-red-600 bg-red-50 border-red-200';
      case 'optimal': return 'text-green-600 bg-green-50 border-green-200';
      case 'wet': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'dry': return <AlertTriangle className="w-5 h-5" />;
      case 'optimal': return <CheckCircle className="w-5 h-5" />;
      case 'wet': return <Droplets className="w-5 h-5" />;
      default: return <Gauge className="w-5 h-5" />;
    }
  };

  const getRecommendation = (status: string, value: number) => {
    switch (status) {
      case 'dry':
        return `Soil is too dry (${Math.round(value)}%). Consider watering immediately.`;
      case 'wet':
        return `Soil is too wet (${Math.round(value)}%). Avoid overwatering.`;
      case 'optimal':
        return `Soil moisture is optimal (${Math.round(value)}%). Good growing conditions.`;
      default:
        return 'Sensor reading unavailable.';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Soil Moisture Sensor</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Active</span>
        </div>
      </div>

      {/* Main Reading Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-gray-800 mb-2">
          {Math.round(sensorData.value)}%
        </div>
        <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(sensorData.status)}`}>
          {getStatusIcon(sensorData.status)}
          <span className="ml-2 font-medium capitalize">{sensorData.status}</span>
        </div>
      </div>

      {/* Moisture Level Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Dry</span>
          <span>Optimal</span>
          <span>Wet</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 relative">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ${
              sensorData.status === 'dry' ? 'bg-red-500' :
              sensorData.status === 'optimal' ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${sensorData.value}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm drop-shadow-lg">
              {Math.round(sensorData.value)}%
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Sensor ID</div>
          <div className="font-medium text-gray-800">{sensorData.sensorId}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Location</div>
          <div className="font-medium text-gray-800">{sensorData.location}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Last Reading</div>
          <div className="font-medium text-gray-800">
            {sensorData.lastReading.toLocaleTimeString()}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Status</div>
          <div className="font-medium text-gray-800 capitalize">{sensorData.status}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Raw V0 (debug)</div>
          <div className="font-medium text-gray-800">{rawV0 ?? '—'}</div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-800 mb-2">Recommendation</h4>
        <p className="text-blue-700 text-sm">{getRecommendation(sensorData.status, sensorData.value)}</p>
      </div>

      {/* Calibration Settings */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-800 mb-4">Calibration Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dry Threshold (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={calibrationData.dryValue}
              onChange={(e) => setCalibrationData(prev => ({ 
                ...prev, 
                dryValue: parseInt(e.target.value) 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wet Threshold (%)
            </label>
            <input
              type="number"
              min="50"
              max="100"
              value={calibrationData.wetValue}
              onChange={(e) => setCalibrationData(prev => ({ 
                ...prev, 
                wetValue: parseInt(e.target.value) 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ADC Max (0-1023/4095)
            </label>
            <input
              type="number"
              min="1"
              max="65535"
              value={adcMax}
              onChange={(e) => setAdcMax(Math.max(1, parseInt(e.target.value) || 1023))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              id="invert"
              checked={invert}
              onChange={(e) => setInvert(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="invert" className="text-sm font-medium text-gray-700">
              Invert mapping (use if wet shows lower raw value)
            </label>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => setIsCalibrating(!isCalibrating)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isCalibrating 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCalibrating ? 'Stop Calibration' : 'Start Calibration'}
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-600 text-white hover:bg-gray-700">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureSensor;
