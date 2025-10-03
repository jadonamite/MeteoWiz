import { useState, useEffect } from 'react';
import { toGMT } from '../hooks/useTime';

// Digital Clock Component (GMT) - now receives time as prop
export const GMTDigitalClock = ({ time, className = "" }) => {
  // Convert to GMT using passed time
  const gmtTime = toGMT(time);
  
  const hours = gmtTime.getHours().toString().padStart(2, '0');
  const minutes = gmtTime.getMinutes().toString().padStart(2, '0');
  const seconds = gmtTime.getSeconds().toString().padStart(2, '0');

  return (
     <span
        className={`bg-red-300 text-black px-1 font-mono text-xl font-bold ${className}`}>
        {hours}:{minutes}:{seconds}
     </span>
  );
};

// Modular Time Separator Component
export const TimeSeparator = ({ className = "", animated = true }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!animated) return;
    
    const timer = setInterval(() => {
      setVisible(prev => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, [animated]);

  return (
    <span className={`font-mono font-bold ${className} transition-opacity duration-200 ${
      animated ? (visible ? 'opacity-100' : 'opacity-30') : 'opacity-100'
    }`}>
      :
    </span>
  );
};

// Individual time unit components
export const HourDisplay = ({ hour, format24 = false, className = "" }) => {
  const displayHour = format24 ? hour : hour % 12 || 12;
  
  return (
    <span className={`font-mono font-bold ${className}`}>
      {displayHour.toString().padStart(2, '0')}
    </span>
  );
};
export const MinuteDisplay = ({ minute, className = "" }) => {
  return (
    <span className={`font-mono font-bold ${className}`}>
      {minute.toString().padStart(2, '0')}
    </span>
  );
};

export const SecondDisplay = ({ second, className = "" }) => {
  return (
    <span className={`font-mono font-bold ${className}`}>
      {second.toString().padStart(2, '0')}
    </span>
  );
};