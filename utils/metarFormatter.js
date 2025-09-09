// METAR/SPECI formatting utilities following ICAO standards

/**
 * Format complete METAR message
 * @param {Object} observation - Weather observation data
 * @param {string} type - 'METAR' or 'SPECI'
 * @returns {string} Formatted METAR/SPECI message
 */
export function formatMETAR(observation, type = "METAR") {
   const parts = [];

   // Message type and station identifier
   parts.push(type);
   parts.push(observation.stationId || "DNAS");

   // Date and time (DDHHMM)
   const timestamp = new Date(observation.timestamp || Date.now());
   const day = timestamp.getUTCDate().toString().padStart(2, "0");
   const hour = timestamp.getUTCHours().toString().padStart(2, "0");
   const minute = timestamp.getUTCMinutes().toString().padStart(2, "0");
   parts.push(`${day}${hour}${minute}Z`);

   // Wind information
   if (observation.wind) {
      parts.push(formatWind(observation.wind));
   }

   // Visibility
   if (observation.visibility !== null) {
      parts.push(formatVisibility(observation.visibility));
   }

   // Runway Visual Range (if applicable)
   if (observation.rvr) {
      parts.push(formatRVR(observation.rvr));
   }

   // Weather phenomena
   if (observation.weather?.present?.length > 0) {
      parts.push(formatWeatherPhenomena(observation.weather.present));
   }

   // Cloud information
   if (observation.clouds?.length > 0) {
      parts.push(...formatClouds(observation.clouds));
   }

   // Temperature and dew point
   if (observation.dryBulbTemp !== null) {
      parts.push(
         formatTemperature(observation.dryBulbTemp, observation.dewPoint)
      );
   }

   // Altimeter setting
   if (observation.altimeter || observation.pressure?.qnh) {
      const qnh = observation.altimeter || observation.pressure.qnh;
      parts.push(formatAltimeter(qnh));
   }

   // Recent weather (if applicable)
   if (observation.weather?.recent?.length > 0) {
      parts.push(formatRecentWeather(observation.weather.recent));
   }

   return parts.filter((part) => part).join(" ");
}

/**
 * Format wind information
 * @param {Object} wind - Wind data {direction, speed, gust}
 * @returns {string} Wind group (e.g., "27008KT", "VRB03KT", "27015G22KT")
 */
export function formatWind(wind) {
   if (!wind.speed && wind.speed !== 0) return "CALM";

   let windGroup = "";

   // Wind direction
   if (!wind.direction || wind.speed < 1) {
      windGroup += "VRB";
   } else {
      windGroup += wind.direction.toString().padStart(3, "0");
   }

   // Wind speed
   windGroup += wind.speed.toString().padStart(2, "0");

   // Gust information
   if (wind.gust && wind.gust > wind.speed) {
      windGroup += "G" + wind.gust.toString().padStart(2, "0");
   }

   windGroup += "KT";

   return windGroup;
}

/**
 * Format visibility
 * @param {number} visibility - Visibility in kilometers
 * @returns {string} Visibility group
 */
export function formatVisibility(visibility) {
   if (visibility >= 10) {
      return "9999"; // 10 km or more
   } else if (visibility >= 5) {
      return (Math.round(visibility) * 1000).toString();
   } else if (visibility >= 1) {
      return Math.round(visibility * 1000)
         .toString()
         .padStart(4, "0");
   } else {
      return Math.round(visibility * 1000)
         .toString()
         .padStart(4, "0");
   }
}

/**
 * Format temperature and dew point
 * @param {number} temp - Temperature in °C
 * @param {number} dewPoint - Dew point in °C
 * @returns {string} Temperature group (e.g., "27/24", "M05/M08")
 */
export function formatTemperature(temp, dewPoint) {
   const formatTemp = (t) => {
      if (t === null || t === undefined) return "XX";
      const prefix = t < 0 ? "M" : "";
      return prefix + Math.abs(Math.round(t)).toString().padStart(2, "0");
   };

   return `${formatTemp(temp)}/${formatTemp(dewPoint)}`;
}

/**
 * Format altimeter setting
 * @param {number} qnh - QNH in hPa
 * @returns {string} Altimeter group (e.g., "Q1013")
 */
export function formatAltimeter(qnh) {
   return "Q" + Math.round(qnh).toString().padStart(4, "0");
}

/**
 * Format cloud information
 * @param {Array} clouds - Array of cloud layers
 * @returns {Array} Array of cloud groups
 */
