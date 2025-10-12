"use client";

import { useMetar } from "../context/MetarContext";

const TrendForecastSection = () => {
   const { trendData, setTrendData, observedData, derivedData } = useMetar();

   // Handle input changes - updates context directly
   const handleChange = (field, value) => {
      setTrendData((prev) => ({ ...prev, [field]: value }));
   };

   // Auto-populate from observed/derived data
   const handleAutoPopulate = () => {
      const windCode =
         observedData.windDirection && observedData.windSpeed
            ? `${observedData.windDirection.padStart(
                 3,
                 "0"
              )}${observedData.windSpeed.padStart(2, "0")}KT`
            : null;

      const visibilityCode = observedData.visibility || null;

      setTrendData((prev) => ({
         ...prev,
         windCode,
         visibilityCode,
         temperature: observedData.dryBulb,
         dewPointTemp: derivedData.dewPoint,
         qfe: derivedData.qfe || prev.qfe,
         qnh: derivedData.qnh,
      }));
   };

   return (
      <div className="bg-gray-300 border-2 border-gray-400 rounded h-full flex flex-col overflow-hidden">
         {/* Header */}
         <div className="bg-gray-300 border-b-2 border-gray-400 px-3 py-1.5 flex justify-between items-center flex-shrink-0">
            <h2 className="font-bold text-sm">
               TREND LANDING FORECAST FOR DNAS
            </h2>
         </div>

         {/* Content - Scrollable */}
         <div className="p-3 flex flex-col gap-2.5 overflow-y-auto flex-1">
            {/* Message Type and Time */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold w-24">Message:</span>
               <select
                  value={trendData.messageType || "METAR"}
                  onChange={(e) => handleChange("messageType", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-xs flex-1">
                  <option value="METAR">METAR</option>
                  <option value="SPECI">SPECI</option>
                  <option value="TAF">TAF</option>
               </select>
               <span className="font-bold">Time</span>
               <input
                  type="text"
                  value={trendData.time || ""}
                  onChange={(e) => handleChange("time", e.target.value)}
                  placeholder="0830"
                  className="border border-gray-400 px-2 py-1 text-xs w-20"
               />
            </div>

            {/* Uncheck to add checkbox row */}
            <div className="flex items-center gap-2 text-xs">
               <input
                  type="checkbox"
                  checked={trendData.uncheckToAdd || false}
                  onChange={(e) =>
                     handleChange("uncheckToAdd", e.target.checked)
                  }
                  className="w-4 h-4"
               />
               <span className="font-bold">Uncheck to add</span>
               <button
                  onClick={handleAutoPopulate}
                  className="ml-auto bg-gray-400 border border-gray-500 px-3 py-1 text-xs hover:bg-gray-500">
                  Retrieve
               </button>
            </div>

            {/* Wind Section */}
            <div className="space-y-2">
               <div className="font-bold text-xs bg-gray-400 px-2 py-1 border-y border-gray-500">
                  Wind
               </div>
               <InputRow
                  label="Wind"
                  value={trendData.windCode || ""}
                  onChange={(v) => handleChange("windCode", v)}
                  placeholder="21008KT"
                  unit=""
               />
               <InputRow
                  label="Temp"
                  value={trendData.temperature || ""}
                  onChange={(v) => handleChange("temperature", v)}
                  unit="°C"
               />
               <InputRow
                  label="Vis"
                  value={trendData.visibilityCode || ""}
                  onChange={(v) => handleChange("visibilityCode", v)}
                  placeholder="8000"
                  unit=""
               />
            </div>

            {/* Temperature Section */}
            <div className="space-y-2">
               <div className="font-bold text-xs bg-gray-400 px-2 py-1 border-y border-gray-500">
                  Temp
               </div>
               <InputRow
                  label="Temp"
                  value={trendData.temperature || ""}
                  onChange={(v) => handleChange("temperature", v)}
                  unit="°C"
               />
               <InputRow
                  label="Dew"
                  value={trendData.dewPointTemp || ""}
                  onChange={(v) => handleChange("dewPointTemp", v)}
                  unit="°C"
               />
            </div>

            {/* Pressure Section */}
            <div className="space-y-2">
               <InputRow
                  label="QFE"
                  value={trendData.qfe || ""}
                  onChange={(v) => handleChange("qfe", v)}
                  unit="hPa"
               />
               <InputRow
                  label="QNH"
                  value={trendData.qnh || ""}
                  onChange={(v) => handleChange("qnh", v)}
                  unit="inches"
               />
            </div>

            {/* Weather */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold w-24">Weather</span>
               <select
                  value={trendData.weatherCode || "NIL"}
                  onChange={(e) => handleChange("weatherCode", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-xs flex-1 bg-yellow-100">
                  <option value="NIL">NIL</option>
                  <option value="RA">RA - Rain</option>
                  <option value="DZ">DZ - Drizzle</option>
                  <option value="TS">TS - Thunderstorm</option>
                  <option value="FG">FG - Fog</option>
                  <option value="BR">BR - Mist</option>
                  <option value="HZ">HZ - Haze</option>
                  <option value="SQ">SQ - Squall</option>
               </select>
            </div>

            {/* Cloud */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold w-24">Cloud</span>
               <input
                  type="text"
                  value={trendData.cloudCode || ""}
                  onChange={(e) => handleChange("cloudCode", e.target.value)}
                  placeholder="SCT009"
                  className="border border-gray-400 px-2 py-1 text-xs flex-1 bg-yellow-100"
               />
            </div>

            {/* Trend */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold w-24">Trend</span>
               <select
                  value={trendData.trend || ""}
                  onChange={(e) => handleChange("trend", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-xs flex-1">
                  <option value="">Select...</option>
                  <option value="NOSIG">NOSIG - No Significant Change</option>
                  <option value="BECMG">BECMG - Becoming</option>
                  <option value="TEMPO">TEMPO - Temporary</option>
                  <option value="PROB30">PROB30 - Probability 30%</option>
                  <option value="PROB40">PROB40 - Probability 40%</option>
               </select>
               <input
                  type="checkbox"
                  checked={trendData.rmk || false}
                  onChange={(e) => handleChange("rmk", e.target.checked)}
                  className="w-4 h-4"
               />
               <span className="font-bold">& RMK</span>
            </div>

            {/* Remarks */}
            <div className="flex flex-col gap-1.5 text-xs">
               <span className="font-bold">Remarks</span>
               <textarea
                  value={trendData.remarks || ""}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  placeholder="Enter remarks..."
                  className="border border-gray-400 px-2 py-1 text-xs h-20 resize-none bg-yellow-50"
               />
            </div>

            {/* Officer */}
            <div className="flex items-center gap-2 text-xs mt-auto">
               <span className="font-bold w-24">Officer</span>
               <input
                  type="text"
                  value={trendData.officer || ""}
                  onChange={(e) => handleChange("officer", e.target.value)}
                  placeholder="OSAKWE MLN"
                  className="border border-gray-400 px-2 py-1 text-xs flex-1"
               />
               <input type="checkbox" className="w-4 h-4" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
               <button className="bg-gray-400 border border-gray-500 px-4 py-1 text-xs hover:bg-gray-500 flex-1">
                  Read
               </button>
               <button className="bg-red-500 text-white font-bold px-4 py-1 text-xs hover:bg-red-600 flex-1">
                  Print MET REPORT
               </button>
               <button className="bg-blue-500 text-white font-bold px-4 py-1 text-xs hover:bg-blue-600 flex-1">
                  Build METAR
               </button>
            </div>
         </div>
      </div>
   );
};

// Reusable Input Row Component
const InputRow = ({ label, value, onChange, unit, placeholder = "" }) => (
   <div className="flex items-center gap-2 text-xs">
      <span className="font-bold w-24">{label}</span>
      <input
         type="text"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         placeholder={placeholder}
         className="border border-gray-400 px-2 py-1 text-xs flex-1"
      />
      {unit && <span className="italic w-14 text-right">{unit}</span>}
   </div>
);

export default TrendForecastSection;
