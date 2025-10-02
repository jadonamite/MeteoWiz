// Default station configuration
export const defaultStationConfig = {
  name: "Asaba",
  lat: "06.20",
  lon: "06.66", 
  elev: "82.40",
  const: "1.00533",
  id: "65282",
  network: "DNAS",
  airport: "ASABA AIRPORT",
  agency: "NIGERIAN METEOROLOGICAL AGENCY"
};

// System information configuration
export const systemConfig = {
   version: "MeteoWIZ V.ALPHA",
   poweredBy: " Jadonamite",
   website: "Website: meteowx.xyz",
};
// Multiple station configurations example
export const stationConfigs = {
  asaba: {
    name: "Asaba",
    lat: "06.20",
    lon: "06.66",
    elev: "82.40",
    const: "1.00533",
    id: "65282",
    network: "DNAS",
    airport: "ASABA AIRPORT"
  },
  lagos: {
    name: "Lagos",
    lat: "06.45",
    lon: "03.40",
    elev: "38.70",
    const: "1.00421",
    id: "65201",
    network: "DNAS",
    airport: "MURTALA MUHAMMED AIRPORT"
  },
  abuja: {
    name: "Abuja",
    lat: "09.26",
    lon: "07.27",
    elev: "342.00",
    const: "1.03512",
    id: "65123",
    network: "DNAS",
    airport: "NNAMDI AZIKIWE AIRPORT"
  }
}