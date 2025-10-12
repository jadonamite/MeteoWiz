// src/app/components/TrendForecastSection.jsx
"use client";

import { useEffect } from "react";
import { useMetar } from "../context/MetarContext";

const TrendForecastSection = () => {
   const { trendData, setTrendData, observedData, derivedData } = useMetar();

   // Auto-calculate trend values whenever observed/derived data changes
   useEffect(() => {
      calculateTrendValues();
   }, [observedData, derivedData]);

   /**
    * Calculate trend forecast values from observed and derived data
    * Following WMO and ICAO standards for METAR encoding
    */
   const calculateTrendValues = () => {
      // 1. Wind Code - format: dddffKT (e.g., 21008KT)
      const windDirection =
         observedData.windDirection?.padStart(3, "0") || "000";
      const windSpeed = observedData.windSpeed?.padStart(2, "0") || "00";
      const windCode = `${windDirection}${windSpeed}KT`;

      // 2. Visibility - from observed visual section
      const visibilityCode = observedData.visibility || "";

      // 3. Temperature - approximation following WMO standards (rounded to nearest whole degree)
      const temperature = observedData.dryBulb
         ? Math.round(parseFloat(observedData.dryBulb)).toString()
         : "";

      // 4. Dew Point - approximation following ICAO standards (rounded to nearest whole degree)
      const dewPointTemp = derivedData.dewPoint
         ? Math.round(parseFloat(derivedData.dewPoint)).toString()
         : "";

      // 5. QFE - Digital barometer value with inches conversion
      const qfe = observedData.digitalBarometer || "";
      const qfeInches = qfe ? (parseFloat(qfe) * 0.02953).toFixed(2) : "";

      // 6. QNH - Derived QNH value with inches
      const qnh = derivedData.qnh || "";
      const qnhInches = derivedData.qnhInches || "";

      // 7. Weather - from observed weather conditions
      const weatherCode = observedData.weather || "NIL";

      // 8. Cloud Code - format: NNNhhh (e.g., SCT009)
      // Cloud amount in oktas + height from derived green box
      const cloudAmount = observedData.cloudAmount || "0";
      const cloudHeight = derivedData.cloudBaseHeight || "0";

      // Convert oktas to METAR cloud coverage
      const cloudCoverage =
         cloudAmount === "0"
            ? "SKC"
            : cloudAmount <= "2"
            ? "FEW"
            : cloudAmount <= "4"
            ? "SCT"
            : cloudAmount <= "7"
            ? "BKN"
            : "OVC";

      // Height in hundreds of feet (divide by 30.48 to get feet, then by 100)
      const heightInHundredFeet = Math.round(parseFloat(cloudHeight) / 30.48)
         .toString()
         .padStart(3, "0");
      const cloudCode =
         cloudAmount === "0" ? "SKC" : `${cloudCoverage}${heightInHundredFeet}`;

      // Update trend data in context
      setTrendData((prev) => ({
         ...prev,
         messageType: prev.messageType || "METAR", // Keep METAR unless explicitly changed
         time: observedData.time,
         windCode,
         visibilityCode,
         temperature,
         dewPointTemp,
         qfe,
         qfeInches,
         qnh,
         qnhInches,
         weatherCode,
         cloudCode,
      }));
   };

   // Handle manual input changes (only for editable fields)
   const handleChange = (field, value) => {
      setTrendData((prev) => ({ ...prev, [field]: value }));
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
                  className="border border-gray-400 px-2 py-1 text-xs w-32 bg-yellow-100">
                  <option value="METAR">METAR</option>
                  <option value="SPECI">SPECI</option>
                  <option value="TAF">TAF</option>
               </select>
               <span className="font-bold ml-auto">Time</span>
               <input
                  type="text"
                  value={trendData.time || ""}
                  readOnly
                  className="border border-gray-400 px-2 py-1 text-xs w-20 bg-white text-center"
               />
            </div>

            {/* Uncheck to add checkbox row */}
            <div className="flex items-center gap-2 text-xs">
               <input
                  type="checkbox"
                  checked={trendData.uncheckToAdd !== false}
                  onChange={(e) =>
                     handleChange("uncheckToAdd", e.target.checked)
                  }
                  className="w-4 h-4"
               />
               <span className="font-bold">Uncheck to add</span>
               <button className="ml-auto bg-gray-400 border border-gray-500 px-3 py-1 text-xs hover:bg-gray-500">
                  Retrieve
               </button>
            </div>

            {/* Wind Section */}
            <div className="space-y-2">
               <div className="font-bold text-xs bg-gray-400 px-2 py-1 -mx-3">
                  <span className="ml-3">Wind</span>
               </div>
               <DisplayRow
                  label="Wind"
                  value={trendData.windCode || ""}
                  unit=""
               />
               <DisplayRow
                  label="Vis"
                  value={trendData.visibilityCode || ""}
                  unit=""
               />
            </div>

            {/* Temperature Section */}
            <div className="space-y-2">
               <div className="font-bold text-xs bg-gray-400 px-2 py-1 -mx-3">
                  <span className="ml-3">Temp</span>
               </div>
               <DisplayRow
                  label="Temp"
                  value={trendData.temperature || ""}
                  unit="°C"
               />
               <DisplayRow
                  label="Dew"
                  value={trendData.dewPointTemp || ""}
                  unit="°C"
               />
            </div>

            {/* Pressure Section */}
            <div className="space-y-2">
               <DisplayRowDouble
                  label="QFE"
                  value1={trendData.qfe || ""}
                  unit1="hPa"
                  value2={trendData.qfeInches || ""}
                  unit2="inches"
               />
               <DisplayRowDouble
                  label="QNH"
                  value1={trendData.qnh || ""}
                  unit1="hPa"
                  value2={trendData.qnhInches || ""}
                  unit2="inches"
               />
            </div>

            {/* Weather */}
            <DisplayRow
               label="Weather"
               value={trendData.weatherCode || ""}
               unit=""
               highlighted
            />

            {/* Cloud */}
            <DisplayRow
               label="Cloud"
               value={trendData.cloudCode || ""}
               unit=""
               highlighted
            />

            {/* Trend */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold w-24">Trend</span>
               <select
                  value={trendData.trend || ""}
                  onChange={(e) => handleChange("trend", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-xs flex-1">
                  <option value="">Select...</option>
                  <option value="NOSIG">NOSIG</option>
                  <option value="BECMG">BECMG</option>
                  <option value="TEMPO">TEMPO</option>
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
                  placeholder="OKORO A. D."
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

// Display Row Component (read-only calculated values)
const DisplayRow = ({ label, value, unit, highlighted = false }) => (
   <div className="flex items-center gap-2 text-xs">
      <span className="font-bold w-24">{label}</span>
      <input
         type="text"
         value={value}
         readOnly
         className={`border border-gray-400 px-2 py-1 text-xs flex-1 text-center ${
            highlighted ? "bg-yellow-100" : "bg-white"
         }`}
      />
      {unit && <span className="italic w-14 text-right">{unit}</span>}
   </div>
);

// Display Row with two values (for QFE/QNH with hPa and inches)
const DisplayRowDouble = ({ label, value1, unit1, value2, unit2 }) => (
   <div className="flex items-center gap-2 text-xs">
      <span className="font-bold w-24">{label}</span>
      <input
         type="text"
         value={value1}
         readOnly
         className="border border-gray-400 px-2 py-1 text-xs w-20 bg-white text-center"
      />
      <span className="italic w-10">{unit1}</span>
      <input
         type="text"
         value={value2}
         readOnly
         className="border border-gray-400 px-2 py-1 text-xs w-20 bg-white text-center"
      />
      <span className="italic w-14 text-right">{unit2}</span>
   </div>
);

export default TrendForecastSection;
