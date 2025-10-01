// Weather calculation utilities following WMO standards

/**
 * Calculate relative humidity from dry bulb and wet bulb temperatures
 * @param {number} dryBulb - Dry bulb temperature in °C
 * @param {number} wetBulb - Wet bulb temperature in °C
 * @param {number} pressure - Station pressure in hPa
 * @returns {number} Relative humidity as percentage
 */
export function calculateRelativeHumidity(
   dryBulb,
   wetBulb,
   pressure = 1013.25
) {
   if (!dryBulb || !wetBulb || wetBulb > dryBulb) return null;

   // Psychrometric calculation
   const gamma = (0.665 * pressure) / 1000; // Psychrometric constant
   const es = getSaturatedVaporPressure(dryBulb);
   const ew = getSaturatedVaporPressure(wetBulb);
   const e = ew - gamma * (dryBulb - wetBulb);

   return Math.round((e / es) * 100);
}

/**
 * Calculate dew point from temperature and relative humidity
 * @param {number} temp - Temperature in °C
 * @param {number} rh - Relative humidity as percentage
 * @returns {number} Dew point in °C
 */
export function calculateDewPoint(temp, rh) {
   if (!temp || !rh) return null;

   const a = 17.27;
   const b = 237.7;
   const alpha = (a * temp) / (b + temp) + Math.log(rh / 100);

   return Math.round(((b * alpha) / (a - alpha)) * 10) / 10;
}

/**
 * Calculate saturated vapor pressure using Magnus formula
 * @param {number} temp - Temperature in °C
 * @returns {number} Saturated vapor pressure in hPa
 */
export function getSaturatedVaporPressure(temp) {
   return 6.112 * Math.exp((17.67 * temp) / (temp + 243.5));
}

/**
 * Calculate pressure altitude from station pressure
 * @param {number} stationPressure - Station pressure in hPa
 * @param {number} elevation - Station elevation in meters
 * @returns {number} MSL pressure in hPa
 */
export function calculateMSLPressure(stationPressure, elevation = 91) {
   // Standard atmosphere calculation
   const tempLapse = 0.0065; // K/m
   const standardTemp = 288.15; // K
   const g = 9.80665; // m/s²
   const R = 287.04; // J/(kg·K)

   const temp = standardTemp - tempLapse * elevation;
   const ratio = Math.pow(standardTemp / temp, g / (R * tempLapse));

   return Math.round(stationPressure * ratio * 100) / 100;
}

/**
 * Calculate QNH from station pressure and elevation
 * @param {number} stationPressure - Station pressure in hPa
 * @param {number} elevation - Station elevation in meters
 * @param {number} temperature - Current temperature in °C
 * @returns {number} QNH in hPa
 */
export function calculateQNH(
   stationPressure,
   elevation = 91,
   temperature = 15
) {
   // More precise calculation using actual temperature
   const tempK = temperature + 273.15;
   const standardTemp = 288.15;
   const g = 9.80665;
   const R = 287.04;
   const tempLapse = 0.0065;

   const factor = Math.pow(
      (tempK + tempLapse * elevation) / tempK,
      g / (R * tempLapse)
   );
   return Math.round(stationPressure * factor * 100) / 100;
}

/**
 * Convert wind speed between units
 * @param {number} speed - Wind speed
 * @param {string} fromUnit - Source unit (kt, mps, kmh)
 * @param {string} toUnit - Target unit (kt, mps, kmh)
 * @returns {number} Converted wind speed
 */
export function convertWindSpeed(speed, fromUnit, toUnit) {
   if (!speed || fromUnit === toUnit) return speed;

   // Convert to m/s first
   let mps;
   switch (fromUnit) {
      case "kt":
         mps = speed * 0.514444;
         break;
      case "kmh":
         mps = speed / 3.6;
         break;
      case "mps":
         mps = speed;
         break;
      default:
         return speed;
   }

   // Convert from m/s to target
   switch (toUnit) {
      case "kt":
         return Math.round(mps / 0.514444);
      case "kmh":
         return Math.round(mps * 3.6);
      case "mps":
         return Math.round(mps);
      default:
         return speed;
   }
}

/**
 * Validate weather observation data
 * @param {Object} observation - Weather observation object
 * @returns {Object} Validation result with errors array
 */
export function validateObservation(observation) {
   const errors = [];

   // Temperature checks
   if (observation.dryBulbTemp < -60 || observation.dryBulbTemp > 60) {
      errors.push(
         "Dry bulb temperature out of reasonable range (-60°C to 60°C)"
      );
   }

   if (
      observation.wetBulbTemp &&
      observation.wetBulbTemp > observation.dryBulbTemp
   ) {
      errors.push("Wet bulb temperature cannot exceed dry bulb temperature");
   }

   // Pressure checks
   if (
      observation.pressure?.station < 800 ||
      observation.pressure?.station > 1100
   ) {
      errors.push("Station pressure out of reasonable range (800-1100 hPa)");
   }

   // Wind checks
   if (observation.wind?.direction < 0 || observation.wind?.direction > 360) {
      errors.push("Wind direction must be between 0-360 degrees");
   }

   if (observation.wind?.speed < 0 || observation.wind?.speed > 200) {
      errors.push("Wind speed out of reasonable range (0-200 kt)");
   }

   // Visibility checks
   if (observation.visibility < 0 || observation.visibility > 20) {
      errors.push("Visibility out of reasonable range (0-20 km)");
   }

   return {
      isValid: errors.length === 0,
      errors,
   };
}
