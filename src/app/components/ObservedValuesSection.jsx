
"use client";

import { useMetar } from "../context/MetarContext";

const ObservedValuesSection = () => {
   // Get context state and setter
   const { observedData, setObservedData } = useMetar();

   // Handle input changes - updates context directly
   const handleChange = (field, value) => {
      setObservedData((prev) => ({ ...prev, [field]: value }));
   };

   // Handle Retrieve button - loads current date/time
   const handleRetrieve = () => {
      const now = new Date();
      const date = `${
         now.getMonth() + 1
      }/${now.getDate()}/${now.getFullYear()}`;
      const time = `${String(now.getHours()).padStart(2, "0")}${String(
         now.getMinutes()
      ).padStart(2, "0")}`;

      setObservedData((prev) => ({ ...prev, date, time }));
   };

   // Calculate wind direction text (e.g., 210 = SW)
   const getWindDirectionText = (degrees) => {
      if (!degrees) return "";
      const deg = parseInt(degrees);
      if (deg >= 337.5 || deg < 22.5) return "N";
      if (deg >= 22.5 && deg < 67.5) return "NE";
      if (deg >= 67.5 && deg < 112.5) return "E";
      if (deg >= 112.5 && deg < 157.5) return "SE";
      if (deg >= 157.5 && deg < 202.5) return "S";
      if (deg >= 202.5 && deg < 247.5) return "SW";
      if (deg >= 247.5 && deg < 292.5) return "W";
      if (deg >= 292.5 && deg < 337.5) return "NW";
      return "";
   };

   return (
      <div className="bg-gray-300 border-2 border-gray-400 rounded h-full flex flex-col overflow-hidden">
         {/* Header with Buttons */}
         <div className="bg-gray-300 border-b-2 border-gray-400 px-2 py-1 flex-shrink-0 flex justify-between items-start">
            <h2 className="font-bold text-sm pt-1">OBSERVED VALUES</h2>

            <div className=" absolute grid  gap-1">
               <button
                  onClick={handleRetrieve}
                  className="bg-blue-400 text-white border-2 border-gray-600 px-2 py-0.5 text-xs hover:bg-blue-500"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
                  Retrieve
               </button>

               <button
                  className="bg-gray-400 border-2 border-gray-600 px-2 py-0.5 text-xs hover:bg-gray-500"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
                  Acquire
               </button>

               <button
                  className="bg-gray-400 border-2 border-gray-600 px-2 py-0.5 text-xs hover:bg-gray-500 "
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
                  Meteo
               </button>
            </div>
         </div>

         {/* Form Content - Scrollable */}
         <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
            {/* Date and Time Row */}
            <div className="flex gap-1.5 items-center text-sm">
               <input
                  type="text"
                  value={observedData.date || ""}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-24"
                  placeholder="9/3/2025"
               />
               <span className="font-bold text-xs">Time</span>
               <input
                  type="text"
                  value={observedData.time || ""}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-16"
                  placeholder="0830"
               />
            </div>

            {/* Date Label
            <div className="bg-yellow-50 px-1.5 py-0.5 text-xs font-bold border border-gray-400">
               mm/dd/yyyy
            </div> */}

            {/* Temperature Inputs */}
            <InputRow
               label="Dry bulb"
               value={observedData.dryBulb || ""}
               onChange={(v) => handleChange("dryBulb", v)}
               unit="°C"
            />
            <InputRow
               label="Wet bulb"
               value={observedData.wetBulb || ""}
               onChange={(v) => handleChange("wetBulb", v)}
               unit="°C"
            />
            <InputRow
               label="Digital barometer"
               value={observedData.digitalBarometer || ""}
               onChange={(v) => handleChange("digitalBarometer", v)}
               unit="hPa"
            />
            <InputRow
               label="Astread barometer"
               value={observedData.astreadBarometer || ""}
               onChange={(v) => handleChange("astreadBarometer", v)}
               unit="hPa"
            />
            <InputRow
               label="Attach thermometer"
               value={observedData.attachThermometer || ""}
               onChange={(v) => handleChange("attachThermometer", v)}
               unit="°C"
            />

            {/* Visual Section Header */}
            <div className="bg-gray-400 px-1.5 py-0.5 text-xs font-bold border-y border-gray-500 -mx-2">
               <span className="ml-2">Visual</span>
            </div>

            {/* Visibility Row */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-24">Visibility (vv)</span>
               <span className="text-red-600 font-bold">/ Dir. Vis</span>
               <input
                  type="text"
                  value={observedData.visibility || ""}
                  onChange={(e) => handleChange("visibility", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-16 bg-yellow-100 ml-auto"
               />
               <span>m</span>
            </div>

            {/* Wind Direction Row */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold w-24">Wind dir (ddd)</span>
               <span className="text-red-600 font-bold">/ Var. Wind</span>
               <input
                  type="text"
                  value={observedData.windDirection || ""}
                  onChange={(e) =>
                     handleChange("windDirection", e.target.value)
                  }
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-16 bg-yellow-100 ml-auto"
               />
               <span className="text-red-600 font-bold w-6">
                  {getWindDirectionText(observedData.windDirection)}
               </span>
            </div>

            <InputRow
               label="Wind speed (ff)"
               value={observedData.windSpeed || ""}
               onChange={(v) => handleChange("windSpeed", v)}
               unit="Kts"
            />
            <InputRow
               label="QNT (fmfm)"
               value={observedData.qnt || ""}
               onChange={(v) => handleChange("qnt", v)}
               unit="Kts"
               highlighted
            />
            <InputRow
               label="Precipt. amount(RR)"
               value={observedData.precipAmount || ""}
               onChange={(v) => handleChange("precipAmount", v)}
               unit="mm"
            />
            <InputRow
               label="Solarimeter"
               value={observedData.solarimeter || ""}
               onChange={(v) => handleChange("solarimeter", v)}
               unit="W/m2"
            />

            {/* Cloud Amount */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold flex-1">Cloud amount (CL)</span>
               <select
                  value={observedData.cloudAmount || "4"}
                  onChange={(e) => handleChange("cloudAmount", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-30">
                  {[...Array(9)].map((_, i) => (
                     <option key={i} value={i}>
                        {i}
                     </option>
                  ))}
               </select>
               <span className="italic">Okts</span>
            </div>

            {/* Cloud Genus */}

            <div className="flex items-center gap-2">
               <span className="text-xs font-bold flex-1">Cloud genus</span>
               <select
                  value={observedData.cloudGenus || "stratocumulus"}
                  onChange={(e) => handleChange("cloudGenus", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-xs flex-1">
                  <option value="stratocumulus">stratocumulus</option>
                  <option value="cumulus">cumulus</option>
                  <option value="stratus">stratus</option>
                  <option value="nimbostratus">nimbostratus</option>
                  <option value="cumulonimbus">cumulonimbus</option>
                  <option value="altocumulus">altocumulus</option>
                  <option value="altostratus">altostratus</option>
                  <option value="cirrus">cirrus</option>
               </select>
               <span className="text-xs">Others</span>
            </div>

            {/* Weather */}
            <div className="flex items-center gap-1.5 text-xs">
               <span className="font-bold flex-1">Weather</span>
               <select
                  value={observedData.weather || "Low cloud"}
                  onChange={(e) => handleChange("weather", e.target.value)}
                  className="border border-gray-400 px-2 py-1 text-xs flex-1 bg-yellow-100">
                  <option value="Cloudy"> Cloudy</option>
                  <option value="Sky Clear">Sky Clear</option>
                  <option value="Low cloud">Low cloud</option>
                  <option value="Clear">Clear</option>
                  <option value="Moderate Rain">Moderate Rain</option>
                  <option value="SlightRain">Slight Rain</option>
                  <option value="Heavy Rain">Heavy Rain</option>
                  <option value="Drizzle">Drizzle</option>
                  <option value="Thunderstorm">Thunderstorm</option>
                  <option value="Fog">Fog</option>
                  <option value="Mist">Mist</option>
                  <option value="Haze">Haze</option>
               </select>
            </div>

            {/* RVR + Action Buttons Row */}
            <div className="flex items-center gap-1.5 text-xs pt-1">
               <span className="font-bold">RVR1</span>
               <input
                  type="text"
                  value={observedData.rvr1 || ""}
                  onChange={(e) => handleChange("rvr1", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-10"
               />
               <span className="font-bold">RVR2</span>
               <input
                  type="text"
                  value={observedData.rvr2 || ""}
                  onChange={(e) => handleChange("rvr2", e.target.value)}
                  className="border border-gray-400 px-1.5 py-0.5 text-xs w-10"
               />
               <button className="bg-red-500 text-white font-bold px-2 py-0.5 text-xs hover:bg-red-600 ml-auto">
                  Refresh
               </button>
               <div className="flex flex-col items-center gap-0.5">
                  <input
                     type="checkbox"
                     checked={observedData.encoded || false}
                     onChange={(e) => handleChange("encoded", e.target.checked)}
                     className="absolute top-0 right-0 w-3 h-3 "
                  />
                  <button className="bg-gray-400 border border-gray-500 px-2 py-0.5 text-xs hover:bg-gray-500">
                     Encode
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

// Reusable Input Row Component
const InputRow = ({ label, value, onChange, unit, highlighted = false }) => (
   <div className="flex items-center gap-2 text-sm">
      <span className="font-bold flex-1">{label}</span>
      <input
         type="text"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         className={`border border-gray-400 px-2 py-1 text-xs w-30 bg-white text-center ${
            highlighted ? "bg-yellow-100" : ""
         }`}
      />
      <span className="italic w-10">{unit}</span>
   </div>
);

export default ObservedValuesSection;
