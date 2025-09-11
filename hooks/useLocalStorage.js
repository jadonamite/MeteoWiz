// Custom hook for local storage (development backup)
// Used for offline data persistence during development

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
   const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
         return initialValue;
      }

      try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
      } catch (error) {
         console.error(`Error reading localStorage key "${key}":`, error);
         return initialValue;
      }
   });

   const setValue = (value) => {
      try {
         const valueToStore =
            value instanceof Function ? value(storedValue) : value;
         setStoredValue(valueToStore);

         if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
         }
      } catch (error) {
         console.error(`Error setting localStorage key "${key}":`, error);
      }
   };

   return [storedValue, setValue];
}

// Specialized hook for weather observations backup
export function useObservationsBackup() {
   const [backupData, setBackupData] = useLocalStorage(
      "weather_observations_backup",
      []
   );

   const backupObservation = (observation) => {
      setBackupData((prev) => [observation, ...prev.slice(0, 99)]); // Keep last 100
   };

   const restoreFromBackup = () => {
      return backupData;
   };

   const clearBackup = () => {
      setBackupData([]);
   };

   return {
      backupObservation,
      restoreFromBackup,
      clearBackup,
      backupCount: backupData.length,
   };
}