export function formatClouds(clouds) {
   if (!clouds || clouds.length === 0) return ["SKC"]; // Sky Clear

   return clouds.map((cloud) => {
      let cloudGroup = "";

      // Cloud amount
      switch (cloud.amount) {
         case "FEW":
            cloudGroup += "FEW";
            break;
         case "SCT":
            cloudGroup += "SCT";
            break;
         case "BKN":
            cloudGroup += "BKN";
            break;
         case "OVC":
            cloudGroup += "OVC";
            break;
         default:
            cloudGroup += "SKC";
      }

      // Cloud height (in hundreds of feet)
      if (cloud.height) {
         const heightHundreds = Math.round(cloud.height / 100);
         cloudGroup += heightHundreds.toString().padStart(3, "0");
      }

      // Cloud type (if significant)
      if (cloud.type === "CB") {
         cloudGroup += "CB";
      } else if (cloud.type === "TCU") {
         cloudGroup += "TCU";
      }

      return cloudGroup;
   });
}

/**
 * Format weather phenomena
 * @param {Array} phenomena - Array of weather phenomena
 * @returns {string} Weather group
 */
export function formatWeatherPhenomena(phenomena) {
   if (!phenomena || phenomena.length === 0) return "";

   return phenomena
      .map((wx) => {
         let wxGroup = "";

         // Intensity
         if (wx.intensity === "light") wxGroup += "-";
         else if (wx.intensity === "heavy") wxGroup += "+";

         // Descriptor
         if (wx.descriptor) {
            const descriptors = {
               shallow: "MI",
               patches: "BC",
               partial: "PR",
               drifting: "DR",
               blowing: "BL",
               shower: "SH",
               thunderstorm: "TS",
               freezing: "FZ",
            };
            wxGroup += descriptors[wx.descriptor] || "";
         }

         // Precipitation type
         if (wx.type) {
            const types = {
               rain: "RA",
               drizzle: "DZ",
               snow: "SN",
               ice_pellets: "PL",
               hail: "GR",
               small_hail: "GS",
            };
            wxGroup += types[wx.type] || "";
         }

         // Obscuration
         if (wx.obscuration) {
            const obscurations = {
               mist: "BR",
               fog: "FG",
               smoke: "FU",
               dust: "DU",
               sand: "SA",
               haze: "HZ",
            };
            wxGroup += obscurations[wx.obscuration] || "";
         }

         return wxGroup;
      })
      .join(" ");
}

/**
 * Format RVR (Runway Visual Range)
 * @param {Object} rvr - RVR data
 * @returns {string} RVR group
 */
export function formatRVR(rvr) {
   if (!rvr.runway || !rvr.range) return "";

   let rvrGroup = "R";
   rvrGroup += rvr.runway.padStart(2, "0");
   if (rvr.direction) rvrGroup += rvr.direction; // L, C, R
   rvrGroup += "/";

   // Range
   if (rvr.range < 50) rvrGroup += "M0050";
   else if (rvr.range > 2000) rvrGroup += "P2000";
   else rvrGroup += rvr.range.toString().padStart(4, "0");

   // Trend
   if (rvr.trend === "increasing") rvrGroup += "U";
   else if (rvr.trend === "decreasing") rvrGroup += "D";
   else if (rvr.trend === "no_change") rvrGroup += "N";

   return rvrGroup;
}

/**
 * Format recent weather
 * @param {Array} recentWeather - Array of recent weather phenomena
 * @returns {string} Recent weather group
 */
export function formatRecentWeather(recentWeather) {
   if (!recentWeather || recentWeather.length === 0) return "";

   return (
      "RE" + recentWeather.map((wx) => formatWeatherPhenomena([wx])).join("")
   );
}

/**
 * Parse METAR string into observation object (reverse operation)
 * @param {string} metarString - METAR message
 * @returns {Object} Parsed observation data
 */
export function parseMETAR(metarString) {
   // TODO: Implement METAR parsing for data import
   // This would be useful for importing data from other sources
   const parts = metarString.trim().split(" ");

   return {
      type: parts[0],
      stationId: parts[1],
      timestamp: parts[2],
      // ... more parsing logic
   };
}

/**
 * Validate METAR format
 * @param {string} metarString - METAR message to validate
 * @returns {Object} Validation result
 */
export function validateMETAR(metarString) {
   const errors = [];

   if (!metarString || typeof metarString !== "string") {
      errors.push("METAR string is required");
      return { isValid: false, errors };
   }

   const parts = metarString.trim().split(" ");

   if (parts.length < 4) {
      errors.push("METAR string too short");
   }

   if (!["METAR", "SPECI"].includes(parts[0])) {
      errors.push("Invalid message type (must be METAR or SPECI)");
   }

   if (parts[1] && !/^[A-Z]{4}$/.test(parts[1])) {
      errors.push("Invalid station identifier format");
   }

   if (parts[2] && !/^\d{6}Z$/.test(parts[2])) {
      errors.push("Invalid timestamp format (should be DDHHMM)");
   }

   return {
      isValid: errors.length === 0,
      errors,
   };
}
