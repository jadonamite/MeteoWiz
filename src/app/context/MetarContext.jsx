"use client";

import { createContext, useContext, useState, useMemo } from "react";

const MetarContext = createContext(undefined);

/**
 * MetarProvider
 *
 * Manages complete meteorological data state for METAR code generation.
 * Tracks observed, derived, and forecast data from all dashboard sections.
 */
export const MetarProvider = ({ children }) => {
   // OBSERVED VALUES - Raw measurements
   const [observedData, setObservedData] = useState({
      dryBulb: null, // °C
      wetBulb: null, // °C
      digitalBarometer: null, // hPa
      astreadBarometer: null, // hPa
      attachThermometer: null, // °C
      visibility: null, // meters
      windDirection: null, // degrees
      windSpeed: null, // knots
      qnt: null, // knots
      precipAmount: null, // mm
      solarimeter: null, // W/m2
      cloudAmount: null, // oktas
      cloudGenus: null, // type
      weather: null, // condition
      rvr1: null, // RVR values
      rvr2: null,
      date: null, // observation date
      time: null, // observation time
   });

   // DERIVED VALUES - Calculated from observed
   const [derivedData, setDerivedData] = useState({
      relativeHumidity: null, // %
      vaporPressure: null, // hPa
      dewPoint: null, // °C
      feelTemperature: null, // °C
      cloudBaseHeight: null, // meters (270)
      cloudBaseHeightFt: null, // feet (570)
      refEvapotranspiration: null, // mm/h
      estEvaporation: null, // mm/h
      estVisibility: null, // km
      slp: null, // Sea Level Pressure (hPa)
      mslp: null, // Mean Sea Level Pressure (hPa)
      qnh: null, // QNH (hPa)
   });

   // TREND & FORECAST DATA
   const [trendData, setTrendData] = useState({
      messageType: "METAR", // METAR, TAF, etc.
      windCode: null, // e.g., 21008KT
      visibilityCode: null, // e.g., 8000
      temperature: null, // °C
      dewPointTemp: null, // °C
      qfe: null, // hPa
      qnh: null, // hPa
      weatherCode: null, // e.g., NIL, RA, etc.
      cloudCode: null, // e.g., SCT009
      trend: null, // NOSIG, BECMG, etc.
      remarks: null, // Additional remarks
   });

   // STATION INFORMATION
   const [stationInfo, setStationInfo] = useState({
      icaoCode: "DNAS",
      stationName: "Asaba Airport",
      latitude: "06.20",
      longitude: "06.66",
      elevation: "82.40",
      const: "1.00533",
      stationNumber: "65282",
   });

   // SYNOP DATA (from the tables)
   const [synopData, setSynopData] = useState({
      time: null,
      irxdvv: null,
      nddff: null,
      snTTT: null,
      sn1d1d1d: null,
      p0p0p0p0: null,
      pppp: null,
      appp: null,
      rrrtr: null,
      www1w2: null,
      nsChsCMCH: null,
      // Second table
      hh: null,
      snTxTxTx: null,
      snTnTnTn: null,
      p24p24p24: null,
      nsChshshs: null,
      spspspsp: null,
      wetrbhvp: null,
      remarks: null,
   });

   /**
    * Generate METAR code from all collected data
    * Format: METAR ICAO DDHHMM[Z] dddffKT VVVV [WX] [CLD] TT/Td QPPPP [TREND] [RMK]
    */
   const generateMetarCode = useMemo(() => {
      const {
         windCode,
         visibilityCode,
         temperature,
         dewPointTemp,
         qnh,
         weatherCode,
         cloudCode,
         trend,
         remarks,
      } = trendData;

      const { icaoCode } = stationInfo;
      const { date, time } = observedData;

      // Build date-time group (DDHHMM)
      const dateTime =
         date && time
            ? `${date.toString().padStart(2, "0")}${time
                 .toString()
                 .replace(":", "")}Z`
            : `${new Date().getDate().toString().padStart(2, "0")}${new Date()
                 .getHours()
                 .toString()
                 .padStart(2, "0")}${new Date()
                 .getMinutes()
                 .toString()
                 .padStart(2, "0")}Z`;

      // Build METAR parts
      const parts = [
         "METAR",
         icaoCode,
         dateTime,
         windCode || "00000KT",
         visibilityCode || "9999",
         weatherCode && weatherCode !== "NIL" ? weatherCode : null,
         cloudCode || "NSC",
         temperature && dewPointTemp
            ? `${temperature}/${dewPointTemp}`
            : "XX/XX",
         qnh ? `Q${qnh}` : "Q----",
         trend || null,
         remarks ? `RMK ${remarks}` : null,
      ];

      return parts.filter(Boolean).join(" ").trim();
   }, [trendData, stationInfo, observedData]);

   const value = {
      // State
      observedData,
      derivedData,
      trendData,
      stationInfo,
      synopData,

      // Setters
      setObservedData,
      setDerivedData,
      setTrendData,
      setStationInfo,
      setSynopData,

      // Computed METAR code
      metarCode: generateMetarCode,
   };

   return (
      <MetarContext.Provider value={value}>{children}</MetarContext.Provider>
   );
};

/**
 * Custom hook to access METAR context
 */
export const useMetar = () => {
   const context = useContext(MetarContext);
   if (context === undefined) {
      throw new Error("useMetar must be used within a MetarProvider");
   }
   return context;
};
