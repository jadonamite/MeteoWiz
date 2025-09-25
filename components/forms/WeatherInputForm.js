import { useState } from "react";
import {
   calculateQNH,
   calculateMSLPressure,
} from "../../utils/weatherCalculations";

export default function WeatherInputForm({ observation, onChange }) {
   const [activeTab, setActiveTab] = useState("basic");

   const handleInputChange = (field, value) => {
      // Handle nested objects
      if (field.includes(".")) {
         const [parent, child] = field.split(".");
         onChange({gi
            [parent]: {
               ...observation[parent],
               [child]: value === "" ? null : parseFloat(value) || value,
            },
         });
      } else {
         onChange({
            [field]: value === "" ? null : parseFloat(value) || value,
         });
      }
   };

   // Auto-calculate pressure values
   const handlePressureChange = (type, value) => {
      const numValue = parseFloat(value) || null;
      const elevation = 91; // Asaba Airport elevation

      let updates = { [type]: numValue };

      if (type === "station" && numValue) {
         updates.msl = calculateMSLPressure(numValue, elevation);
         updates.qnh = calculateQNH(
            numValue,
            elevation,
            observation.dryBulbTemp || 27
         );
      }

      onChange({
         pressure: {
            ...observation.pressure,
            ...updates,
         },
      });
   };

   const tabs = [
      { id: "basic", label: "Basic Measurements", icon: "🌡️" },
      { id: "pressure", label: "Pressure & Wind", icon: "🌪️" },
      { id: "visibility", label: "Visibility & Weather", icon: "👁️" },
      { id: "clouds", label: "Cloud Observations", icon: "☁️" },
   ];

   return (
      <div className="space-y-6">
         {/* Tab Navigation */}
         <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
               {tabs.map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                           ? "border-blue-500 text-blue-600"
                           : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                     }`}>
                     <span>{tab.icon}</span>
                     <span>{tab.label}</span>
                  </button>
               ))}
            </nav>
         </div>

         {/* Basic Measurements Tab */}
         {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                     Temperature Measurements
                  </h3>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Dry Bulb Temperature (°C)
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.dryBulbTemp || ""}
                           onChange={(e) =>
                              handleInputChange("dryBulbTemp", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                           placeholder="e.g., 27.3"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Wet Bulb Temperature (°C)
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.wetBulbTemp || ""}
                           onChange={(e) =>
                              handleInputChange("wetBulbTemp", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                           placeholder="e.g., 24.7"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Dew Point (°C) - Auto-calculated
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.dewPoint || ""}
                           onChange={(e) =>
                              handleInputChange("dewPoint", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                           placeholder="Auto-calculated"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Relative Humidity (%) - Auto-calculated
                        </label>
                        <input
                           type="number"
                           value={observation.relativeHumidity || ""}
                           readOnly
                           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                           placeholder="Auto-calculated"
                        />
                     </div>
                  </div>
               </div>

               <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                     Derived Values
                  </h3>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Vapor Pressure (hPa)
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.vaporPressure || ""}
                           onChange={(e) =>
                              handleInputChange("vaporPressure", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Feel Temperature (°C)
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.feelTemperature || ""}
                           onChange={(e) =>
                              handleInputChange(
                                 "feelTemperature",
                                 e.target.value
                              )
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                     </div>
                  </div>
               </div>

               <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                     Station Information
                  </h3>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Station ID
                        </label>
                        <input
                           type="text"
                           value={observation.stationId || "DNAS"}
                           readOnly
                           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Observer Name
                        </label>
                        <input
                           type="text"
                           value={observation.observer || ""}
                           onChange={(e) =>
                              handleInputChange("observer", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                           placeholder="Observer initials/name"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Observation Time
                        </label>
                        <input
                           type="datetime-local"
                           value={
                              observation.timestamp
                                 ? new Date(observation.timestamp)
                                      .toISOString()
                                      .slice(0, 16)
                                 : ""
                           }
                           onChange={(e) =>
                              handleInputChange("timestamp", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Pressure & Wind Tab */}
         {activeTab === "pressure" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">
                     Pressure Measurements
                  </h3>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Station Pressure (hPa)
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.pressure?.station || ""}
                           onChange={(e) =>
                              handlePressureChange("station", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                           placeholder="e.g., 1006.3"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           MSL Pressure (hPa) - Auto-calculated
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.pressure?.msl || ""}
                           readOnly
                           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                           placeholder="Auto-calculated"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           QNH (hPa) - Auto-calculated
                        </label>
                        <input
                           type="number"
                           step="0.1"
                           value={observation.pressure?.qnh || ""}
                           readOnly
                           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                           placeholder="Auto-calculated"
                        />
                     </div>
                  </div>
               </div>

               <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-800 mb-4">
                     Wind Measurements
                  </h3>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Wind Direction (degrees)
                        </label>
                        <input
                           type="number"
                           min="0"
                           max="360"
                           value={observation.wind?.direction || ""}
                           onChange={(e) =>
                              handleInputChange(
                                 "wind.direction",
                                 e.target.value
                              )
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                           placeholder="e.g., 270"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Wind Speed (knots)
                        </label>
                        <input
                           type="number"
                           min="0"
                           value={observation.wind?.speed || ""}
                           onChange={(e) =>
                              handleInputChange("wind.speed", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                           placeholder="e.g., 8"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Wind Gust (knots)
                        </label>
                        <input
                           type="number"
                           min="0"
                           value={observation.wind?.gust || ""}
                           onChange={(e) =>
                              handleInputChange("wind.gust", e.target.value)
                           }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                           placeholder="Optional"
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Additional tabs would be implemented similarly */}
         {activeTab === "visibility" && (
            <div className="p-8 text-center text-gray-500">
               <h3 className="text-xl font-semibold mb-2">
                  Visibility & Weather Phenomena
               </h3>
               <p>
                  This section will include visibility measurements, present
                  weather, and weather phenomena selection.
               </p>
               <p className="text-sm mt-2">
                  🚧 Coming in the next development iteration
               </p>
            </div>
         )}

         {activeTab === "clouds" && (
            <div className="p-8 text-center text-gray-500">
               <h3 className="text-xl font-semibold mb-2">
                  Cloud Observations
               </h3>
               <p>
                  This section will include cloud layer entry, cloud types, and
                  heights.
               </p>
               <p className="text-sm mt-2">
                  🚧 Coming in the next development iteration
               </p>
            </div>
         )}
      </div>
   );
}
