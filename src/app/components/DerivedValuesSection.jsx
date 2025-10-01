// app/components/DerivedValuesSection.jsx
"use client";

import { useState } from 'react';

const DerivedValuesSection = () => {
  // State for derived values (calculated from observed data)
  const [derivedData, setDerivedData] = useState({
    relativeHumidity: '85',
    vaporPressure: '29.6',
    dewPoint: '23.9',
    feelTemperature: '29',
    heightBaseCloud: '9',
    cloudBaseHeight: '270',
    cloudBaseHeightYellow: '570',
    refEvapotranspiration: '0.25',
    estEvaporation: '',
    estVisibility: '16',
    slp: '1006.3',
    slpTemp: '29.72',
    mslp: '1015.5',
    mslpTemp: '29.99',
    qnh: '1015.9',
    qnhTemp: '30.00'
  });

  return (
    <div className="bg-white border-2 border-gray-400 rounded">
      {/* Header */}
      <div className="bg-gray-300 border-b-2 border-gray-400 px-3 py-1.5 flex justify-between items-center">
        <h2 className="font-bold text-sm">DERIVED VALUES</h2>
        <button className="bg-yellow-200 border border-gray-500 px-2 py-0.5 text-xs hover:bg-yellow-300">
          Agromst data
        </button>
      </div>

      {/* Content - Two Column Layout */}
      <div className="p-3 space-y-3">
        {/* Top Section - Humidity and Temperature */}
        <div className="space-y-2">
          <DerivedRow 
            label="Relative humidity" 
            value={derivedData.relativeHumidity} 
            unit="%" 
          />
          <DerivedRow 
            label="vapor pressure" 
            value={derivedData.vaporPressure} 
            unit="hPa" 
          />
          <DerivedRow 
            label="Dew point" 
            value={derivedData.dewPoint} 
            unit="°C" 
          />
          <DerivedRow 
            label="Feel temperature" 
            value={derivedData.feelTemperature} 
            unit="°C" 
          />
          
          {/* Height of base of cloud - Special Layout */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold w-48">Height of base of Cl</span>
            <input
              type="text"
              value={derivedData.heightBaseCloud}
              readOnly
              className="border border-gray-400 px-2 py-1 text-sm w-16 bg-blue-100"
            />
            <span className="text-xs font-bold">60kt</span>
            <span className="text-xs">m/30</span>
          </div>

          {/* Cloud Base Heights - Colored Backgrounds */}
          <div className="flex items-center gap-2 bg-green-200 px-2 py-1.5 rounded">
            <span className="text-xs font-bold flex-1">Cloud base height</span>
            <input
              type="text"
              value={derivedData.cloudBaseHeight}
              readOnly
              className="border border-gray-400 px-2 py-1 text-sm w-20 bg-green-300"
            />
            <input
              type="text"
              value={derivedData.cloudBaseHeightYellow}
              readOnly
              className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-300"
            />
            <span className="text-xs">m</span>
          </div>
        </div>

        {/* Middle Section - Agrometeorological Data */}
        <div className="bg-yellow-100 p-2 rounded">
          <h3 className="text-xs font-bold mb-2 text-center">Agrometeorological data</h3>
          <div className="space-y-2">
            <DerivedRow 
              label="Ref. evapotranspiration (ETo)" 
              value={derivedData.refEvapotranspiration} 
              unit="mm/h" 
              bgColor="bg-yellow-100"
            />
            <DerivedRow 
              label="Est. amount of evaporation" 
              value={derivedData.estEvaporation} 
              unit="mm/h" 
              bgColor="bg-yellow-100"
            />
            <DerivedRow 
              label="Est. visibility" 
              value={derivedData.estVisibility} 
              unit="km" 
              bgColor="bg-yellow-100"
            />
          </div>
        </div>

        {/* Bottom Section - Pressure Values in Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {/* SLP Column */}
          <div className="space-y-2">
            <PressureRow 
              label="SLP" 
              value={derivedData.slp} 
              unit="hPa" 
              tempValue={derivedData.slpTemp} 
              tempUnit="inches" 
            />
          </div>

          {/* MSLP Column */}
          <div className="space-y-2">
            <PressureRow 
              label="MSLP" 
              value={derivedData.mslp} 
              unit="hPa" 
              tempValue={derivedData.mslpTemp} 
              tempUnit="inches" 
            />
          </div>

          {/* QNH Column - Full Width */}
          <div className="col-span-2">
            <PressureRow 
              label="QNH" 
              value={derivedData.qnh} 
              unit="hPa" 
              tempValue={derivedData.qnhTemp} 
              tempUnit="inches" 
            />
          </div>
        </div>

        {/* LLWAS Button */}
        <div className="flex justify-center">
          <button className="bg-green-500 text-white font-bold px-4 py-1 text-xs hover:bg-green-600 rounded">
            LLWAS
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Derived Row Component
const DerivedRow = ({ label, value, unit, bgColor = '' }) => (
  <div className={`flex items-center gap-2 ${bgColor}`}>
    <span className="text-xs font-bold w-48">{label}</span>
    <input
      type="text"
      value={value}
      readOnly
      className="border border-gray-400 px-2 py-1 text-sm w-20 bg-gray-50"
    />
    <span className="text-xs">{unit}</span>
  </div>
);

// Reusable Pressure Row Component (for SLP, MSLP, QNH)
const PressureRow = ({ label, value, unit, tempValue, tempUnit }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs font-bold w-16">{label}</span>
    <input
      type="text"
      value={value}
      readOnly
      className="border border-gray-400 px-2 py-1 text-sm w-16 bg-gray-50"
    />
    <span className="text-xs">{unit}</span>
    <input
      type="text"
      value={tempValue}
      readOnly
      className="border border-gray-400 px-2 py-1 text-sm w-16 bg-gray-50"
    />
    <span className="text-xs">{tempUnit}</span>
  </div>
);

export default DerivedValuesSection;