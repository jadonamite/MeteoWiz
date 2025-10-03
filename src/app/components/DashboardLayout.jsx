"use client";

import ObservedValuesSection from './ObservedValuesSection';
import DerivedValuesSection from './DerivedValuesSection';
import TrendForecastSection from './TrendForecastSection';
import ImagerySection from './ImagerySection';

const DashboardLayout = () => {
  return (
     <div className="flex gap-2 p-2 bg-gray-100 min-h-screen">
        {/* Left Column - Observed Values */}
        <div className="w-1/4">
           <ObservedValuesSection />
        </div>
        {/* Center Column - Derived Values */}
        <div className="w-2/5">
           <DerivedValuesSection />
        </div>
        {/* Right Column - Trend Forecast & Imagery */}
        <div className="w-1/3 flex flex-col gap-2">
           <TrendForecastSection />
        </div>{" "}
        <div className="w-2/5">
           <ImagerySection />
        </div>
     </div>
  );
};

export default DashboardLayout;