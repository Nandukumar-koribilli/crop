import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wifi, 
  Droplets, 
  Power, 
  Monitor, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Zap
} from 'lucide-react';

interface HardwareStatus {
  esp8266: {
    connected: boolean;
    ip: string;
    signal: number;
    uptime: string;
  };
  soilMoisture: {
    value: number;
    status: 'dry' | 'optimal' | 'wet';
    lastReading: Date;
  };
  pump: {
    running: boolean;
    lastRun: Date | null;
    totalRuntime: number;
  };
  lcd: {
    line1: string;
    line2: string;
    backlight: boolean;
  };
  power: {
    voltage: number;
    current: number;
    battery: number;
  };
}

const HardwareDashboard: React.FC = () => {
  const [hardwareStatus, setHardwareStatus] = useState<HardwareStatus>({
    esp8266: {
      connected: false,
      ip: '-',
      signal: 0,
      uptime: '0h 0m'
    },
    soilMoisture: {
      value: 0,
      status: 'dry',
      lastReading: new Date()
    },
    pump: {
      running: false,
      lastRun: null,
      totalRuntime: 0
    },
    lcd: {
      line1: 'Soil: --',
      line2: 'Pump: --',
      backlight: true
    },
    power: {
      voltage: 3.3,
      current: 0.5,
      battery: 100
    }
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [pumpSettings, setPumpSettings] = useState({
    autoMode: true,
    moistureThreshold: 30,
    pumpDuration: 5,
    maxDailyRuns: 3
  });

  // Blynk token helpers
  const [localToken] = useState<string | undefined>(() => {
    try { return localStorage.getItem('blynk_token') || undefined; } catch { return undefined; }
  });
  const auth = localToken || (import.meta.env.VITE_BLYNK_TOKEN as string | undefined);
  const baseGet = useMemo(() => auth ? `https://blynk.cloud/external/api/get?token=${auth}` : undefined, [auth]);
  const baseUpdate = useMemo(() => auth ? `https://blynk.cloud/external/api/update?token=${auth}` : undefined, [auth]);
  const isConnectedUrl = useMemo(() => auth ? `https://blynk.cloud/external/api/isHardwareConnected?token=${auth}` : undefined, [auth]);

  // Simulate hardware data updates
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setHardwareStatus(prev => {
        const newStatus = { ...prev };
        
        // Simulate soil moisture changes
        const moistureChange = (Math.random() - 0.5) * 10;
        newStatus.soilMoisture.value = Math.max(0, Math.min(100, prev.soilMoisture.value + moistureChange));
        
        // Update moisture status
        if (newStatus.soilMoisture.value < 30) {
          newStatus.soilMoisture.status = 'dry';
        } else if (newStatus.soilMoisture.value > 70) {
          newStatus.soilMoisture.status = 'wet';
        } else {
          newStatus.soilMoisture.status = 'optimal';
        }
        
        newStatus.soilMoisture.lastReading = new Date();
        
        // Update LCD display
        newStatus.lcd.line1 = `Soil: ${Math.round(newStatus.soilMoisture.value)}%`;
        newStatus.lcd.line2 = `Pump: ${prev.pump.running ? 'ON' : 'OFF'}`;
        
        // Auto pump control
        if (pumpSettings.autoMode && !prev.pump.running && newStatus.soilMoisture.value < pumpSettings.moistureThreshold) {
          newStatus.pump.running = true;
          newStatus.pump.lastRun = new Date();
        }
        
        // Simulate pump runtime
        if (prev.pump.running) {
          newStatus.pump.totalRuntime += 1;
          // Auto stop after duration
          if (newStatus.pump.totalRuntime >= pumpSettings.pumpDuration * 60) {
            newStatus.pump.running = false;
          }
        }
        
        // Update power consumption
        newStatus.power.current = prev.pump.running ? 2.5 : 0.5;
        newStatus.power.battery = Math.max(0, prev.power.battery - 0.01);
        
        return newStatus;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, pumpSettings]);

  // Poll Blynk for live data
  useEffect(() => {
    if (!auth) return;

    const fetchLive = async () => {
      try {
        // Read V0 (moisture), V1 (manual), V2 (auto)
        const [mRes, v1Res, v2Res] = await Promise.all([
          fetch(`${baseGet}&V0`),
          fetch(`${baseGet}&V1`),
          fetch(`${baseGet}&V2`)
        ]);
        const [mText, v1Text, v2Text] = await Promise.all([mRes.text(), v1Res.text(), v2Res.text()]);
        const rawMoisture = Number(mText);
        const moistureValue = Number.isFinite(rawMoisture) ? rawMoisture : 0;
        const manualOn = v1Text.trim() === '1';
        const autoOn = v2Text.trim() === '1';

        // Derive statuses
        const moisturePercent = Math.max(0, Math.min(100, Math.round((moistureValue / 1023) * 100)));
        let status: 'dry' | 'optimal' | 'wet' = 'optimal';
        if (moistureValue < 250) status = 'dry';
        else if (moistureValue > 700) status = 'wet';

        const pumpRunning = autoOn ? (moistureValue < 250) : manualOn;

        setHardwareStatus(prev => ({
          ...prev,
          esp8266: {
            ...prev.esp8266,
            // IP/signal/uptime not available via current sketch; keep placeholders
          },
          soilMoisture: {
            value: moisturePercent,
            status,
            lastReading: new Date()
          },
          pump: {
            ...prev.pump,
            running: pumpRunning,
            lastRun: pumpRunning && !prev.pump.running ? new Date() : prev.pump.lastRun,
            totalRuntime: pumpRunning ? prev.pump.totalRuntime + 2 : prev.pump.totalRuntime
          },
          lcd: {
            ...prev.lcd,
            line1: `Moisture: ${moistureValue}`,
            line2: `Motor: ${pumpRunning ? 'ON' : 'OFF'}`
          },
          power: {
            ...prev.power,
            voltage: 3.3,
            current: pumpRunning ? 2.5 : 0.5
          }
        }));
      } catch (e) {
        // ignore transient errors
      }
    };

    const fetchOnline = async () => {
      if (!isConnectedUrl) return;
      try {
        const res = await fetch(isConnectedUrl);
        const online = (await res.text()).trim().toLowerCase() === 'true';
        setHardwareStatus(prev => ({
          ...prev,
          esp8266: { ...prev.esp8266, connected: online }
        }));
      } catch {}
    };

    fetchLive();
    fetchOnline();
    const id = setInterval(() => { fetchLive(); fetchOnline(); }, 2000);
    return () => clearInterval(id);
  }, [auth, baseGet, isConnectedUrl]);

  const togglePump = async () => {
    // Manual control uses V1; effective when Auto (V2) is OFF according to firmware
    if (!baseUpdate) return;
    const next = !hardwareStatus.pump.running;
    try {
      await fetch(`${baseUpdate}&V1=${next ? 1 : 0}`);
    } catch {}
  };

  const updateLCD = (line1: string, line2: string) => {
    setHardwareStatus(prev => ({
      ...prev,
      lcd: {
        ...prev.lcd,
        line1,
        line2
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dry': return 'text-red-600 bg-red-50';
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'wet': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'dry': return <AlertTriangle className="w-4 h-4" />;
      case 'optimal': return <CheckCircle className="w-4 h-4" />;
      case 'wet': return <Droplets className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">IoT Hardware Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isSimulating 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isSimulating ? 'Simulating' : 'Start Simulation'}
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </button>
        </div>
      </div>

      {/* Hardware Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* ESP8266 Status */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Wifi className="w-8 h-8 text-blue-600" />
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              hardwareStatus.esp8266.connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {hardwareStatus.esp8266.connected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">ESP8266 NodeMCU</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div>IP: {hardwareStatus.esp8266.ip}</div>
            <div>Signal: {hardwareStatus.esp8266.signal}%</div>
            <div>Uptime: {hardwareStatus.esp8266.uptime}</div>
          </div>
        </div>

        {/* Soil Moisture Sensor */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Droplets className="w-8 h-8 text-green-600" />
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(hardwareStatus.soilMoisture.status)}`}>
              {getStatusIcon(hardwareStatus.soilMoisture.status)}
              <span className="ml-1 capitalize">{hardwareStatus.soilMoisture.status}</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Soil Moisture</h3>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(hardwareStatus.soilMoisture.value)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  hardwareStatus.soilMoisture.status === 'dry' ? 'bg-red-500' :
                  hardwareStatus.soilMoisture.status === 'optimal' ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${hardwareStatus.soilMoisture.value}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              Last reading: {hardwareStatus.soilMoisture.lastReading.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Water Pump Control */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Power className="w-8 h-8 text-orange-600" />
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              hardwareStatus.pump.running ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {hardwareStatus.pump.running ? 'Running' : 'Stopped'}
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-4">Water Pump</h3>
          <div className="space-y-3">
            <button
              onClick={togglePump}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                hardwareStatus.pump.running
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {hardwareStatus.pump.running ? 'Stop Pump' : 'Start Pump'}
            </button>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Total runtime: {Math.floor(hardwareStatus.pump.totalRuntime / 60)}m {hardwareStatus.pump.totalRuntime % 60}s</div>
              {hardwareStatus.pump.lastRun && (
                <div>Last run: {hardwareStatus.pump.lastRun.toLocaleTimeString()}</div>
              )}
            </div>
          </div>
        </div>

        {/* Power Supply */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-yellow-600" />
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Normal
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Power Supply</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Voltage:</span>
              <span>{hardwareStatus.power.voltage}V</span>
            </div>
            <div className="flex justify-between">
              <span>Current:</span>
              <span>{hardwareStatus.power.current}A</span>
            </div>
            <div className="flex justify-between">
              <span>Battery:</span>
              <span>{Math.round(hardwareStatus.power.battery)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div 
                className="h-1 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${hardwareStatus.power.battery}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* LCD Display Simulation */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">16x2 LCD Display (I2C)</h3>
          <div className="flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-400">Online</span>
          </div>
        </div>
        <div className="bg-black rounded border-2 border-gray-600 p-4 font-mono text-green-400">
          <div className="text-lg mb-1">{hardwareStatus.lcd.line1}</div>
          <div className="text-lg">{hardwareStatus.lcd.line2}</div>
        </div>
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Line 1 message"
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                updateLCD(e.currentTarget.value, hardwareStatus.lcd.line2);
                e.currentTarget.value = '';
              }
            }}
          />
          <input
            type="text"
            placeholder="Line 2 message"
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                updateLCD(hardwareStatus.lcd.line1, e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
      </div>

      {/* Pump Settings */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pump Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoMode"
              checked={pumpSettings.autoMode}
              onChange={(e) => setPumpSettings(prev => ({ ...prev, autoMode: e.target.checked }))}
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
              value={pumpSettings.moistureThreshold}
              onChange={(e) => setPumpSettings(prev => ({ ...prev, moistureThreshold: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
              value={pumpSettings.pumpDuration}
              onChange={(e) => setPumpSettings(prev => ({ ...prev, pumpDuration: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
              value={pumpSettings.maxDailyRuns}
              onChange={(e) => setPumpSettings(prev => ({ ...prev, maxDailyRuns: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareDashboard;
