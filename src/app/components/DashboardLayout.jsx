"use client";

import ObservedValuesSection from "./ObservedValuesSection";
import DerivedValuesSection from "./DerivedValuesSection";
import TrendForecastSection from "./TrendForecastSection";
import ImagerySection from "./ImagerySection";
import SynopValuesSection from "./SynopValuesSection";

/**
 * DashboardLayout
 *
 * 4-column dashboard with fixed viewport heights matching original design.
 * Heights: Observed & Derived = 68vh, Trend & Imagery = 82vh
 * SYNOP fills remaining space (68vh to 82vh) beneath Observed & Derived
 */
const DashboardLayout = () => {
   return (
      <div className="flex gap-2 p-2 bg-gray-100 min-h-screen">
         {/* Left Section - Observed, Derived, and SYNOP stacked */}
         <div
            className="flex flex-col "
            style={{ width: "calc(25% + 30% + 0.5rem)" }}>
            {/* Top Row - Observed and Derived side by side */}
            <div className="flex gap-2 h-[68vh]">
               {/* Observed Values */}
               <div style={{ width: "calc(30% / (25% + 30%) * 100%)" }}>
                  <ObservedValuesSection />
               </div>

               {/* Derived Values */}
               <div style={{ width: "calc(30% / (25% + 30%) * 100%)" }}>
                  <DerivedValuesSection />
               </div>
            </div>

            {/* SYNOP Register - Spans full width, fills remaining height to 82vh */}
            <div className="h-[14vh]">
               <SynopValuesSection />
            </div>
         </div>

         {/* Trend Forecast */}
         <div className="w-3/10 h-[82vh]">
            <TrendForecastSection />
         </div>

         {/* Imagery */}
         <div className="w-1/5 h-[82vh]">
            <ImagerySection />
         </div>
      </div>
   );
};

export default DashboardLayout;