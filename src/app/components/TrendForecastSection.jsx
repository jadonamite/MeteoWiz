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
      <div
         className="bg-[#c0c0c0] border-2 border-gray-400 h-full flex flex-col"
         style={{ fontFamily: "Arial, sans-serif" }}>
         {/* Header */}
         <div className="bg-[#c0c0c0] border-b-2 border-gray-500 px-2 py-0.5 flex-shrink-0">
            <h2
               className="font-bold text-base text-center"
               style={{ letterSpacing: "0.5px" }}>
               TREND LANDING FORECAST FOR DNAS
            </h2>
         </div>

         {/* Content - Grid Layout */}
         <div className="px-3 py-3 flex flex-col gap-2">
            {/* Row 1: Message, Time, and Retrieve Button */}
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 items-center">
               {/* Container 1: Message */}
               <label className="font-bold text-base whitespace-nowrap">
                  Message:
               </label>
               <select
                  value={trendData.messageType || "METAR"}
                  onChange={(e) => handleChange("messageType", e.target.value)}
                  className="border border-black px-2 py-1 text-base bg-white h-7">
                  <option value="METAR">METAR</option>
                  <option value="SPECI">SPECI</option>
                  <option value="TAF">TAF</option>
               </select>

               {/* Container 2: Time */}
               <label className="font-bold text-base whitespace-nowrap">
                  Time
               </label>
               <select
                  value={trendData.time || "0830"}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="border border-black px-2 py-1 text-base bg-white h-7">
                  <option value="0830">0830</option>
                  <option value="0900">0900</option>
                  <option value="1200">1200</option>
               </select>

               {/* Retrieve Button */}
               <button
                  className="bg-[#c0c0c0] border-2 border-gray-600 px-3 py-0.5 text-base hover:bg-gray-400 h-7"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
                  Retrieve
               </button>
            </div>

            {/* Row 2: Uncheck to edit message and COR */}
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 items-center">
               <div className="col-span-2 flex items-center gap-2">
                  <span className="text-blue-600 underline text-sm">
                     Uncheck to edit message
                  </span>
                  <input
                     type="checkbox"
                     checked={trendData.editMessageLocked !== false}
                     onChange={(e) =>
                        handleChange("editMessageLocked", e.target.checked)
                     }
                     className="w-4 h-4"
                  />
               </div>
               <div className="col-span-3 flex items-center justify-end gap-2">
                  <span className="font-bold text-base">COR</span>
                  <input
                     type="checkbox"
                     checked={trendData.cor || false}
                     onChange={(e) => handleChange("cor", e.target.checked)}
                     className="w-4 h-4"
                  />
               </div>
            </div>

            {/* Row 3: Wind and Vis */}
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 items-center">
               {/* Container 1: Wind */}
               <label className="font-bold text-base">Wind</label>
               <input
                  type="text"
                  value={trendData.windCode || ""}
                  readOnly
                  className="border border-black px-2 py-1 text-base bg-yellow-100 text-center font-bold h-7"
               />

               {/* Container 2: Vis */}
               <label className="font-bold text-base">Vis</label>
               <input
                  type="text"
                  value={trendData.visibilityCode || ""}
                  readOnly
                  className="border border-black px-2 py-1 text-base bg-white text-center h-7"
               />
               <div></div>
            </div>

            {/* Row 4: Temp and Dew */}
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 items-center">
               {/* Container 1: Temp */}
               <label className="font-bold text-base">Temp</label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={trendData.temperature || ""}
                     readOnly
                     className="border border-black px-2 py-1 text-base bg-white text-center h-7 flex-1"
                  />
                  <span className="italic text-base">c</span>
               </div>

               {/* Container 2: Dew */}
               <label className="font-bold text-base">Dew</label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={trendData.dewPointTemp || ""}
                     readOnly
                     className="border border-black px-2 py-1 text-base bg-white text-center h-7 flex-1"
                  />
                  <span className="italic text-base">c</span>
               </div>
               <div></div>
            </div>

            {/* Row 5: QFE */}
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 items-center">
               {/* Container 1: QFE */}
               <label className="font-bold text-base">QFE</label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={trendData.qfe || ""}
                     readOnly
                     className="border border-black px-2 py-1 text-base bg-white text-center h-7 flex-1"
                  />
                  <span className="italic text-base">hPa</span>
               </div>

               {/* Container 2: QFE Inches */}
               <div></div>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={trendData.qfeInches || ""}
                     readOnly
                     className="border border-black px-2 py-1 text-base bg-white text-center h-7 flex-1"
                  />
                  <span className="italic text-base">inches</span>
               </div>
               <div></div>
            </div>

            {/* Row 6: QNH */}
            <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 items-center">
               {/* Container 1: QNH */}
               <label className="font-bold text-base">QNH</label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={trendData.qnh || ""}
                     readOnly
                     className="border border-black px-2 py-1 text-base bg-white text-center h-7 flex-1"
                  />
                  <span className="italic text-base">hPa</span>
               </div>

               {/* Container 2: QNH Inches */}
               <div></div>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={trendData.qnhInches || ""}
                     readOnly
                     className="border border-black px-2 py-1 text-base bg-white text-center h-7 flex-1"
                  />
                  <span className="italic text-base">inches</span>
               </div>
               <div></div>
            </div>

            {/* Row 7: Weather - Full Width */}
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center mt-2">
               <label className="font-bold text-base">Weather</label>
               <input
                  type="text"
                  value={trendData.weatherCode || ""}
                  readOnly
                  className="border border-black px-2 py-2 text-base bg-white"
                  style={{ height: "40px" }}
               />
            </div>

            {/* Row 8: Cloud - Full Width */}
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
               <label className="font-bold text-base">Cloud</label>
               <input
                  type="text"
                  value={trendData.cloudCode || ""}
                  readOnly
                  className="border border-black px-2 py-2 text-base bg-white"
                  style={{ height: "40px" }}
               />
            </div>

            {/* Row 9: Trend and RMK */}
            <div className="grid grid-cols-[auto_1fr] gap-2 items-start mt-2">
               <div className="flex flex-col items-center">
                  <button
                     className="bg-[#c0c0c0] border-2 border-gray-600 px-2 py-1 text-sm font-bold whitespace-nowrap"
                     style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
                     Trend
                  </button>
                  <span className="font-bold text-sm mt-1">& RMK</span>
               </div>
               <input
                  type="text"
                  value={trendData.trend || ""}
                  onChange={(e) => handleChange("trend", e.target.value)}
                  className="border border-black px-2 py-2 text-base bg-white"
                  style={{ height: "80px" }}
               />
            </div>

            {/* Row 10: Remarks */}
            <div className="flex flex-col gap-1">
               <label className="font-bold text-base">Remarks</label>
               <textarea
                  value={trendData.remarks || ""}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  className="border border-black px-2 py-1 text-base resize-none bg-white"
                  style={{ height: "60px" }}
               />
            </div>

            {/* Row 11: Officer */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
               <label className="font-bold text-base">Officer</label>
               <input
                  type="text"
                  value={trendData.officer || ""}
                  onChange={(e) => handleChange("officer", e.target.value)}
                  placeholder="OSAKWE MLN"
                  className="border border-black px-2 py-1 text-base text-center h-7"
               />
               <input type="checkbox" className="w-4 h-4" />
            </div>

            {/* Row 12: Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-2">
               <button
                  className="bg-gray-500 text-white border-2 border-gray-700 px-2 py-2 text-sm hover:bg-gray-600 font-bold"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>
                  Read
               </button>
               <button
                  className="bg-red-600 text-white border-2 border-red-800 px-2 py-2 text-sm hover:bg-red-700 font-bold"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>
                  Print MET REPORT
               </button>
               <button
                  className="bg-blue-600 text-white border-2 border-blue-800 px-2 py-2 text-sm hover:bg-blue-700 font-bold"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>
                  Build METAR
               </button>
            </div>
         </div>
      </div>
   );
};

export default TrendForecastSection;
