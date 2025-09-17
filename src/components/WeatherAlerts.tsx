import React from 'react';
import { AlertTriangle, Cloud, CloudRain, Sun, Snowflake, Wind } from 'lucide-react';
import { WeatherAlert } from '../types';

const mockAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'heavy_rain',
    severity: 'high',
    message: 'Heavy rainfall expected for next 3 days. Risk of waterlogging in low-lying areas.',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    affectedCrops: ['rice', 'wheat', 'tomato']
  },
  {
    id: '2',
    type: 'heat_wave',
    severity: 'medium',
    message: 'Temperature may rise above 40°C. Increase irrigation frequency.',
    startDate: '2024-01-20',
    endDate: '2024-01-25',
    affectedCrops: ['wheat', 'chickpea']
  },
  {
    id: '3',
    type: 'frost',
    severity: 'critical',
    message: 'Frost warning! Protect sensitive crops with covers.',
    startDate: '2024-01-12',
    endDate: '2024-01-14',
    affectedCrops: ['tomato', 'banana', 'mango']
  }
];

export const WeatherAlerts: React.FC = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'heavy_rain': return <CloudRain className="h-5 w-5" />;
      case 'drought': return <Sun className="h-5 w-5" />;
      case 'hail': return <Cloud className="h-5 w-5" />;
      case 'frost': return <Snowflake className="h-5 w-5" />;
      case 'heat_wave': return <Sun className="h-5 w-5" />;
      default: return <Wind className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-300 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'heavy_rain': return 'Heavy Rainfall Alert';
      case 'drought': return 'Drought Warning';
      case 'hail': return 'Hail Storm Alert';
      case 'frost': return 'Frost Warning';
      case 'heat_wave': return 'Heat Wave Alert';
      default: return 'Weather Alert';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
        Weather Alerts
      </h2>

      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                {getAlertIcon(alert.type)}
                <h3 className="font-semibold ml-2">{getAlertTitle(alert.type)}</h3>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50 capitalize">
                {alert.severity}
              </span>
            </div>
            
            <p className="text-sm mb-3">{alert.message}</p>
            
            <div className="flex flex-wrap gap-4 text-xs">
              <div>
                <span className="font-medium">Duration:</span> {alert.startDate} to {alert.endDate}
              </div>
              <div>
                <span className="font-medium">Affected Crops:</span> {alert.affectedCrops.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Protective Measures</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Monitor weather forecasts regularly</li>
          <li>• Ensure proper drainage systems are in place</li>
          <li>• Keep protective covers ready for sensitive crops</li>
          <li>• Adjust irrigation schedules based on rainfall predictions</li>
          <li>• Have emergency contact numbers for agricultural support</li>
        </ul>
      </div>
    </div>
  );
};