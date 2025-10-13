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

      // 5. QFE - Digital barometer value (rounded to whole number, no decimals)
      const qfe = observedData.digitalBarometer
         ? Math.round(parseFloat(observedData.digitalBarometer)).toString()
         : "";
      const qfeInches = qfe ? (parseFloat(qfe) * 0.02953).toFixed(2) : "";

      // 6. QNH - Derived QNH value (rounded to whole number, no decimals)
      const qnh = derivedData.qnh
         ? Math.round(parseFloat(derivedData.qnh)).toString()
         : "";
      const qnhInches = qnh ? (parseFloat(qnh) * 0.02953).toFixed(2) : "";

      // 7. Weather - from observed weather conditions
      const weatherCode = observedData.weather || "NIL";

      // 8. Cloud Code - format: NNNhhh (e.g., SCT009)
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

      // Height in hundreds of feet
      const heightInHundredFeet = Math.round(parseFloat(cloudHeight) / 30.48)
         .toString()
         .padStart(3, "0");
      const cloudCode =
         cloudAmount === "0" ? "SKC" : `${cloudCoverage}${heightInHundredFeet}`;

      // Update trend data in context
      setTrendData((prev) => ({
         ...prev,
         messageType: prev.messageType || "METAR",
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

   // Handle manual input changes
   const handleChange = (field, value) => {
      setTrendData((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <div className="bg-gray-300 border-2 border-gray-400 rounded h-full flex flex-col">
         {/* Header */}
         <div className="bg-gray-300 border-b-2 border-gray-400 px-2 py-1 flex-shrink-0">
            <h2 className="font-bold text-xs text-center">
               TREND LANDING FORECAST FOR DNAS
            </h2>
         </div>

         {/* Content - Fixed height sections */}
         <div className="p-2 flex flex-col gap-2">
            {/* Row 1: Message and Time */}
            <div className="flex items-center gap-3 text-xs">
               <div className="flex items-center gap-1.5 flex-1">
                  <span className="font-bold whitespace-nowrap">Message:</span>
                  <select
                     value={trendData.messageType || "METAR"}
                     onChange={(e) =>
                        handleChange("messageType", e.target.value)
                     }
                     className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-white">
                     <option value="METAR">METAR</option>
                     <option value="SPECI">SPECI</option>
                     <option value="TAF">TAF</option>
                  </select>
               </div>
               <div className="flex items-center gap-1.5 flex-1">
                  <span className="font-bold whitespace-nowrap">Time</span>
                  <select
                     value={trendData.time || "0830"}
                     onChange={(e) => handleChange("time", e.target.value)}
                     className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-white">
                     <option value="0830">0830</option>
                     <option value="0900">0900</option>
                     <option value="1200">1200</option>
                  </select>
               </div>
               <button className="bg-gray-400 border border-gray-500 px-2 py-0.5 text-xs hover:bg-gray-500">
                  Retrieve
               </button>
            </div>

            {/* Row 2: Uncheck to edit message and COR */}
            <div className="flex items-center justify-between text-xs">
               <div className="flex items-center gap-1.5">
                  <span className="text-blue-600 underline text-xs">
                     Uncheck to edit message
                  </span>
                  <input
                     type="checkbox"
                     checked={trendData.editMessageLocked !== false}
                     onChange={(e) =>
                        handleChange("editMessageLocked", e.target.checked)
                     }
                     className="w-3.5 h-3.5"
                  />
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="font-bold">COR</span>
                  <input
                     type="checkbox"
                     checked={trendData.cor || false}
                     onChange={(e) => handleChange("cor", e.target.checked)}
                     className="w-3.5 h-3.5"
                  />
               </div>
            </div>

            {/* Row 3: Wind and Vis */}
            <div className="flex items-center gap-3 text-xs">
               <div className="flex items-center gap-1.5 flex-1">
                  <span className="font-bold w-10">Wind</span>
                  <input
                     type="text"
                     value={trendData.windCode || ""}
                     readOnly
                     className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-yellow-100 text-center font-bold"
                  />
               </div>
               <div className="flex items-center gap-1.5 flex-1">
                  <span className="font-bold w-10">Vis</span>
                  <input
                     type="text"
                     value={trendData.visibilityCode || ""}
                     readOnly
                     className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-white text-center"
                  />
               </div>
            </div>

            {/* Row 4: Temp and Dew */}
            <div className="flex items-center gap-3 text-xs">
               <div className="flex items-center gap-1.5 flex-1">
                  <span className="font-bold w-10">Temp</span>
                  <input
                     type="text"
                     value={trendData.temperature || ""}
                     readOnly
                     className="border border-gray-400 px-1.5 py-0.5 text-xs w-16 bg-white text-center"
                  />
                  <span className="italic">°C</span>
               </div>
               <div className="flex items-center gap-1.5 flex-1">
                  <span className="font-bold w-10">Dew</span>
                  <input
                     type="text"
                     value={trendData.dewPointTemp || ""}
                     readOnly
                     className="border border-gray-400 px-1.5 py-0.5 text-xs w-16 bg-white text-center"
                  />
                  <span className="italic">°C</span>
               </div>
            </div>

            {/* Row 5: QFE */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-10">QFE</span>
               <input
                  type="text"
                  value={trendData.qfe || ""}
                  readOnly
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-20 bg-white text-center"
               />
               <span className="italic">hPa</span>
               <input
                  type="text"
                  value={trendData.qfeInches || ""}
                  readOnly
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-20 bg-white text-center ml-auto"
               />
               <span className="italic">inches</span>
            </div>

            {/* Row 6: QNH */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-10">QNH</span>
               <input
                  type="text"
                  value={trendData.qnh || ""}
                  readOnly
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-20 bg-white text-center"
               />
               <span className="italic">hPa</span>
               <input
                  type="text"
                  value={trendData.qnhInches || ""}
                  readOnly
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-20 bg-white text-center ml-auto"
               />
               <span className="italic">inches</span>
            </div>

            {/* Row 7: Weather */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-20">Weather</span>
               <input
                  type="text"
                  value={trendData.weatherCode || ""}
                  readOnly
                  className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-white"
               />
            </div>

            {/* Row 8: Cloud */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-20">Cloud</span>
               <input
                  type="text"
                  value={trendData.cloudCode || ""}
                  readOnly
                  className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-white"
               />
            </div>

            {/* Row 9: Trend and RMK inline */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold bg-gray-400 px-2 py-0.5 border border-gray-500">
                  Trend
               </span>
               <input
                  type="text"
                  value={trendData.trend || ""}
                  onChange={(e) => handleChange("trend", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 bg-white"
               />
               <span className="font-bold bg-gray-400 px-2 py-0.5 border border-gray-500">
                  & RMK
               </span>
            </div>

            {/* Row 10: Remarks */}
            <div className="flex flex-col gap-1 text-xs">
               <span className="font-bold">Remarks</span>
               <textarea
                  value={trendData.remarks || ""}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  className="border border-gray-400 px-1.5 py-1 text-xs h-14 resize-none bg-white"
               />
            </div>

            {/* Row 11: Officer */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-16">Officer</span>
               <input
                  type="text"
                  value={trendData.officer || ""}
                  onChange={(e) => handleChange("officer", e.target.value)}
                  placeholder="OSAKWE MLN"
                  className="border border-gray-400 px-1.5 py-0.5 text-xs flex-1 text-center"
               />
               <input type="checkbox" className="w-3.5 h-3.5" />
            </div>

            {/* Row 12: Action Buttons */}
            <div className="grid grid-cols-3 gap-1.5">
               <button className="bg-gray-400 border border-gray-500 px-2 py-1 text-xs hover:bg-gray-500 font-bold">
                  Read
               </button>
               <button className="bg-red-600 text-white border border-red-700 px-2 py-1 text-xs hover:bg-red-700 font-bold">
                  Print MET REPORT
               </button>
               <button className="bg-blue-600 text-white border border-blue-700 px-2 py-1 text-xs hover:bg-blue-700 font-bold">
                  Build METAR
               </button>
            </div>
         </div>
      </div>
   );
};

export default TrendForecastSection;
