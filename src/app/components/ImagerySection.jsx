"use client";

import { useState } from 'react';

const ImagerySection = () => {
  // State for weather imagery data
  const [imageryData, setImageryData] = useState({
    displayType: 'GRAPHICAL DISPLAY',
    currentTemp: '27',
    condition: 'Low cloud',
    cityName: 'Asaba',
    forecast: [
      { day: 'Tu', icon: '🌧️', temp: '27°C' },
      { day: 'We', icon: '🌧️', temp: '27°C' },
      { day: 'Th', icon: '🌧️', temp: '27°C' },
      { day: 'Fr', icon: '🌧️', temp: '27°C' },
      { day: 'Sa', icon: '🌧️', temp: '27°C' },
      { day: 'Su', icon: '🌧️', temp: '27°C' },
      { day: 'Mo', icon: '🌧️', temp: '27°C' }
    ],
    nowcastType: '[AT]',
    nosigStatus: 'NOSIG'
  });

  return (
     <div>
        <div className="bg-gray-300 border-2 border-gray-400 rounded">
           {/* Header */}
           <div className="bg-gray-300 border-b-2 border-gray-400 px-3 py-1.5">
              <h2 className="font-bold text-sm">IMAGERY</h2>
           </div>

           {/* Content */}
           <div className="p-3 space-y-3">
              {/* Display Type Selector */}
              <div className="flex items-center justify-center gap-2 bg-teal-500 py-2 rounded">
                 <span className="text-white font-bold text-xs">
                    {imageryData.displayType}
                 </span>
              </div>

              {/* Weather Widget Display */}
              <div className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg p-4 text-white">
                 {/* Current Day Display */}
                 <div className="text-center mb-4">
                    <div className="text-xs mb-1">Wednesday</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                       <span className="text-5xl">🌧️</span>
                       <div className="text-right">
                          <div className="text-4xl font-bold">
                             {imageryData.currentTemp}°C
                          </div>
                          <div className="text-xs">{imageryData.condition}</div>
                       </div>
                    </div>
                 </div>

                 {/* 7-Day Forecast Grid */}
                 <div className="grid grid-cols-7 gap-1 text-center">
                    {imageryData.forecast.map((day, index) => (
                       <ForecastDay
                          key={index}
                          day={day.day}
                          icon={day.icon}
                          temp={day.temp}
                       />
                    ))}
                 </div>
              </div>

              {/* City Display */}
           </div>
        </div>
        <div className="bg-gray-300 border-2 border-gray-400 rounded">
           {/* Content */}
           <div className="p-3 space-y-3">
              {/* Display Type Selector */}
              <div className="flex items-center justify-center gap-2 bg-teal-500 py-2 rounded">
                 <span className="text-white font-bold text-xs">
                    {imageryData.displayType}
                 </span>
              </div>

              {/* City Display */}
              <div className="bg-gradient-to-b from-blue-900 to-black rounded-lg p-4 text-white relative">
                 <div className="absolute top-2 right-2">
                    <span className="text-xs bg-blue-700 px-2 py-1 rounded">
                       Nowcast [weather]
                    </span>
                 </div>

                 <div className="flex items-center justify-between mt-6">
                    <div>
                       <div className="text-xs mb-1">City</div>
                       <div className="text-2xl font-bold">
                          {imageryData.cityName}
                       </div>
                    </div>
                    <div className="text-4xl font-bold">
                       {imageryData.currentTemp}°C
                    </div>
                 </div>

                 {/* Mini Forecast Icons */}
                 <div className="flex gap-2 mt-4">
                    <MiniWeatherIcon day="Tuesday" icon="🌧️" temp="27°C" />
                    <MiniWeatherIcon day="Wednesday" icon="🌧️" temp="27°C" />
                    <MiniWeatherIcon day="Thursday" icon="☁️" temp="27°C" />
                    <MiniWeatherIcon day="Friday" icon="☁️" temp="27°C" />
                    <MiniWeatherIcon day="Saturday" icon="☁️" temp="27°C" />
                    <MiniWeatherIcon day="Sunday" icon="☁️" temp="27°C" />
                 </div>
              </div>

              {/* NOWCAST Label */}
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold">
                    NOWCAST {imageryData.nowcastType}
                 </span>
                 <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded">
                    {imageryData.nosigStatus}
                 </span>
              </div>
           </div>
        </div>
     </div>
  );
};

// Reusable Forecast Day Component (for 7-day grid)
const ForecastDay = ({ day, icon, temp }) => (
  <div className="bg-blue-500 bg-opacity-50 rounded p-1">
    <div className="text-xs font-bold mb-1">{day}</div>
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-xs">{temp}</div>
  </div>
);

// Reusable Mini Weather Icon Component (for bottom section)
const MiniWeatherIcon = ({ day, icon, temp }) => (
  <div className="text-center flex-1">
    <div className="text-xs mb-1">{icon}</div>
    <div className="text-xs">{temp}</div>
  </div>
);

export default ImagerySection