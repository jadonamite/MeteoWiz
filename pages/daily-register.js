// Daily Register Page - Yellow Report Sheet Format
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useWeather } from "../contexts/WeatherContext";
import { format, startOfDay, endOfDay } from "date-fns";

export default function DailyRegister() {
   const { observations, loadObservations } = useWeather();
   const [selectedDate, setSelectedDate] = useState(
      format(new Date(), "yyyy-MM-dd")
   );
   const [filteredObservations, setFilteredObservations] = useState([]);

   useEffect(() => {
      loadObservations();
   }, []);

   useEffect(() => {
      // Filter observations for selected date
      const dateStart = startOfDay(new Date(selectedDate));
      const dateEnd = endOfDay(new Date(selectedDate));

      const dayObservations = observations.filter((obs) => {
         const obsDate = new Date(obs.timestamp);
         return obsDate >= dateStart && obsDate <= dateEnd;
      });

      setFilteredObservations(
         dayObservations.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
         )
      );
   }, [observations, selectedDate]);

   const exportToPDF = () => {
      // TODO: Implement PDF export functionality
      console.log("Exporting daily register to PDF...");
   };

   const printRegister = () => {
      window.print();
   };

   return (
      <Layout title="Daily Register - Weather Log">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
               <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                     Daily Weather Register
                  </h1>
                  <div className="flex items-center space-x-4">
                     <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                     />
                     <button
                        onClick={exportToPDF}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Export PDF
                     </button>
                     <button
                        onClick={printRegister}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Print
                     </button>
                  </div>
               </div>

               {/* Station Header */}
               <div className="bg-yellow-50 border-2 border-yellow-300 p-4 mb-6 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                     <div>
                        <strong>Station:</strong>{" "}
                        {process.env.NEXT_PUBLIC_STATION_NAME}
                     </div>
                     <div>
                        <strong>Station ID:</strong>{" "}
                        {process.env.NEXT_PUBLIC_STATION_ID}
                     </div>
                     <div>
                        <strong>Date:</strong>{" "}
                        {format(new Date(selectedDate), "dd/MM/yyyy")}
                     </div>
                  </div>
               </div>

               {/* Daily Register Table */}
               <div className="overflow-x-auto">
                  <table className="w-full border-collapse border-2 border-yellow-400">
                     <thead className="bg-yellow-200">
                        <tr>
                           <th
                              rowSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Time (UTC)
                           </th>
                           <th
                              colSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Temperature (°C)
                           </th>
                           <th
                              rowSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              RH (%)
                           </th>
                           <th
                              colSpan={3}
                              className="border border-yellow-400 p-2 text-xs">
                              Pressure (hPa)
                           </th>
                           <th
                              colSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Wind
                           </th>
                           <th
                              rowSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Vis (km)
                           </th>
                           <th
                              rowSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Weather
                           </th>
                           <th
                              rowSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Clouds
                           </th>
                           <th
                              rowSpan={2}
                              className="border border-yellow-400 p-2 text-xs">
                              Observer
                           </th>
                        </tr>
                        <tr>
                           <th className="border border-yellow-400 p-1 text-xs">
                              Dry
                           </th>
                           <th className="border border-yellow-400 p-1 text-xs">
                              Wet
                           </th>
                           <th className="border border-yellow-400 p-1 text-xs">
                              Stn
                           </th>
                           <th className="border border-yellow-400 p-1 text-xs">
                              MSL
                           </th>
                           <th className="border border-yellow-400 p-1 text-xs">
                              QNH
                           </th>
                           <th className="border border-yellow-400 p-1 text-xs">
                              Dir
                           </th>
                           <th className="border border-yellow-400 p-1 text-xs">
                              Spd
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {/* Generate 24-hour time slots */}
                        {Array.from({ length: 24 }, (_, hour) => {
                           const timeSlot =
                              hour.toString().padStart(2, "0") + ":00";
                           const observation = filteredObservations.find(
                              (obs) => {
                                 const obsHour = new Date(
                                    obs.timestamp
                                 ).getUTCHours();
                                 return obsHour === hour;
                              }
                           );

                           return (
                              <tr
                                 key={hour}
                                 className={
                                    hour % 2 === 0 ? "bg-yellow-50" : "bg-white"
                                 }>
                                 <td className="border border-yellow-400 p-1 text-xs font-mono">
                                    {timeSlot}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.dryBulbTemp?.toFixed(1) || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.wetBulbTemp?.toFixed(1) || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.relativeHumidity || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.pressure?.station?.toFixed(
                                       1
                                    ) || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.pressure?.msl?.toFixed(1) ||
                                       ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.pressure?.qnh?.toFixed(1) ||
                                       ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.wind?.direction || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.wind?.speed || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.visibility || ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {/* Weather phenomena - abbreviated */}
                                    {observation?.weather?.present?.length > 0
                                       ? "WX"
                                       : ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {/* Cloud coverage - abbreviated */}
                                    {observation?.clouds?.length > 0
                                       ? "CLD"
                                       : ""}
                                 </td>
                                 <td className="border border-yellow-400 p-1 text-xs text-center">
                                    {observation?.observer || ""}
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>

               {/* Summary Statistics */}
               <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                     <h3 className="font-semibold text-blue-800 mb-2">
                        Temperature
                     </h3>
                     <div className="text-sm space-y-1">
                        <div>
                           Max:{" "}
                           {Math.max(
                              ...filteredObservations.map(
                                 (o) => o.dryBulbTemp || -999
                              )
                           ).toFixed(1)}
                           °C
                        </div>
                        <div>
                           Min:{" "}
                           {Math.min(
                              ...filteredObservations.map(
                                 (o) => o.dryBulbTemp || 999
                              )
                           ).toFixed(1)}
                           °C
                        </div>
                        <div>
                           Avg:{" "}
                           {(
                              filteredObservations.reduce(
                                 (sum, o) => sum + (o.dryBulbTemp || 0),
                                 0
                              ) / Math.max(filteredObservations.length, 1)
                           ).toFixed(1)}
                           °C
                        </div>
                     </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                     <h3 className="font-semibold text-green-800 mb-2">
                        Pressure
                     </h3>
                     <div className="text-sm space-y-1">
                        <div>
                           Max:{" "}
                           {Math.max(
                              ...filteredObservations.map(
                                 (o) => o.pressure?.station || -999
                              )
                           ).toFixed(1)}{" "}
                           hPa
                        </div>
                        <div>
                           Min:{" "}
                           {Math.min(
                              ...filteredObservations.map(
                                 (o) => o.pressure?.station || 9999
                              )
                           ).toFixed(1)}{" "}
                           hPa
                        </div>
                        <div>
                           Trend: {/* TODO: Calculate pressure trend */} Stable
                        </div>
                     </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                     <h3 className="font-semibold text-purple-800 mb-2">
                        Wind
                     </h3>
                     <div className="text-sm space-y-1">
                        <div>
                           Max Speed:{" "}
                           {Math.max(
                              ...filteredObservations.map(
                                 (o) => o.wind?.speed || 0
                              )
                           )}{" "}
                           kt
                        </div>
                        <div>
                           Prev Dir:{" "}
                           {/* TODO: Calculate prevailing direction */} Variable
                        </div>
                        <div>
                           Calm:{" "}
                           {
                              filteredObservations.filter(
                                 (o) => (o.wind?.speed || 0) < 1
                              ).length
                           }
                           h
                        </div>
                     </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                     <h3 className="font-semibold text-yellow-800 mb-2">
                        Observations
                     </h3>
                     <div className="text-sm space-y-1">
                        <div>Total: {filteredObservations.length}</div>
                        <div>
                           Complete:{" "}
                           {
                              filteredObservations.filter(
                                 (o) => o.dryBulbTemp && o.pressure?.station
                              ).length
                           }
                        </div>
                        <div>Missing: {24 - filteredObservations.length}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
}
