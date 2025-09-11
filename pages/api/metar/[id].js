// API endpoint for generating METAR/SPECI from observation ID
import { formatMETAR, validateMETAR } from "../../../utils/metarFormatter";

// Import the observations array (in production this would be a database query)
import observationsHandler from "../observations";

export default function handler(req, res) {
   if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
   }

   try {
      const { id, type = "METAR" } = req.query;

      // In production, this would be a database query
      // For now, we'll simulate getting the observation
      const observations = []; // This would be fetched from database
      const observation = observations.find((obs) => obs.id === id);

      if (!observation) {
         return res.status(404).json({ error: "Observation not found" });
      }

      // Generate METAR
      const metarText = formatMETAR(observation, type);
      const validation = validateMETAR(metarText);

      res.status(200).json({
         id: observation.id,
         type,
         metar: metarText,
         validation,
         timestamp: observation.timestamp,
         stationId: observation.stationId,
      });
   } catch (error) {
      console.error("Error generating METAR:", error);
      res.status(500).json({ error: "Failed to generate METAR" });
   }
}
