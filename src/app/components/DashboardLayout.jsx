"use client";

import ObservedValuesSection from "./ObservedValuesSection";
import DerivedValuesSection from "./DerivedValuesSection";
import TrendForecastSection from "./TrendForecastSection";
import ImagerySection from "./ImagerySection";
import SynopValuesSection from "./SynopValuesSection";
import MetarActionsBar from "./MetarActionsBar";

/**
 * DashboardLayout - Responsive 4-column grid
 * 
 * Desktop Layout (23% + 27% + 35% + 15% = 100%):
 * ┌─────────┬──────────┬──────────────┬────────┐
 * │ Observed│ Derived  │ Trend        │ Imagery│
 * │  (23%)  │  (27%)   │ Forecast     │ (15%)  │
 * │         │          │  (35%)       │        │
 * ├─────────┴──────────┤              │        │
 * │ SYNOP (50%)        │              │        │
 * └────────────────────┴──────────────┴────────┘
 * 
 * Gap size: 0.5rem (gap-2)
 * Total gaps: 3 (between 4 columns) = 1.5rem
 */
const DashboardLayout = () => {
   // Gap size constant for calc() - Tailwind gap-2 = 0.5rem
   const gapSize = '0.5rem';
   
   return (
      <div className="flex flex-col h-full">
         {/* Main Dashboard Grid */}
         <div className="flex-1 p-2 overflow-auto">
            {/* Desktop: 4-column layout | Mobile: Stacked */}
            <div className="flex flex-col lg:flex-row gap-2 h-full">
               
               {/* LEFT SECTION: Observed + Derived + SYNOP */}
               {/* Width: 23% + 27% + gap = calc(50% - 0.5rem) */}
               <div 
                  className="flex flex-col gap-2"
                  style={{ width: `calc(50% - ${gapSize})` }}
               >
                  {/* Top Row: Observed and Derived */}
                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0" style={{ height: "68vh" }}>
                     {/* Observed Values - 23% of total width */}
                     {/* = 23% / 50% = 46% of this container, minus half gap */}
                     <div 
                        className="w-full h-full overflow-auto"
                        style={{ width: `calc(46% - ${gapSize} / 2)` }}
                     >
                        <ObservedValuesSection />
                     </div>

                     {/* Derived Values - 27% of total width */}
                     {/* = 27% / 50% = 54% of this container, minus half gap */}
                     <div 
                        className="w-full h-full overflow-auto"
                        style={{ width: `calc(54% - ${gapSize} / 2)` }}
                     >
                        <DerivedValuesSection />
                     </div>
                  </div>

                  {/* SYNOP Register - Spans full width of Observed+Derived */}
                  <div className="flex-shrink-0" style={{ height: "12vh" }}>
                     <SynopValuesSection />
                  </div>
               </div>

               {/* Trend Forecast - 35% width, accounting for gaps */}
               <div 
                  className="w-full flex-shrink-0" 
                  style={{ 
                     width: `calc(33% - ${gapSize})`,
                     height: "78vh" 
                  }}
               >
                  <TrendForecastSection />
               </div>

               {/* Imagery - 15% width, accounting for gaps */}
               <div 
                  className="w-full flex-shrink-0" 
                  style={{ 
                     width: `calc(17% - ${gapSize})`,
                     height: "78vh" 
                  }}
               >
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