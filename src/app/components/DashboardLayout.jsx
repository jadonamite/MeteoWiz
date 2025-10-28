"use client";

import ObservedValuesSection from "./ObservedValuesSection";
import DerivedValuesSection from "./DerivedValuesSection";
import TrendForecastSection from "./TrendForecastSection";
import ImagerySection from "./ImagerySection";
import SynopValuesSection from "./SynopValuesSection";
import MetarActionsBar from "./MetarActionsBar";

const DashboardLayout = () => {
   return (
      <div className="flex flex-col h-full">
         {/* Main Dashboard Grid */}
         <div className="flex-1 p-2 overflow-auto">
            {/* Desktop: 4-column layout | Mobile: Stacked */}
            <div className="flex flex-col lg:flex-row gap-2 h-full">
               
               {/* LEFT SECTION: Observed + Derived + SYNOP (50% width) */}
               <div className="flex flex-col lg:w-[50%] gap-2">
                  {/* Top Row: Observed and Derived */}
                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0" style={{ height: "68vh" }}>
                     {/* Observed Values - 20% of total (40% of this 50% container) */}
                     <div className="w-full sm:w-2/5 h-full overflow-auto">
                        <ObservedValuesSection />
                     </div>

                     {/* Derived Values - 30% of total (60% of this 50% container) */}
                     <div className="w-full sm:w-3/5 h-full overflow-auto">
                        <DerivedValuesSection />
                     </div>
                  </div>

                  {/* SYNOP Register - Spans full width */}
                  <div className="flex-shrink-0" style={{ height: "14vh" }}>
                     <SynopValuesSection />
                  </div>
               </div>

               {/* Trend Forecast - 35% width on desktop */}
               <div className="w-full lg:w-[35%] flex-shrink-0" style={{ height: "82vh" }}>
                  <TrendForecastSection />
               </div>

               {/* Imagery - 15% width on desktop */}
               <div className="w-full lg:w-[15%] flex-shrink-0" style={{ height: "82vh" }}>
                  <ImagerySection />
               </div>
            </div>
         </div>

         {/* Bottom Action Bar - Full width, fixed at bottom */}
         <div className="flex-shrink-0 border-t border-gray-300">
            <MetarActionsBar />
         </div>
      </div>
   );
};

export default DashboardLayout;