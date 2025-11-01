"use client";

import { useEffect } from "react";
import { useMetar } from "../context/MetarContext";

const DerivedValuesSection = () => {
   const { observedData, derivedData, setDerivedData, stationInfo } =
      useMetar();

   // Calculate derived values whenever observed data changes
   useEffect(() => {
      calculateDerivedValues();
   }, [observedData]);

   /**
    * Calculate all derived meteorological values from observed data
    */
   const calculateDerivedValues = () => {
      const { dryBulb, wetBulb, digitalBarometer, cloudAmount } = observedData;
      const { elevation } = stationInfo;

      // Convert to numbers, handle null/empty values
      const T = parseFloat(dryBulb) || 0;
      const Tw = parseFloat(wetBulb) || 0;
      const P = parseFloat(digitalBarometer) || 0;
      const E = parseFloat(elevation) || 82.4;

      // 1. VAPOR PRESSURE (e) - Magnus formula
      const es = 6.112 * Math.exp((17.67 * Tw) / (Tw + 243.5));
      const vaporPressure = es - 0.00066 * (1 + 0.00115 * Tw) * P * (T - Tw);

      // 2. RELATIVE HUMIDITY (RH%) - Standard formula
      const esT = 6.112 * Math.exp((17.67 * T) / (T + 243.5));
      const relativeHumidity = (vaporPressure / esT) * 100;

      // 3. DEW POINT (Td) - Magnus inverse formula
      const ln = Math.log(vaporPressure / 6.112);
      const dewPoint = (243.5 * ln) / (17.67 - ln);

      // 4. FEEL TEMPERATURE (Heat Index approximation)
      const feelTemperature = T + 0.33 * vaporPressure - 0.7 - 4.0;

      // 5. CLOUD BASE HEIGHT - Espy's equation: height = 125 * (T - Td) meters
      const heightBaseCloud = Math.round((125 * (T - dewPoint)) / 30); // in units of 30m
      const cloudBaseHeight = heightBaseCloud * 30; // meters
      const cloudBaseHeightFt = Math.round(cloudBaseHeight * 3.28084); // feet

      // 6. REFERENCE EVAPOTRANSPIRATION (ETo) - Simplified Penman
      const delta = (4098 * esT) / Math.pow(T + 237.3, 2);
      const refEvapotranspiration = 0.408 * delta * 0.5; // Simplified, mm/h

      // 7. ESTIMATED VISIBILITY - Based on RH
      const estVisibility =
         relativeHumidity > 95
            ? 2
            : relativeHumidity > 85
            ? 5
            : relativeHumidity > 75
            ? 10
            : 20;

      // 8. SEA LEVEL PRESSURE (SLP) - Standard atmosphere reduction
      const slp = P + E / 8.0; // Simplified formula

      // 9. MEAN SEA LEVEL PRESSURE (MSLP) - More accurate reduction
      const mslp =
         P * Math.pow(1 - (0.0065 * E) / (T + 273.15 + 0.0065 * E), -5.257);

      // 10. QNH - Altimeter setting
      const qnh = P * Math.pow(1 - (0.0065 * E) / 288.15, -5.255);

      // Convert hPa to inches Hg (1 hPa = 0.02953 inHg)
      const slpInches = (slp * 0.02953).toFixed(2);
      const mslpInches = (mslp * 0.02953).toFixed(2);
      const qnhInches = (qnh * 0.02953).toFixed(2);

      // Update derived data in context
      setDerivedData({
         relativeHumidity: relativeHumidity.toFixed(0),
         vaporPressure: vaporPressure.toFixed(1),
         dewPoint: dewPoint.toFixed(1),
         feelTemperature: feelTemperature.toFixed(0),
         heightBaseCloud: heightBaseCloud.toString(),
         cloudBaseHeight: cloudBaseHeight.toString(),
         cloudBaseHeightFt: cloudBaseHeightFt.toString(),
         refEvapotranspiration: refEvapotranspiration.toFixed(2),
         estEvaporation: "", // Not calculated - requires pan evaporation data
         estVisibility: estVisibility.toString(),
         slp: slp.toFixed(1),
         slpInches,
         mslp: mslp.toFixed(1),
         mslpInches,
         qnh: qnh.toFixed(1),
         qnhInches,
      });
   };

   return (
      <div className="bg-gray-300 border-2 border-gray-400 rounded h-full flex flex-col overflow-hidden">
         {/* Header */}
         <div className="bg-gray-300 border-b-2 border-gray-400 px-3 py-1.5 flex justify-between items-center flex-shrink-0">
            <h2 className="font-bold text-sm">DERIVED VALUES</h2>
            <button className="bg-yellow-200 border border-gray-500 px-2 py-0.5 text-xs hover:bg-yellow-300">
               Agromet data
            </button>
         </div>

         {/* Content - Scrollable with better spacing */}
         <div className="p-3 flex flex-col gap-2.5 overflow-y-auto flex-1">
            {/* Basic Derived Values - Well spaced */}
            <DerivedRow
               label="Relative humidity"
               value={derivedData.relativeHumidity || ""}
               unit="%"
            />
            <DerivedRow
               label="vapor pressure"
               value={derivedData.vaporPressure || ""}
               unit="hPa"
            />
            <DerivedRow
               label="Dew point"
               value={derivedData.dewPoint || ""}
               unit="°C"
            />
            <DerivedRow
               label="Feel temperature"
               value={derivedData.feelTemperature || ""}
               unit="°C"
            />

            {/* Height of base of cloud - Special row */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold w-40">Height of base of Cl</span>
               <span className="text-blue-600 font-bold">60kt</span>
               <input
                  type="text"
                  value={derivedData.heightBaseCloud || ""}
                  readOnly
                  className="border border-gray-400 px-2 py-1 text-xs w-16 bg-blue-100 text-center font-bold"
               />
               <span className="italic">m/30</span>
            </div>

            {/* Cloud base height - Flex row with colored boxes */}
            <div className="flex items-center gap-2 text-xs">
               <span className="font-bold text-yellow-600 w-40">
                  Height of base of Cl (CL)
               </span>
               <input
                  type="text"
                  value={derivedData.cloudBaseHeight || ""}
                  readOnly
                  className="border border-gray-400 px-2 py-1 text-xs w-20 bg-green-300 text-center font-bold"
               />
               <input
                  type="text"
                  value={derivedData.cloudBaseHeightFt || ""}
                  readOnly
                  className="border border-gray-400 px-2 py-1 text-xs w-20 bg-yellow-300 text-center font-bold"
               />
               <span className="italic">m</span>
            </div>

            {/* Agrometeorological Data Section */}
            <div className="bg-gray-200 border border-gray-400 p-2.5 rounded space-y-2 mt-1">
               <h3 className="text-xs font-bold text-center mb-2">
                  Agromet data
               </h3>
               <DerivedRow
                  label="Ref. evapotranspiration (ETo)"
                  value={derivedData.refEvapotranspiration || ""}
                  unit="mm/h"
               />
               <DerivedRow
                  label="Est. amount of evaporation"
                  value={derivedData.estEvaporation || ""}
                  unit="mm/h"
               />
               <DerivedRow
                  label="Est. visiblity"
                  value={derivedData.estVisibility || ""}
                  unit="km"
               />
            </div>

            {/* Pressure Values - 2 Column Grid with proper spacing */}
            <div className="space-y-2 mt-2 pt-2 border-t-2 border-gray-400">
               {/* SLP Row */}
               <div className="grid grid-cols-2 gap-4">
                  <PressureCell
                     label="SLP"
                     value={derivedData.slp || ""}
                     unit="hPa"
                  />
                  <PressureCell
                     value={derivedData.slpInches || ""}
                     unit="inches"
                     noLabel
                  />
               </div>

               {/* MSLP Row */}
               <div className="grid grid-cols-2 gap-4">
                  <PressureCell
                     label="MSLP"
                     value={derivedData.mslp || ""}
                     unit="hPa"
                  />
                  <PressureCell
                     value={derivedData.mslpInches || ""}
                     unit="inches"
                     noLabel
                  />
               </div>

               {/* QNH Row */}
               <div className="grid grid-cols-2 gap-4">
                  <PressureCell
                     label="QNH"
                     value={derivedData.qnh || ""}
                     unit="hPa"
                  />
                  <PressureCell
                     value={derivedData.qnhInches || ""}
                     unit="inches"
                     noLabel
                  />
               </div>
            </div>

            {/* LLWAS Button - Properly centered */}
            <div className="flex items-center justify-center gap-2 pt-3 mt-auto">
               <span className="text-blue-600 font-bold text-sm">LLWAS</span>
               <button className="bg-green-500 text-white font-bold px-3 py-1 text-xs hover:bg-green-600 rounded">
                  !
               </button>
            </div>
         </div>
      </div>
   );
};

// Reusable Derived Row Component (read-only) with better alignment
const DerivedRow = ({ label, value, unit }) => (
   <div className="flex items-center gap-2 text-sm">
      <span className="font-bold w-65">{label}</span>
      <input
         type="text"
         value={value}
         readOnly
         className="border border-gray-400 px-2 py-1 text-xs w-30 bg-white text-center"
      />
      <span className="italic w-14 text-right">{unit}</span>
   </div>
);

// Pressure Cell Component for grid layout with better structure
const PressureCell = ({ label, value, unit, noLabel = false }) => (
   <div className="flex items-center gap-2 text-xs">
      {label && <span className="font-bold w-18">{label}</span>}
      {noLabel && <span className="w-14"></span>}
      <input
         type="text"
         value={value}
         readOnly
         className="border border-gray-400 px-2 py-1 text-xs flex-1 bg-white text-center"
      />
      <span className="italic w-14 text-right">{unit}</span>
   </div>
);

export default DerivedValuesSection;
