"use client";

import ObservedValuesSection from "./ObservedValuesSection";
import DerivedValuesSection from "./DerivedValuesSection";
import TrendForecastSection from "./TrendForecastSection";
import ImagerySection from "./ImagerySection";

/**
 * DashboardLayout
 *
 * Fixed-height dashboard layout using viewport units.
 * Ensures child sections respect their height percentages.
 */
const DashboardLayout = () => {
   return (
      <div className="flex gap-2 p-2 bg-gray-100 h-screen">
         {/* Observed Values (70% height) */}
         <div className="w-1/4 h-[70%] ">
            <ObservedValuesSection />
         </div>

         {/* Derived Values (70% height) */}
         <div className="w-3/10 h-[70%] ">
            <DerivedValuesSection />
         </div>

         {/* Trend Forecast (90% height) */}
         <div className="w-3/10 h-[90%] ">
            <TrendForecastSection />
         </div>

         {/* Imagery (90% height) */}
         <div className="w-1/5 h-[90%] ">
            <ImagerySection />
         </div>
      </div>
   );
};

export default DashboardLayout;
