"use client";

import ObservedValuesSection from "./ObservedValuesSection";
import DerivedValuesSection from "./DerivedValuesSection";
import TrendForecastSection from "./TrendForecastSection";
import ImagerySection from "./ImagerySection";
import SynopValuesSection from "./SynopValuesSection";
import MetarActionsBar from "./MetarActionsBar";

/**
 * DashboardLayout
 *
 * Complete meteorological dashboard with 4-column grid layout and bottom action bar.
 * Layout structure:
 * - Top: Observed (25%) | Derived (30%) | Trend (30%) | Imagery (15%)
 * - Middle: SYNOP section spanning Observed+Derived columns
 * - Bottom: MetarActionsBar spanning full width with METAR code display
 */
const DashboardLayout = () => {
   return (
      <div className="flex flex-col min-h-[80%] bg-gray-100">
         {/* Main Dashboard Grid */}
         <div className="flex gap-2 p-2 flex-1">
            {/* Left Section - Observed, Derived, and SYNOP stacked */}
            <div
               className="flex flex-col"
               style={{ width: "calc(25% + 30% + 0.5rem)" }}>
               {/* Top Row - Observed and Derived side by side */}
               <div className="flex gap-2 h-[68vh]">
                  {/* Observed Values - 25% of total width */}
                  <div style={{ width: "calc(25% / (25% + 30%) * 100%)" }}>
                     <ObservedValuesSection />
                  </div>

                  {/* Derived Values - 30% of total width */}
                  <div style={{ width: "calc(30% / (25% + 30%) * 100%)" }}>
                     <DerivedValuesSection />
                  </div>
               </div>

               {/* SYNOP Register - Spans full width of Observed+Derived, fills gap to 82vh */}
               <div className="h-[14vh] mt-2">
                  <SynopValuesSection />
               </div>
            </div>

            {/* Trend Forecast - 30% width, 82vh height */}
            <div className="w-3/10 h-[82vh]">
               <TrendForecastSection />
            </div>

            {/* Imagery - 15% width, 82vh height */}
            <div className="w-1/5 h-[82vh]">
               <ImagerySection />
            </div>
         </div>

         {/* Bottom Action Bar - Full width, fixed at bottom */}
         <div className="mt-auto  flex justify-center align-center">
            <MetarActionsBar />
         </div>
      </div>
   );
};

export default DashboardLayout;
