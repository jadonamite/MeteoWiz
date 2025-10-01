import { useState, useEffect } from "react";

// Hook for managing GMT time - can still be used elsewhere if needed
export const useGMTTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};

// Hook for managing time with server synchronization
export const useSyncedTime = (serverTime) => {
  const [time, setTime] = useState(new Date(serverTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};

// Utility function to get season based on date
export const getSeason = (date) => {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "SPRING";
  if (month >= 5 && month <= 7) return "SUMMER";  
  if (month >= 8 && month <= 10) return "AUTUMN";
  return "WINTER";
};

// Convert local time to GMT
export const toGMT = (localTime) => {
  return new Date(localTime.getTime() + (localTime.getTimezoneOffset() * 60000));
};

// Format date for display - now SSR safe
export const formatDate = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getDay()];
  const dateStr = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const season = getSeason(date);
  
  return `${season}, ${day} ${dateStr}-${month}-${year}`;
};