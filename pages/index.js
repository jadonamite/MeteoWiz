// Main Computational Page - Weather Data Entry
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useWeather } from "../contexts/WeatherContext";
import WeatherInputForm from "../components/forms/WeatherInputForm";
import {
   calculateRelativeHumidity,
   calculateDewPoint,
   validateObservation,
} from "../utils/weatherCalculations";

export default function ComputationalPage() {
   const {
      currentObservation,
      updateCurrentObservation,
      saveObservation,
      resetCurrent,
      loading,
   } = useWeather();

   const [validationErrors, setValidationErrors] = useState([]);
   const [saveStatus, setSaveStatus] = useState(null);

   // Auto-calculate derived values when base measurements change
   useEffect(() => {
      const { dryBulbTemp, wetBulbTemp, pressure } = currentObservation;

      if (dryBulbTemp !== null && wetBulbTemp !== null && pressure?.station) {
         const rh = calculateRelativeHumidity(
            dryBulbTemp,
            wetBulbTemp,
            pressure.station
         );
         if (rh !== null) {
            updateCurrentObservation({ relativeHumidity: rh });

            // Calculate dew point from temp and RH
            const dewPoint = calculateDewPoint(dryBulbTemp, rh);
            if (dewPoint !== null) {
               updateCurrentObservation({ dewPoint });
            }
         }
      }
   }, [
      currentObservation.dryBulbTemp,
      currentObservation.wetBulbTemp,
      currentObservation.pressure?.station,
   ]);

   const handleSave = async () => {
      // Validate before saving
      const validation = validateObservation(currentObservation);
      setValidationErrors(validation.errors);

      if (!validation.isValid) {
         setSaveStatus("error");
         return;
      }

      try {
         await saveObservation(currentObservation);
         setSaveStatus("success");
         setTimeout(() => setSaveStatus(null), 3000);
      } catch (error) {
         setSaveStatus("error");
      }
   };

   const handleReset = () => {
      resetCurrent();
      setValidationErrors([]);
      setSaveStatus(null);
   };

   return (
      <Layout title="Computational Page - Weather Observation">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
               <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                     Weather Observation Entry
                  </h1>
                  <div className="flex space-x-3">
                     <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                        Reset Form
                     </button>
                     <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                        {loading ? "Saving..." : "Save Observation"}
                     </button>
                  </div>
               </div>

               {/* Status Messages */}
               {saveStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                     ✅ Observation saved successfully!
                  </div>
               )}

               {saveStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                     ❌ Failed to save observation. Please check the data and
                     try again.
                  </div>
               )}

               {validationErrors.length > 0 && (
                  <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
                     <h3 className="font-semibold mb-2">Validation Errors:</h3>
                     <ul className="list-disc list-inside">
                        {validationErrors.map((error, index) => (
                           <li key={index}>{error}</li>
                        ))}
                     </ul>
                  </div>
               )}

               {/* Main Form */}
               <WeatherInputForm
                  observation={currentObservation}
                  onChange={updateCurrentObservation}
               />
            </div>
         </div>
      </Layout>
   );
}
