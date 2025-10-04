"use client";

import { useState } from "react";

const TrendForecastSection = () => {
   // State for trend/forecast form inputs
   const [forecastData, setForecastData] = useState({
      message: "METAR",
      time: "0830",
      wind: "21008KT",
      windVis: "8000",
      temp: "27",
      dew: "24",
      qfe: "1006",
      qfeDec: "29.72",
      qnh: "1015",
      qnhDec: "30.00",
      weather: "NIL",
      cloud: "SCT009",
      remarks: "",
   });

   // Handle input changes
   const handleChange = (field, value) => {
      setForecastData((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <div className="bg-gray-300 border-2 border-gray-400 rounded">
         {/* Header */}
         <div className="bg-gray-300 border-b-2 border-gray-400 px-3 py-1.5">
            <h2 className="font-bold text-sm">
               TREND LANDING FORECAST FOR DNAS
            </h2>
         </div>

         {/* Content */}
         <div className="p-3 space-y-2">
            {/* Message Type and Time Row */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold">Message:</span>
               <select
                  value={forecastData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-24">
                  <option value="METAR">METAR</option>
                  <option value="SPECI">SPECI</option>
                  <option value="TAF">TAF</option>
               </select>

               <span className="text-xs font-bold ml-4">Time</span>
               <input
                  type="text"
                  value={forecastData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-20"
               />

               <button className="bg-gray-300 border border-gray-500 px-3 py-1 text-xs hover:bg-gray-400 ml-auto">
                  Retrieve
               </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2">
               <input type="checkbox" id="uncheck-edit" className="w-3 h-3" />
               <label
                  htmlFor="uncheck-edit"
                  className="text-xs text-blue-600 underline cursor-pointer">
                  Uncheck to edit message
               </label>
            </div>

            {/* Wind Row */}
            <ForecastInputRow
               label="Wind"
               value={forecastData.wind}
               onChange={(v) => handleChange("wind", v)}
               secondLabel="Vis"
               secondValue={forecastData.windVis}
               onSecondChange={(v) => handleChange("windVis", v)}
            />

            {/* Temperature Row */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold w-16">Temp</span>
               <input
                  type="text"
                  value={forecastData.temp}
                  onChange={(e) => handleChange("temp", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-16 bg-yellow-100"
               />
               <span className="text-xs">°C</span>

               <span className="text-xs font-bold ml-4">Dew</span>
               <input
                  type="text"
                  value={forecastData.dew}
                  onChange={(e) => handleChange("dew", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-16 bg-yellow-100"
               />
               <span className="text-xs">°C</span>
            </div>

            {/* QFE Row */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold w-16">QFE</span>
               <input
                  type="text"
                  value={forecastData.qfe}
                  onChange={(e) => handleChange("qfe", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
               />
               <span className="text-xs">hPa</span>
               <input
                  type="text"
                  value={forecastData.qfeDec}
                  onChange={(e) => handleChange("qfeDec", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
               />
               <span className="text-xs">inches</span>
            </div>

            {/* QNH Row */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold w-16">QNH</span>
               <input
                  type="text"
                  value={forecastData.qnh}
                  onChange={(e) => handleChange("qnh", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
               />
               <span className="text-xs">hPa</span>
               <input
                  type="text"
                  value={forecastData.qnhDec}
                  onChange={(e) => handleChange("qnhDec", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
               />
               <span className="text-xs">inches</span>
            </div>

            {/* Weather Row */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold w-16">Weather</span>
               <input
                  type="text"
                  value={forecastData.weather}
                  onChange={(e) => handleChange("weather", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm flex-1 bg-yellow-100"
               />
            </div>

            {/* Cloud Row */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold w-16">Cloud</span>
               <input
                  type="text"
                  value={forecastData.cloud}
                  onChange={(e) => handleChange("cloud", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-sm flex-1 bg-yellow-100"
               />
            </div>

            {/* Trend & RMK Label */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold">Trend</span>
               <span className="text-xs font-bold ml-auto">& RMK</span>
            </div>

            {/* Remarks Textarea */}
            <textarea
               value={forecastData.remarks}
               onChange={(e) => handleChange("remarks", e.target.value)}
               className="border border-gray-400 px-2 py-1 text-xs w-full h-16 resize-none"
               placeholder="Remarks"
            />

            {/* Officer Input and Checkbox */}
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold">Officer</span>
               <input
                  type="text"
                  placeholder="OSAKWE MLN"
                  className="border border-gray-400 px-2 py-1 text-xs flex-1"
               />
               <input type="checkbox" className="w-3 h-3" />
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-2">
               <button className="bg-gray-300 border border-gray-500 px-3 py-1 text-xs hover:bg-gray-400 flex-1">
                  Read
               </button>
               <button className="bg-red-400 border border-gray-500 px-3 py-1 text-xs hover:bg-red-500 flex-1 text-white font-bold">
                  Print MET REPORT
               </button>
               <button className="bg-blue-400 border border-gray-500 px-3 py-1 text-xs hover:bg-blue-500 flex-1 text-white font-bold">
                  Build METAR
               </button>
            </div>
         </div>
      </div>
   );
};

// Reusable Input Row for two fields side-by-side
const ForecastInputRow = ({
   label,
   value,
   onChange,
   secondLabel,
   secondValue,
   onSecondChange,
}) => (
   <div className="flex items-center gap-2">
      <span className="text-xs font-bold w-16">{label}</span>
      <input
         type="text"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         className="border border-gray-400 px-2 py-1 text-sm w-24 bg-yellow-100"
      />

      <span className="text-xs font-bold ml-4">{secondLabel}</span>
      <input
         type="text"
         value={secondValue}
         onChange={(e) => onSecondChange(e.target.value)}
         className="border border-gray-400 px-2 py-1 text-sm w-20 bg-yellow-100"
      />
   </div>
);

export default TrendForecastSection;
