// src/app/components/ObservedValuesSection.jsx
"use client";

import { useState } from 'react';

const ObservedValuesSection = () => {
  // State for observed values form inputs
  const [observedData, setObservedData] = useState({
    date: '9/3/2025',
    time: '0830',
    dryBulb: '26.6',
    wetBulb: '24.7',
    digitalBarometer: '1006.3',
    astreadBarometer: '',
    attachThermometer: '',
    visibility: '800',
    windDirection: '210',
    windSpeed: '8',
    qnhFmFm: '',
    precipAmount: '',
    solarimeter: '',
    cloudAmount: '4',
    cloudGenus: 'stratocumulus',
    weather: 'Low cloud'
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setObservedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border-2 border-gray-400 rounded">
      {/* Header */}
      <div className="bg-gray-300 border-b-2 border-gray-400 px-3 py-1.5">
        <h2 className="font-bold text-sm">OBSERVED VALUES</h2>
      </div>

      {/* Form Content */}
      <div className="p-3 space-y-2">
        {/* Date and Time Row */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={observedData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm w-24"
          />
          <span className="text-xs font-bold">Time</span>
          <input
            type="text"
            value={observedData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm w-20"
          />
          <button className="bg-gray-300 border border-gray-500 px-3 py-1 text-xs hover:bg-gray-400">
            Retrieve
          </button>
          <button className="bg-yellow-200 border border-gray-500 px-3 py-1 text-xs hover:bg-yellow-300">
            Meteo
          </button>
        </div>

        {/* Temperature Inputs */}
        <InputRow label="Dry bulb" value={observedData.dryBulb} onChange={(v) => handleChange('dryBulb', v)} unit="°C" />
        <InputRow label="Wet bulb" value={observedData.wetBulb} onChange={(v) => handleChange('wetBulb', v)} unit="°C" />
        <InputRow label="Digital barometer" value={observedData.digitalBarometer} onChange={(v) => handleChange('digitalBarometer', v)} unit="hPa" />
        <InputRow label="Astread barometer" value={observedData.astreadBarometer} onChange={(v) => handleChange('astreadBarometer', v)} unit="hPa" />
        <InputRow label="Attach thermometer" value={observedData.attachThermometer} onChange={(v) => handleChange('attachThermometer', v)} unit="°C" />

        {/* Visibility Section */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold w-32">Visibility (vv) / Dir. Vis</span>
          <input
            type="text"
            value={observedData.visibility}
            onChange={(e) => handleChange('visibility', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
          />
          <span className="text-xs">m</span>
        </div>

        {/* Wind Section */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold w-32">Wind dir (ddd) / Var. Wind</span>
          <input
            type="text"
            value={observedData.windDirection}
            onChange={(e) => handleChange('windDirection', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
          />
          <span className="text-xs text-red-600 font-bold">SW</span>
        </div>

        <InputRow label="Wind speed (ff)" value={observedData.windSpeed} onChange={(v) => handleChange('windSpeed', v)} unit="Kts" />
        <InputRow label="QNT (fmfm)" value={observedData.qnhFmFm} onChange={(v) => handleChange('qnhFmFm', v)} unit="Kts" />
        <InputRow label="Precipt. amount(RR)" value={observedData.precipAmount} onChange={(v) => handleChange('precipAmount', v)} unit="mm" />
        <InputRow label="Solarimeter" value={observedData.solarimeter} onChange={(v) => handleChange('solarimeter', v)} unit="W/m2" />

        {/* Cloud Section */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold w-32">Cloud amount (CL)</span>
          <select
            value={observedData.cloudAmount}
            onChange={(e) => handleChange('cloudAmount', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm w-16"
          >
            {[...Array(9)].map((_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <span className="text-xs">Okts</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold w-32">Cloud genus</span>
          <select
            value={observedData.cloudGenus}
            onChange={(e) => handleChange('cloudGenus', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm flex-1"
          >
            <option value="stratocumulus">stratocumulus</option>
            <option value="cumulus">cumulus</option>
            <option value="stratus">stratus</option>
            <option value="nimbostratus">nimbostratus</option>
          </select>
          <span className="text-xs">Others</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold w-32">Weather</span>
          <select
            value={observedData.weather}
            onChange={(e) => handleChange('weather', e.target.value)}
            className="border border-gray-400 px-2 py-1 text-sm flex-1 bg-yellow-100"
          >
            <option value="Low cloud">Low cloud</option>
            <option value="Clear">Clear</option>
            <option value="Rain">Rain</option>
            <option value="Thunderstorm">Thunderstorm</option>
          </select>
        </div>

        {/* Bottom Labels */}
        <div className="flex gap-2 text-xs">
          <span className="font-bold">RVR1</span>
          <span>RVR2</span>
          <span className="bg-green-300 px-2">Grade 1</span>
          <span>Decode</span>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Row Component
const InputRow = ({ label, value, onChange, unit }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs font-bold w-32">{label}</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-400 px-2 py-1 text-sm w-24"
    />
    <span className="text-xs">{unit}</span>
  </div>
);

export default ObservedValuesSection;