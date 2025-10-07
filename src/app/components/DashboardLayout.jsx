"use client";

import ObservedValuesSection from "./ObservedValuesSection";
import DerivedValuesSection from "./DerivedValuesSection";
import TrendForecastSection from "./TrendForecastSection";
import ImagerySection from "./ImagerySection";

/**
 * DashboardLayout
 *
 * 4-column dashboard with fixed viewport heights matching original design.
 * Heights: Observed & Derived = 70vh, Trend & Imagery = 90vh
 */
const DashboardLayout = () => {
   return (
      <div className="flex gap-2 p-2 bg-gray-100 min-h-screen">
         {/* Observed Values  */}
         <div className="w-1/4 h-[68vh]">
            <ObservedValuesSection />
         </div>

         {/* Derived Values */}
         <div className="w-3/10 h-[68vh]">
            <DerivedValuesSection />
         </div>

         {/* Trend Forecast  */}
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
