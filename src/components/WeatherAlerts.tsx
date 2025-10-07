import React from 'react';
import { AlertTriangle, Shield, Droplets, Sun, Snowflake, Info } from 'lucide-react';

interface WeatherAlertsProps {
  selectedLocation: { lat: number; lng: number; name: string } | null;
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ selectedLocation }) => {
  // Mock alerts data - in real app, this would come from weather service
  const alerts = selectedLocation ? [
    {
      type: 'Heavy Rainfall',
      severity: 'high',
      icon: Droplets,
      message: 'Heavy rainfall expected in the next 24 hours. 50-80mm precipitation predicted.',
      measures: [
        'Ensure proper drainage in fields',
        'Cover harvested crops',
        'Avoid field operations during heavy rain',
        'Check irrigation systems for potential flooding'
      ]
    },
    {
      type: 'Heat Wave',
      severity: 'medium',
      icon: Sun,
      message: 'Temperature may rise above 40°C for the next 3 days.',
      measures: [
        'Increase irrigation frequency',
        'Provide shade for sensitive crops',
        'Apply mulching to retain soil moisture',
        'Monitor crops for heat stress symptoms'
      ]
    },
    {
      type: 'Frost Warning',
      severity: 'low',
      icon: Snowflake,
      message: 'Frost possible in early morning hours next week.',
      measures: [
        'Cover young plants overnight',
        'Use frost protection cloth',
        'Avoid overhead irrigation before dawn',
        'Harvest mature crops if possible'
      ]
    }
  ] : [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-orange-500 bg-orange-50';
      case 'low':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!selectedLocation) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Alerts</h2>
        <div className="text-center text-gray-500 py-8">
          Please select a location on the map to view weather alerts
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Weather Alerts</h2>
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-center text-green-600 py-8">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-medium">No active weather alerts</p>
          <p className="text-sm">Current weather conditions are favorable for farming activities.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {alerts.map((alert, index) => (
            <div key={index} className={`border-l-4 p-6 rounded-lg ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start">
                <alert.icon className={`w-6 h-6 mr-3 mt-1 ${getSeverityIcon(alert.severity)}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{alert.type} Alert</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{alert.message}</p>
                  
                  <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Protective Measures
                    </h4>
                    <ul className="space-y-2">
                      {alert.measures.map((measure, measureIndex) => (
                        <li key={measureIndex} className="flex items-start text-sm text-gray-700">
                          <Info className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherAlerts;