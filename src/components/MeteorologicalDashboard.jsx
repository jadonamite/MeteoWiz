"use client";

import { useState } from 'react';

// Observed Values Component
const ObservedValues = ({ data = {}, onDataChange }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-gray-100 border border-gray-400 p-2">
      <div className="bg-blue-600 text-white text-center py-1 mb-2 font-bold text-sm">
        OBSERVED VALUES
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Time</label>
          <div className="flex gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.time || "0830"}
              onChange={(e) => handleInputChange('time', e.target.value)}
            />
            <button className="bg-gray-300 px-2 py-1 text-xs">Retrieve Metars</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Dry bulb</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.dryBulb || "26.6"}
              onChange={(e) => handleInputChange('dryBulb', e.target.value)}
            />
            <span className="text-xs">°C</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Wet bulb</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.wetBulb || "24.7"}
              onChange={(e) => handleInputChange('wetBulb', e.target.value)}
            />
            <span className="text-xs">°C</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Digital barometer</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.digitalBarometer || "1006.3"}
              onChange={(e) => handleInputChange('digitalBarometer', e.target.value)}
            />
            <span className="text-xs">hPa</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Asread barometer</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.asreadBarometer || ""}
              onChange={(e) => handleInputChange('asreadBarometer', e.target.value)}
            />
            <span className="text-xs">hPa</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Attach thermometer</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.attachThermometer || ""}
              onChange={(e) => handleInputChange('attachThermometer', e.target.value)}
            />
            <span className="text-xs">°C</span>
          </div>
        </div>

        <div className="bg-yellow-200 p-1 mb-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium">Visibility (vv) / Dir. Vis</label>
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.visibility || "800"}
              onChange={(e) => handleInputChange('visibility', e.target.value)}
            />
            <span className="text-xs">m</span>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Wind dir (ddd) / Var. Wind</label>
            <div className="flex gap-1">
              <input 
                type="text" 
                className="w-12 h-6 px-1 text-xs border border-gray-300"
                value={data.windDir || "210"}
                onChange={(e) => handleInputChange('windDir', e.target.value)}
              />
              <span className="text-xs bg-red-200 px-1">SW</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Wind speed (ff)</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300"
              value={data.windSpeed || "8"}
              onChange={(e) => handleInputChange('windSpeed', e.target.value)}
            />
            <span className="text-xs">Kts</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">QNT (fnfn)</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300 bg-yellow-100"
              value={data.qnt || ""}
              onChange={(e) => handleInputChange('qnt', e.target.value)}
            />
            <span className="text-xs">Kts</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Preci. amount(RR)</label>
          <div className="flex items-center gap-1">
            <input 
              type="text" 
              className="w-12 h-6 px-1 text-xs border border-gray-300 bg-yellow-100"
              value={data.preciAmount || ""}
              onChange={(e) => handleInputChange('preciAmount', e.target.value)}
            />
            <span className="text-xs">mm W=2</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Solarimeter</label>
          <input 
            type="text" 
            className="w-12 h-6 px-1 text-xs border border-gray-300"
            value={data.solarimeter || ""}
            onChange={(e) => handleInputChange('solarimeter', e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Cloud amount (CL)</label>
          <div className="flex gap-1">
            <select 
              className="w-8 h-6 text-xs border border-gray-300"
              value={data.cloudAmount || "4"}
              onChange={(e) => handleInputChange('cloudAmount', e.target.value)}
            >
              <option>4</option>
              <option>8</option>
            </select>
            <span className="text-xs">Okts</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Cloud genus</label>
          <div className="flex gap-1">
            <select 
              className="w-20 h-6 text-xs border border-gray-300"
              value={data.cloudGenus || "stratocumulus"}
              onChange={(e) => handleInputChange('cloudGenus', e.target.value)}
            >
              <option>stratocumulus</option>
              <option>cumulus</option>
              <option>stratus</option>
            </select>
            <button className="bg-gray-300 px-1 text-xs">Others</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-24">Weather</label>
          <div className="flex gap-1">
            <select 
              className="w-16 h-6 text-xs border border-gray-300"
              value={data.weather || "Low cloud"}
              onChange={(e) => handleInputChange('weather', e.target.value)}
            >
              <option>Low cloud</option>
              <option>Clear</option>
              <option>Cloudy</option>
            </select>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Derived Values Component
const DerivedValues = ({ observedData = {} }) => {
  // Calculate derived values based on observed data
  const calculateDerivedValues = () => {
    const temp = parseFloat(observedData.dryBulb) || 0;
    const wetBulb = parseFloat(observedData.wetBulb) || 0;
    const pressure = parseFloat(observedData.digitalBarometer) || 1006.3;
    
    return {
      relativeHumidity: Math.max(0, Math.min(100, 100 - (temp - wetBulb) * 5)), // Simplified calculation
      vaporPressure: (wetBulb * 0.1 + 25).toFixed(1),
      dewPoint: (wetBulb - 2).toFixed(1),
      feelTemperature: temp,
      heightOfBaseCl: 60,
      refEvapotranspiration: 0.25,
      estAmountEvaporation: '',
      estVisibility: 16
    };
  };

  const derived = calculateDerivedValues();

  return (
    <div className="bg-gray-100 border border-gray-400 p-2">
      <div className="bg-blue-600 text-white text-center py-1 mb-2 font-bold text-sm">
        DERIVED VALUES
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Relative humidity</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {Math.round(derived.relativeHumidity)}
            </span>
            <span className="text-xs">%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Vapor pressure</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {derived.vaporPressure}
            </span>
            <span className="text-xs">hPa</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Dew point</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {derived.dewPoint}
            </span>
            <span className="text-xs">°C</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Feel temperature</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {derived.feelTemperature}
            </span>
            <span className="text-xs">°C</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Height of base of Cl</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-blue-200 border border-gray-300 flex items-center">
              {derived.heightOfBaseCl}
            </span>
            <span className="text-xs">m/30</span>
          </div>
        </div>

        <div className="bg-yellow-200 p-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold">Agromet data</span>
          </div>
          <div className="flex justify-center gap-4 mt-1">
            <span className="bg-green-400 text-white px-2 py-1 text-xs">270</span>
            <span className="bg-yellow-400 text-black px-2 py-1 text-xs">570</span>
            <span className="text-xs">m</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Ref. evapotranspiration (ETo)</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {derived.refEvapotranspiration}
            </span>
            <span className="text-xs">mm/h</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Est. amount of evaporation</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {derived.estAmountEvaporation}
            </span>
            <span className="text-xs">mm/h</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium w-32">Est. visibility</label>
          <div className="flex items-center gap-1">
            <span className="w-12 h-6 px-1 text-xs bg-white border border-gray-300 flex items-center">
              {derived.estVisibility}
            </span>
            <span className="text-xs">km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Forecast Component
const ForecastPanel = () => {
  const [forecastData, setForecastData] = useState({
    message: 'METAR',
    time: '0830',
    wind: '21008KT',
    visibility: '8000',
    temp: '27',
    dewpoint: '24',
    qfe: '1006',
    qfeInches: '29.72',
    qnh: '1015',
    qnhInches: '30.00',
    weather: 'NIL',
    cloud: 'SCT009'
  });

  return (
    <div className="bg-gray-100 border border-gray-400 p-2">
      <div className="bg-blue-600 text-white text-center py-1 mb-2 font-bold text-sm">
        TREND LANDING FORECAST FOR DNAS
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium w-16">Message:</label>
          <select 
            className="w-20 h-6 text-xs border border-gray-300"
            value={forecastData.message}
            onChange={(e) => setForecastData({...forecastData, message: e.target.value})}
          >
            <option>METAR</option>
            <option>TAF</option>
            <option>SPECI</option>
          </select>
          <label className="text-xs font-medium ml-4">Time</label>
          <input 
            type="text" 
            className="w-16 h-6 px-1 text-xs border border-gray-300"
            value={forecastData.time}
            onChange={(e) => setForecastData({...forecastData, time: e.target.value})}
          />
          <button className="bg-gray-300 px-2 py-1 text-xs ml-2">Retrieve</button>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <label className="text-xs">Update in edit message</label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-12">Wind</label>
              <input 
                type="text" 
                className="w-20 h-6 px-1 text-xs border border-gray-300 bg-yellow-100"
                value={forecastData.wind}
                onChange={(e) => setForecastData({...forecastData, wind: e.target.value})}
              />
              <label className="text-xs font-medium ml-2">Vis</label>
              <input 
                type="text" 
                className="w-16 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.visibility}
                onChange={(e) => setForecastData({...forecastData, visibility: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-12">Temp</label>
              <input 
                type="text" 
                className="w-12 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.temp}
                onChange={(e) => setForecastData({...forecastData, temp: e.target.value})}
              />
              <span className="text-xs">°C</span>
              <label className="text-xs font-medium ml-2">Dew</label>
              <input 
                type="text" 
                className="w-12 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.dewpoint}
                onChange={(e) => setForecastData({...forecastData, dewpoint: e.target.value})}
              />
              <span className="text-xs">°C</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-12">QFE</label>
              <input 
                type="text" 
                className="w-16 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.qfe}
                onChange={(e) => setForecastData({...forecastData, qfe: e.target.value})}
              />
              <span className="text-xs">hPa</span>
              <input 
                type="text" 
                className="w-16 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.qfeInches}
                onChange={(e) => setForecastData({...forecastData, qfeInches: e.target.value})}
              />
              <span className="text-xs">inches</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-12">QNH</label>
              <input 
                type="text" 
                className="w-16 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.qnh}
                onChange={(e) => setForecastData({...forecastData, qnh: e.target.value})}
              />
              <span className="text-xs">hPa</span>
              <input 
                type="text" 
                className="w-16 h-6 px-1 text-xs border border-gray-300"
                value={forecastData.qnhInches}
                onChange={(e) => setForecastData({...forecastData, qnhInches: e.target.value})}
              />
              <span className="text-xs">inches</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-12">Weather</label>
              <input 
                type="text" 
                className="w-24 h-16 px-1 text-xs border border-gray-300"
                value={forecastData.weather}
                onChange={(e) => setForecastData({...forecastData, weather: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-12">Cloud</label>
              <input 
                type="text" 
                className="w-24 h-16 px-1 text-xs border border-gray-300"
                value={forecastData.cloud}
                onChange={(e) => setForecastData({...forecastData, cloud: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-16">Trend & RMK</label>
            <div className="bg-green-400 w-4 h-4"></div>
          </div>
          <textarea 
            className="w-full h-12 mt-1 px-1 text-xs border border-gray-300"
            placeholder="Remarks"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium w-16">Officer</label>
          <input 
            type="text" 
            className="flex-1 h-6 px-1 text-xs border border-gray-300"
            placeholder="OSAKWE M.N"
          />
          <input type="checkbox" className="w-4 h-4" />
        </div>

        <div className="flex justify-between mt-2">
          <button className="bg-gray-300 px-3 py-1 text-xs border">Read</button>
          <button className="bg-red-600 text-white px-3 py-1 text-xs">Print MET REPORT</button>
          <button className="bg-blue-600 text-white px-3 py-1 text-xs">Build METAR</button>
        </div>
      </div>
    </div>
  );
};

// Weather Widget Component
const WeatherWidget = () => {
  return (
    <div className="bg-gray-100 border border-gray-400 p-2">
      <div className="bg-blue-600 text-white text-center py-1 mb-2 font-bold text-sm">
        IMAGERY
      </div>
      <div className="text-center text-xs mb-2">GRAPHICAL DISPLAY</div>
      
      {/* Weather Widget */}
      <div className="bg-teal-600 text-white p-2 rounded">
        <div className="text-xs mb-1">Weather widget</div>
        <div className="text-center">
          <div className="text-lg font-bold mb-1">Wednesday</div>
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2">
              ☀️
            </div>
            <span className="text-xs">Low cloud</span>
          </div>
          <div className="text-2xl font-bold mb-1">27°C</div>
          
          {/* 5-day forecast */}
          <div className="flex justify-between text-xs">
            <div className="text-center">
              <div>Tu</div>
              <div>☀️</div>
              <div>28°</div>
            </div>
            <div className="text-center">
              <div>We</div>
              <div>⛅</div>
              <div>26°</div>
            </div>
            <div className="text-center">
              <div>Th</div>
              <div>🌧️</div>
              <div>25°</div>
            </div>
            <div className="text-center">
              <div>Fr</div>
              <div>⛈️</div>
              <div>24°</div>
            </div>
            <div className="text-center">
              <div>Sa</div>
              <div>🌦️</div>
              <div>26°</div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-teal-400">
          <div className="text-xs">NOWCAST [AT]</div>
          <div className="text-xs">City Asaba - 27°C</div>
          <div className="text-xs">NOSIG</div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const MeteorologicalDashboard = () => {
  const [observedData, setObservedData] = useState({});

  return (
    <div className="bg-gray-200 p-2">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-2">
        {/* Left Panel - Observed Values */}
        <div className="lg:col-span-1">
          <ObservedValues data={observedData} onDataChange={setObservedData} />
        </div>

        {/* Center Left Panel - Derived Values */}
        <div className="lg:col-span-1">
          <DerivedValues observedData={observedData} />
        </div>

        {/* Center Right Panel - Forecast */}
        <div className="lg:col-span-1">
          <ForecastPanel />
        </div>

        {/* Right Panel - Weather Widget */}
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>

      {/* Bottom Panel - Data Tables */}
      <div className="bg-gray-100 border border-gray-400 p-2">
        <div className="bg-green-600 text-white text-center py-1 mb-2 font-bold text-xs">
          METAR DNAS 03030823Z 21008KT 8000 SCT009 27/24 Q1015 →
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-1 mb-2 text-xs">
          {['TIME', 'RHVNew', 'NdHff', 'StnTTT', '25RHUd', 'PaPaPa', 'PPPP', 'C1PPDD', 'GRRRTR', 'WWWw2', 'LCLLCLMCH'].map(
            (item, index) => (
              <button 
                key={index}
                className="bg-yellow-200 px-2 py-1 border border-gray-400 hover:bg-yellow-300"
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border border-gray-400">
            <tbody>
              <tr>
                <td className="bg-yellow-100 border border-gray-400 px-1">03030Z</td>
                <td className="border border-gray-400 px-1">42358</td>
                <td className="border border-gray-400 px-1">72108</td>
                <td className="border border-gray-400 px-1">51066</td>
                <td className="border border-gray-400 px-1">20239</td>
                <td className="border border-gray-400 px-1">30063</td>
                <td className="border border-gray-400 px-1">40155</td>
                <td className="border border-gray-400 px-1"></td>
                <td className="border border-gray-400 px-1"></td>
                <td className="border border-gray-400 px-1"></td>
                <td className="border border-gray-400 px-1">84508</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Data Rows */}
        <div className="mt-1 text-xs">
          <div className="flex gap-2 mb-1">
            <span className="bg-gray-300 px-1">WETRHVE</span>
            <span className="bg-gray-300 px-1">Remarks</span>
          </div>
          <div className="flex gap-2">
            <span className="bg-yellow-100 px-1">909//</span>
            <span className="bg-black text-white px-1">████████</span>
            <span className="px-1">84509 87280</span>
            <span className="px-1">24 7 8529 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};
 {/* Bottom Status Bar */}
      <div className="mt-2 bg-blue-600 text-white text-center py-1 text-xs font-bold">
        METAR DNAS 03030302Z 21008KT 8000 SCT009 27/24 Q1015 →
      </div>
    </div>
  );
};

// Pressure Data Component (SLP, MSLP, QNH table)
const PressureDataTable = () => {
  const pressureData = [
    { label: 'SLP', value: '1006.3', unit: 'hPa', converted: '29.72', convertedUnit: 'inches' },
    { label: 'MSLP', value: '1015.5', unit: 'hPa', converted: '29.99', convertedUnit: 'inches' },
    { label: 'QNH', value: '1015.9', unit: 'hPa', converted: '30.00', convertedUnit: 'inches' }
  ];

  return (
    <div className="mt-2 bg-gray-100 border border-gray-400">
      <table className="w-full text-xs">
        <tbody>
          {pressureData.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="bg-gray-200 px-2 py-1 font-medium border-r border-gray-300">{item.label}</td>
              <td className="px-2 py-1 text-center">{item.value}</td>
              <td className="px-2 py-1 text-center text-xs">{item.unit}</td>
              <td className="px-2 py-1 text-center">{item.converted}</td>
              <td className="px-2 py-1 text-center text-xs">{item.convertedUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Enhanced Weather Widget with more details

export default MeteorologicalDashboard;
