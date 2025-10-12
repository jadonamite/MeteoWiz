// src/app/components/MetarActionsBar.jsx
"use client";

import { useMetar } from "../context/MetarContext";

/**
 * MetarActionsBar
 *
 * Bottom action bar spanning full width with colorful action buttons
 * and live METAR code display generated from all dashboard data.
 */
const MetarActionsBar = () => {
   const { metarCode } = useMetar();

   // Action handlers
   const handleMarineData = () => {
      console.log("Marine data export initiated");
      // TODO: Export marine-specific meteorological data
   };

   const handleLiveMet = () => {
      console.log("Live met data refresh");
      // TODO: Fetch latest meteorological observations
   };

   const handlePrintReport = () => {
      console.log("Printing MET report");
      window.print();
      // TODO: Generate formatted MET report for printing
   };

   const handleSend = () => {
      console.log("Sending METAR:", metarCode);
      // TODO: Send METAR to designated recipients/systems
   };

   const handleSaveAll = () => {
      console.log("Saving all data");
      // TODO: Persist all meteorological data to database
   };

   return (
      <div className="w-full bg-white border-t-2 border-gray-300 shadow-md">
         <div className="flex items-center justify-center gap-8  px-4 py-3">
            {/* Action Buttons Group */}
            <div className="flex gap-2">
               <ActionButton
                  onClick={handleMarineData}
                  className="bg-blue-600 hover:bg-blue-700"
                  label="Marine data"
               />
               <ActionButton
                  onClick={handleLiveMet}
                  className="bg-green-500 hover:bg-green-600"
                  label="Live met"
               />
               <ActionButton
                  onClick={handlePrintReport}
                  className="bg-red-600 hover:bg-red-700"
                  label="Print Report"
               />
               <ActionButton
                  onClick={handleSend}
                  className="bg-orange-500 hover:bg-orange-600"
                  label="Send"
               />
               <ActionButton
                  onClick={handleSaveAll}
                  className="bg-red-800 hover:bg-red-900"
                  label="Save all"
               />
            </div>

            {/* METAR Code Display */}
            <div className=" flex ">
               <div className="bg-yellow-50 border-2 border-yellow-400 rounded px-6 py-2 shadow-sm">
                  <code className="text-sm font-mono font-semibold text-gray-900 tracking-wide">
                     {metarCode}
                  </code>
               </div>
            </div>
         </div>
      </div>
   );
};

/**
 * Reusable Action Button Component
 */
const ActionButton = ({ onClick, className, label }) => (
   <button
      onClick={onClick}
      className={`px-3 py-2 text-white  rounded shadow-md 
                transition-all duration-200 hover:shadow-lg active:scale-95 
                ${className}`}
      aria-label={label}>
      {label}
   </button>
);

export default MetarActionsBar;
