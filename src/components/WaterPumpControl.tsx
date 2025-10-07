import React, { useState, useEffect, useMemo } from 'react';
import { Power, Clock, Droplets, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

interface PumpData {
  running: boolean;
  lastRun: Date | null;
  totalRuntime: number;
  dailyRuns: number;
  powerConsumption: number;
  status: 'idle' | 'running' | 'error' | 'maintenance';
}

interface PumpSettings {
  autoMode: boolean;
  moistureThreshold: number;
  pumpDuration: number;
  maxDailyRuns: number;
  powerLimit: number;
  maintenanceInterval: number;
}

interface WaterPumpControlProps {
  soilMoisture?: number;
  onPumpToggle?: (running: boolean) => void;
}

const WaterPumpControl: React.FC<WaterPumpControlProps> = ({ 
  soilMoisture = 50, 
  onPumpToggle 
}) => {
  // Blynk token helpers
  const [localToken] = useState<string | undefined>(() => {
    try { return localStorage.getItem('blynk_token') || undefined; } catch { return undefined; }
  });
  const auth = localToken || (import.meta.env.VITE_BLYNK_TOKEN as string | undefined);
  const baseGet = useMemo(() => auth ? `https://blynk.cloud/external/api/get?token=${auth}` : undefined, [auth]);
  const baseUpdate = useMemo(() => auth ? `https://blynk.cloud/external/api/update?token=${auth}` : undefined, [auth]);
  const [pumpData, setPumpData] = useState<PumpData>({
    running: false,
    lastRun: null,
    totalRuntime: 0,
    dailyRuns: 0,
    powerConsumption: 0.5,
    status: 'idle'
  });

  const [settings, setSettings] = useState<PumpSettings>({
    autoMode: true,
    moistureThreshold: 30,
    pumpDuration: 5,
    maxDailyRuns: 3,
    powerLimit: 5.0,
    maintenanceInterval: 168 // hours
  });

  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [manualOn, setManualOn] = useState(false);
  const [pumpHistory, setPumpHistory] = useState<Array<{
    startTime: Date;
    endTime: Date;
    duration: number;
    reason: string;
  }>>([]);

  // Poll Blynk for V1 (manual) and V2 (auto) states
  useEffect(() => {
    if (!auth) return;
    const interval = setInterval(async () => {
      try {
        const [v1Res, v2Res] = await Promise.all([
          fetch(`${baseGet}&V1`),
          fetch(`${baseGet}&V2`)
        ]);
        const [v1Text, v2Text] = await Promise.all([v1Res.text(), v2Res.text()]);
        setManualOn(v1Text.trim() === '1');
        setAutoMode(v2Text.trim() === '1');
      } catch {}
    }, 2000);
    return () => clearInterval(interval);
  }, [auth, baseGet]);

  // Update pump state based on V1/V2 from hardware
  useEffect(() => {
    const hardwareRunning = autoMode ? (soilMoisture < settings.moistureThreshold) : manualOn;
    const status = isMaintenanceMode ? 'maintenance' : (hardwareRunning ? 'running' : 'idle');
    setPumpData(prev => ({
      ...prev,
      running: hardwareRunning,
      status,
      powerConsumption: hardwareRunning ? 2.5 : 0.5,
      lastRun: hardwareRunning && !prev.running ? new Date() : prev.lastRun,
      totalRuntime: hardwareRunning ? prev.totalRuntime + 2 : prev.totalRuntime
    }));
  }, [autoMode, manualOn, soilMoisture, settings.moistureThreshold, isMaintenanceMode]);

  const togglePump = async () => {
    if (!baseUpdate) return;
    const next = !manualOn;
    try {
      await fetch(`${baseUpdate}&V1=${next ? 1 : 0}`);
      if (next) setPumpHistory(prev => [{
        startTime: new Date(),
        endTime: new Date(),
        duration: 0,
        reason: 'Manual start'
      }, ...prev.slice(0, 9)]);
    } catch {}
  };

  const resetDailyRuns = () => {
    setPumpData(prev => ({ ...prev, dailyRuns: 0 }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-red-600 bg-red-50 border-red-200';
      case 'idle': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Power className="w-5 h-5" />;
      case 'idle': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <AlertTriangle className="w-5 h-5" />;
      case 'maintenance': return <Settings className="w-5 h-5" />;
      default: return <Power className="w-5 h-5" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Water Pump Control</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            pumpData.running ? 'bg-red-500 animate-pulse' : 'bg-green-500'
          }`}></div>
          <span className="text-sm text-gray-600">
            {pumpData.running ? 'Running' : 'Stopped'}
          </span>
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-800 mb-4">
          {pumpData.running ? 'PUMP ON' : 'PUMP OFF'}
        </div>
        <div className={`inline-flex items-center px-6 py-3 rounded-full border ${getStatusColor(pumpData.status)}`}>
          {getStatusIcon(pumpData.status)}
          <span className="ml-2 font-medium capitalize">{pumpData.status}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={togglePump}
          disabled={isMaintenanceMode || pumpData.status === 'error'}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            pumpData.running
              ? 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400'
              : 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400'
          }`}
        >
          {pumpData.running ? 'Stop Pump' : 'Start Pump'}
        </button>
        <button
          onClick={async () => {
            if (!baseUpdate) return;
            const next = !isMaintenanceMode;
            setIsMaintenanceMode(next);
            try {
              await fetch(`${baseUpdate}&V2=${next ? 1 : 0}`);
            } catch {}
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isMaintenanceMode
              ? 'bg-yellow-600 text-white hover:bg-yellow-700'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          {isMaintenanceMode ? 'Exit Maintenance' : 'Maintenance Mode'}
        </button>
      </div>

      {/* Pump Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600 mb-1">Total Runtime</div>
          <div className="font-bold text-gray-800">{formatDuration(pumpData.totalRuntime)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600 mb-1">Daily Runs</div>
          <div className="font-bold text-gray-800">{pumpData.dailyRuns}/{settings.maxDailyRuns}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Power className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600 mb-1">Power Consumption</div>
          <div className="font-bold text-gray-800">{pumpData.powerConsumption}A</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Settings className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600 mb-1">Last Run</div>
          <div className="font-bold text-gray-800 text-xs">
            {pumpData.lastRun ? pumpData.lastRun.toLocaleTimeString() : 'Never'}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Pump Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoMode"
              checked={settings.autoMode}
              onChange={(e) => setSettings(prev => ({ ...prev, autoMode: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="autoMode" className="text-sm font-medium text-gray-700">
              Auto Mode
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Moisture Threshold (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={settings.moistureThreshold}
              onChange={(e) => setSettings(prev => ({ ...prev, moistureThreshold: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pump Duration (min)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.pumpDuration}
              onChange={(e) => setSettings(prev => ({ ...prev, pumpDuration: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Daily Runs
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.maxDailyRuns}
              onChange={(e) => setSettings(prev => ({ ...prev, maxDailyRuns: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Power Limit (A)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              step="0.1"
              value={settings.powerLimit}
              onChange={(e) => setSettings(prev => ({ ...prev, powerLimit: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={resetDailyRuns}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reset Daily Runs
            </button>
          </div>
        </div>
      </div>

      {/* Pump History */}
      {pumpHistory.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Recent Pump Activity</h4>
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {pumpHistory.map((run, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{run.startTime.toLocaleTimeString()}</span>
                    <span className="text-gray-600 ml-2">- {run.reason}</span>
                  </div>
                  <div className="text-gray-600">
                    {formatDuration(run.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterPumpControl;
