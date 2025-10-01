// METAR/SPECI Page - Aviation Weather Format
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useWeather } from "../contexts/WeatherContext";
import { formatMETAR, validateMETAR } from "../utils/metarFormatter";
import { format } from "date-fns";

export default function MetarSpeci() {
   const { observations, loadObservations } = useWeather();
   const [selectedObservation, setSelectedObservation] = useState(null);
   const [metarText, setMetarText] = useState("");
   const [messageType, setMessageType] = useState("METAR");
   const [validationResult, setValidationResult] = useState({
      isValid: true,
      errors: [],
   });

   useEffect(() => {
      loadObservations();
   }, []);

   useEffect(() => {
      if (selectedObservation) {
         const generatedMETAR = formatMETAR(selectedObservation, messageType);
         setMetarText(generatedMETAR);

         const validation = validateMETAR(generatedMETAR);
         setValidationResult(validation);
      }
   }, [selectedObservation, messageType]);

   const handleObservationSelect = (observationId) => {
      const observation = observations.find((obs) => obs.id === observationId);
      setSelectedObservation(observation);
   };

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(metarText);
         alert("METAR copied to clipboard!");
      } catch (err) {
         console.error("Failed to copy to clipboard:", err);
      }
   };

   const exportMETAR = () => {
      const element = document.createElement("a");
      const file = new Blob([metarText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${messageType}_${
         selectedObservation?.stationId || "DNAS"
      }_${format(new Date(), "yyyyMMdd_HHmm")}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
   };

   return (
      <Layout title="METAR & SPECI - Aviation Weather">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
               <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                     METAR & SPECI Generator
                  </h1>
                  <div className="flex items-center space-x-4">
                     <select
                        value={messageType}
                        onChange={(e) => setMessageType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md">
                        <option value="METAR">METAR</option>
                        <option value="SPECI">SPECI</option>
                     </select>
                     {selectedObservation && (
                        <>
                           <button
                              onClick={copyToClipboard}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                              Copy METAR
                           </button>
                           <button
                              onClick={exportMETAR}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                              Export
                           </button>
                        </>
                     )}
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Observation Selection Panel */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-semibold text-gray-800">
                        Select Observation
                     </h2>

                     <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                        {observations.length === 0 ? (
                           <p className="text-gray-500 text-center py-8">
                              No observations available. Create an observation
                              first.
                           </p>
                        ) : (
                           <div className="space-y-2">
                              {observations.slice(0, 20).map((observation) => (
                                 <div
                                    key={
                                       observation.id || observation.timestamp
                                    }
                                    onClick={() =>
                                       handleObservationSelect(
                                          observation.id ||
                                             observation.timestamp
                                       )
                                    }
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                       selectedObservation?.id ===
                                       observation.id
                                          ? "border-blue-500 bg-blue-50"
                                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                                    }`}>
                                    <div className="flex justify-between items-center">
                                       <div className="text-sm font-medium">
                                          {format(
                                             new Date(observation.timestamp),
                                             "dd/MM/yyyy HH:mm"
                                          )}{" "}
                                          UTC
                                       </div>
                                       <div className="text-xs text-gray-500">
                                          {observation.observer || "Unknown"}
                                       </div>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                       Temp: {observation.dryBulbTemp}°C |
                                       Press: {observation.pressure?.station}{" "}
                                       hPa | Wind: {observation.wind?.direction}
                                       °/{observation.wind?.speed}kt
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>

                  {/* METAR Output Panel */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-semibold text-gray-800">
                        Generated {messageType}
                     </h2>

                     {selectedObservation ? (
                        <>
                           {/* Validation Status */}
                           {!validationResult.isValid && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                 <h3 className="text-sm font-medium text-red-800 mb-2">
                                    Validation Warnings:
                                 </h3>
                                 <ul className="text-xs text-red-600 space-y-1">
                                    {validationResult.errors.map(
                                       (error, index) => (
                                          <li key={index}>• {error}</li>
                                       )
                                    )}
                                 </ul>
                              </div>
                           )}

                           {/* METAR Display */}
                           <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-lg">
                              <div className="break-all">{metarText}</div>
                           </div>

                           {/* METAR Breakdown */}
                           <div className="bg-blue-50 rounded-lg p-4">
                              <h3 className="font-semibold text-blue-800 mb-3">
                                 Message Breakdown:
                              </h3>
                              <div className="space-y-2 text-sm">
                                 {metarText.split(" ").map((part, index) => (
                                    <div key={index} className="flex">
                                       <span className="w-20 font-mono bg-blue-100 px-2 py-1 rounded mr-2">
                                          {part}
                                       </span>
                                       <span className="text-blue-700">
                                          {getPartDescription(part, index)}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Raw Observation Data */}
                           <div className="bg-gray-50 rounded-lg p-4">
                              <h3 className="font-semibold text-gray-800 mb-3">
                                 Source Observation Data:
                              </h3>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                 <div>
                                    <strong>Time:</strong>{" "}
                                    {format(
                                       new Date(selectedObservation.timestamp),
                                       "dd/MM/yyyy HH:mm"
                                    )}{" "}
                                    UTC
                                 </div>
                                 <div>
                                    <strong>Observer:</strong>{" "}
                                    {selectedObservation.observer || "N/A"}
                                 </div>
                                 <div>
                                    <strong>Temperature:</strong>{" "}
                                    {selectedObservation.dryBulbTemp}°C /{" "}
                                    {selectedObservation.dewPoint}°C
                                 </div>
                                 <div>
                                    <strong>Pressure:</strong>{" "}
                                    {selectedObservation.pressure?.qnh} hPa
                                 </div>
                                 <div>
                                    <strong>Wind:</strong>{" "}
                                    {selectedObservation.wind?.direction}° at{" "}
                                    {selectedObservation.wind?.speed} kt
                                 </div>
                                 <div>
                                    <strong>Visibility:</strong>{" "}
                                    {selectedObservation.visibility || "N/A"} km
                                 </div>
                              </div>
                           </div>
                        </>
                     ) : (
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                           <div className="text-4xl mb-4">✈️</div>
                           <h3 className="text-lg font-semibold text-gray-600 mb-2">
                              Select an Observation
                           </h3>
                           <p className="text-gray-500">
                              Choose an observation from the list to generate
                              METAR/SPECI message
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {/* METAR Reference Guide */}
               <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                     METAR Format Reference
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                     <div>
                        <h3 className="font-semibold text-yellow-700 mb-2">
                           Wind
                        </h3>
                        <ul className="space-y-1 text-yellow-600">
                           <li>
                              <code>27008KT</code> - 270° at 8 knots
                           </li>
                           <li>
                              <code>VRB03KT</code> - Variable at 3 knots
                           </li>
                           <li>
                              <code>27015G22KT</code> - 270° at 15 gusting 22
                           </li>
                        </ul>
                     </div>
                     <div>
                        <h3 className="font-semibold text-yellow-700 mb-2">
                           Visibility
                        </h3>
                        <ul className="space-y-1 text-yellow-600">
                           <li>
                              <code>9999</code> - 10 km or more
                           </li>
                           <li>
                              <code>8000</code> - 8 kilometers
                           </li>
                           <li>
                              <code>1200</code> - 1.2 kilometers
                           </li>
                        </ul>
                     </div>
                     <div>
                        <h3 className="font-semibold text-yellow-700 mb-2">
                           Temperature
                        </h3>
                        <ul className="space-y-1 text-yellow-600">
                           <li>
                              <code>27/24</code> - 27°C / 24°C dew point
                           </li>
                           <li>
                              <code>M05/M08</code> - -5°C / -8°C dew point
                           </li>
                           <li>
                              <code>15/XX</code> - 15°C / dew point N/A
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}

// Helper function to describe METAR parts
function getPartDescription(part, index) {
   if (index === 0) return "Message type";
   if (index === 1) return "Station identifier";
   if (index === 2 && /^\d{6}Z$/.test(part)) return "Date/time (DDHHMM UTC)";
   if (/^\d{5}(G\d{2})?KT$/.test(part) || /^VRB\d{2}KT$/.test(part))
      return "Wind direction and speed";
   if (/^\d{4}$/.test(part) && part !== "9999") return "Visibility in meters";
   if (part === "9999") return "Visibility 10km or more";
   if (/^[M]?\d{2}\/[M]?\d{2}$/.test(part)) return "Temperature/Dew point";
   if (/^Q\d{4}$/.test(part)) return "Altimeter setting (QNH)";
   if (/^(FEW|SCT|BKN|OVC)\d{3}(CB|TCU)?$/.test(part)) return "Cloud layer";
   if (part === "SKC") return "Sky clear";
   return "Weather element";
}
