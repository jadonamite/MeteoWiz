import { formatDate } from '../hooks/useTime';
import { GMTDigitalClock } from "./DigitalClock";

// System Information Bar Component
export const SystemInfoBar = ({ config, onClose, className = "" }) => {
   return (
      <div
         className={`flex items-center justify-between px-2 py-0.5 bg-gray-300 text-xs text-black ${className}`}>
         <div>
            {config.version}&nbsp;&nbsp;&nbsp;&nbsp;POWERED BY{" "}
            {config.poweredBy}&nbsp;&nbsp;&nbsp;&nbsp;{config.website}
         </div>
         <button
            onClick={onClose}
            className="text-black hover:text-gray-600 text-lg font-bold px-2">
            ×
         </button>
      </div>
   );
};

// Station Logo Component
export const StationLogo = ({ stationName, className = "" }) => {
   return (
      <div className={`flex items-center ${className}`}>
         <div className="w-10 h-8 mr-3 relative">
            <span className="text-5xl">🌤️</span>
         </div>
         <span className="text-black font-serif font-bold italic text-4xl">
            Station:{stationName}
         </span>
      </div>
   );
};

// Agency Title Component
export const AgencyTitle = ({ agency, airport, className = "" }) => {
   return (
      <div className={`text-center flex-1 ${className}`}>
         <h1 className="text-[#1a75bb] font-serif text-4xl font-semibold  leading-none">
            {agency}
         </h1>
         <div className="text-[#1a75bb] font-serif text-sm font-semibold tracking-widest -mt-1">
            {airport}
         </div>
      </div>
   );
};

// Status Component
export const StatusComponent = ({ isOnline = true, onLogout, className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-black font-medium">Maintenance:</span>
        <span className={`px-2 py-1 text-xs font-bold text-white ${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
      <button 
        onClick={onLogout}
        className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 text-xs font-bold"
      >
        LOGOUT
      </button>
    </div>
  );
};

// Navigation Values Component
export const NavigationValues = ({ station, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 text-xs text-black ${className}`}>
      <span>Lat: <span className="bg-white px-1 border border-gray-400">{station.lat}</span></span>
      <span>Lon: <span className="bg-white px-1 border border-gray-400">{station.lon}</span></span>
      <span>Elev: <span className="bg-white px-1 border border-gray-400">{station.elev}</span></span>
      <span>Const: <span className="bg-white px-1 border border-gray-400">{station.const}</span></span>
    </div>
  );
};

// Station ID Component
export const StationID = ({ id, network, className = "" }) => {
  return (
    <div className={`text-black font-bold text-lg ${className}`}>
      {id} {network}
    </div>
  );
};

// Date Time Display Component
export const DateTimeDisplay = ({ time, className = "" }) => {
  return (
     <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-black font-bold text-lg">{formatDate(time)}</span>
        <GMTDigitalClock time={time} />
     </div>
  );
};
