"use client";

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; // ADD THIS IMPORT
import { defaultStationConfig, systemConfig } from '../config/stations';
import {
  SystemInfoBar,
  StationLogo,
  AgencyTitle,
  StatusComponent,
  NavigationValues,
  StationID,
  DateTimeDisplay
} from './NavbarParts';

const MeteorologicalNavbar = ({ 
  serverTime,
  stationConfig = defaultStationConfig,
  systemConfig: sysConfig = systemConfig,
  isOnline = true,
  onLogout = () => console.log('Logout clicked'),
  onClose = () => console.log('Close clicked'),
  onMenuClick // NEW PROP for hamburger menu
}) => {
  const [time, setTime] = useState(new Date(serverTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
     <div className="w-full bg-gray-200">
        {/* Top Row - System Info */}
        <SystemInfoBar config={sysConfig} onClose={onClose} />

        {/* Main Header Row */}
        <div className="flex items-center justify-between px-3 py-1 bg-gray-200">
           {/* Left Section - Logo and Station WITH HAMBURGER */}
           <div className="flex-1 flex items-center gap-2">
              {/* Hamburger Menu - Only visible on mobile */}
              {onMenuClick && (
                <button
                  onClick={onMenuClick}
                  className="lg:hidden p-2 hover:bg-gray-300 rounded"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
              )}
              <StationLogo stationName={stationConfig.name} />
           </div>

           {/* Center Section - Agency Title */}
           <div className="flex-[4] text-center font-serif">
              <AgencyTitle agency={stationConfig.agency} />
           </div>

           {/* Right Section - Status */}
           <div className="flex-1 text-right">
              <StatusComponent isOnline={isOnline} onLogout={onLogout} />
           </div>
        </div>

        {/* Bottom Row - Navigation Values, Station ID, Date/Time */}
        <div className="flex items-center justify-between px-3 py-1 bg-gray-200">
           {/* Left Section - Navigation Values */}
           <NavigationValues station={stationConfig} />

           {/* Center Section - Station ID */}
           <StationID id={stationConfig.id} network={stationConfig.network} />
           <AgencyTitle airport={stationConfig.airport} />

           {/* Right Section - Date and Time */}
           <DateTimeDisplay time={time} />
        </div>
     </div>
  );
};

export default MeteorologicalNavbar;
