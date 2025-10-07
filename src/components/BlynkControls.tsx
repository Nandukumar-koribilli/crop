import React, { useEffect, useMemo, useState } from 'react';

interface BlynkControlsProps {
  token?: string;
}

const BlynkControls: React.FC<BlynkControlsProps> = ({ token }) => {
  const [moisture, setMoisture] = useState<number | null>(null);
  const [autoMode, setAutoMode] = useState<boolean>(false);
  const [manualOn, setManualOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState<boolean | null>(null);
  const [localToken, setLocalToken] = useState<string | undefined>(() => {
    try {
      return localStorage.getItem('blynk_token') || undefined;
    } catch {
      return undefined;
    }
  });
  const [tokenInput, setTokenInput] = useState<string>(localToken || '');

  const auth = token || localToken || (import.meta.env.VITE_BLYNK_TOKEN as string | undefined);
  const baseGet = useMemo(() => auth ? `https://blynk.cloud/external/api/get?token=${auth}` : undefined, [auth]);
  const baseUpdate = useMemo(() => auth ? `https://blynk.cloud/external/api/update?token=${auth}` : undefined, [auth]);
  const isConnectedUrl = useMemo(() => auth ? `https://blynk.cloud/external/api/isHardwareConnected?token=${auth}` : undefined, [auth]);

  const fetchStates = async () => {
    if (!baseGet) { setError('Missing Blynk token'); return; }
    try {
      const [mRes, v1Res, v2Res] = await Promise.all([
        fetch(`${baseGet}&V0`),
        fetch(`${baseGet}&V1`),
        fetch(`${baseGet}&V2`)
      ]);
      const [mText, v1Text, v2Text] = await Promise.all([mRes.text(), v1Res.text(), v2Res.text()]);
      const mVal = Number(mText);
      if (!Number.isNaN(mVal)) setMoisture(mVal);
      setManualOn(v1Text.trim() === '1');
      setAutoMode(v2Text.trim() === '1');
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch states');
    }
  };

  const fetchOnline = async () => {
    if (!isConnectedUrl) return;
    try {
      const res = await fetch(isConnectedUrl);
      const text = (await res.text()).trim().toLowerCase();
      setOnline(text === 'true');
    } catch {
      setOnline(null);
    }
  };

  const setV = async (pin: string, value: number) => {
    if (!baseUpdate) return;
    setLoading(true);
    try {
      await fetch(`${baseUpdate}&${pin}=${value}`);
      setError(null);
      // Refresh states after update to reflect actual device value
      await fetchStates();
    } catch (e: any) {
      setError(e?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) return;
    fetchStates();
    fetchOnline();
    const id = setInterval(() => {
      fetchStates();
      fetchOnline();
    }, 3000);
    return () => clearInterval(id);
  }, [auth]);

  const handleSaveToken = () => {
    try {
      localStorage.setItem('blynk_token', tokenInput.trim());
      setLocalToken(tokenInput.trim());
      setError(null);
    } catch (e: any) {
      setError('Failed to save token');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Blynk Controls</h2>
        <div className="flex items-center gap-3">
          {online !== null && auth && (
            <span className={`text-xs px-2 py-1 rounded border ${online ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'}`}>
              {online ? 'Device Online' : 'Device Offline'}
            </span>
          )}
          {!auth ? (
            <div className="flex items-center gap-2">
              <input
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter Blynk token"
                className="px-2 py-1 border border-gray-300 rounded text-xs"
              />
              <button
                onClick={handleSaveToken}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
              >
                Save Token
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Soil Moisture (V0)</div>
          <div className="text-3xl font-bold text-gray-800">{moisture ?? '—'}</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-gray-600">Auto Mode (V2)</div>
              <div className="text-xs text-gray-500">Device decides pump based on threshold</div>
            </div>
            <button
              onClick={async () => { const next = !autoMode; setAutoMode(next); await setV('V2', next ? 1 : 0); }}
              className={`px-3 py-2 rounded-lg text-sm ${autoMode ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              disabled={!auth || loading}
            >
              {autoMode ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-gray-600">Manual Pump (V1)</div>
              <div className="text-xs text-gray-500">Effective when Auto is OFF</div>
            </div>
            <button
              onClick={async () => { const next = !manualOn; setManualOn(next); await setV('V1', next ? 1 : 0); }}
              className={`px-3 py-2 rounded-lg text-sm ${manualOn ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              disabled={!auth || loading}
            >
              {manualOn ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlynkControls;


