import { createContext, useContext, useReducer, useEffect } from "react";

const WeatherContext = createContext();

// Initial state structure for weather observations
const initialState = {
   currentObservation: {
      // Basic measurements
      dryBulbTemp: null,
      wetBulbTemp: null,
      dewPoint: null,
      pressure: {
         station: null,
         msl: null,
         qnh: null,
      },
      wind: {
         direction: null,
         speed: null,
         gust: null,
      },
      visibility: null,
      weather: {
         present: [],
         recent: [],
      },
      clouds: [],
      // Derived values
      relativeHumidity: null,
      vaporPressure: null,
      feelTemperature: null,
      // Aviation specific
      rvr: null,
      altimeter: null,
      // Metadata
      timestamp: null,
      observer: null,
      stationId: process.env.NEXT_PUBLIC_STATION_ID,
   },
   observations: [], // Historical observations
   loading: false,
   error: null,
};

function weatherReducer(state, action) {
   switch (action.type) {
      case "SET_LOADING":
         return { ...state, loading: action.payload };

      case "SET_ERROR":
         return { ...state, error: action.payload, loading: false };

      case "UPDATE_CURRENT_OBSERVATION":
         return {
            ...state,
            currentObservation: {
               ...state.currentObservation,
               ...action.payload,
            },
         };

      case "SAVE_OBSERVATION":
         return {
            ...state,
            observations: [action.payload, ...state.observations],
            currentObservation: { ...initialState.currentObservation },
         };

      case "LOAD_OBSERVATIONS":
         return {
            ...state,
            observations: action.payload,
            loading: false,
         };

      case "RESET_CURRENT":
         return {
            ...state,
            currentObservation: { ...initialState.currentObservation },
         };

      default:
         return state;
   }
}

export function WeatherProvider({ children }) {
   const [state, dispatch] = useReducer(weatherReducer, initialState);

   // Load observations on mount
   useEffect(() => {
      loadObservations();
   }, []);

   const loadObservations = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
         const response = await fetch("/api/observations");
         if (response.ok) {
            const observations = await response.json();
            dispatch({ type: "LOAD_OBSERVATIONS", payload: observations });
         }
      } catch (error) {
         dispatch({
            type: "SET_ERROR",
            payload: "Failed to load observations",
         });
      }
   };

   const updateCurrentObservation = (data) => {
      dispatch({ type: "UPDATE_CURRENT_OBSERVATION", payload: data });
   };

   const saveObservation = async (observation) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
         const response = await fetch("/api/observations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               ...observation,
               timestamp: new Date().toISOString(),
            }),
         });

         if (response.ok) {
            const savedObservation = await response.json();
            dispatch({ type: "SAVE_OBSERVATION", payload: savedObservation });
            return savedObservation;
         } else {
            throw new Error("Failed to save observation");
         }
      } catch (error) {
         dispatch({ type: "SET_ERROR", payload: error.message });
         throw error;
      }
   };

   const resetCurrent = () => {
      dispatch({ type: "RESET_CURRENT" });
   };

   const value = {
      ...state,
      updateCurrentObservation,
      saveObservation,
      resetCurrent,
      loadObservations,
   };

   return (
      <WeatherContext.Provider value={value}>
         {children}
      </WeatherContext.Provider>
   );
}

export function useWeather() {
   const context = useContext(WeatherContext);
   if (!context) {
      throw new Error("useWeather must be used within a WeatherProvider");
   }
   return context;
}
