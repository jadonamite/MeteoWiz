// API Routes for weather observations
// In production, this would connect to a real database

let observations = []; // In-memory storage for development

export default function handler(req, res) {
   switch (req.method) {
      case "GET":
         return getObservations(req, res);
      case "POST":
         return createObservation(req, res);
      case "PUT":
         return updateObservation(req, res);
      case "DELETE":
         return deleteObservation(req, res);
      default:
         res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
         res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}

function getObservations(req, res) {
   try {
      const { date, limit = 50 } = req.query;

      let filteredObservations = observations;

      // Filter by date if provided
      if (date) {
         const targetDate = new Date(date);
         const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
         const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

         filteredObservations = observations.filter((obs) => {
            const obsDate = new Date(obs.timestamp);
            return obsDate >= startOfDay && obsDate <= endOfDay;
         });
      }

      // Sort by timestamp (newest first) and limit results
      const sortedObservations = filteredObservations
         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
         .slice(0, parseInt(limit));

      res.status(200).json(sortedObservations);
   } catch (error) {
      console.error("Error fetching observations:", error);
      res.status(500).json({ error: "Failed to fetch observations" });
   }
}

function createObservation(req, res) {
   try {
      const observationData = req.body;

      // Generate ID and timestamp
      const newObservation = {
         id: Date.now().toString(),
         ...observationData,
         timestamp: observationData.timestamp || new Date().toISOString(),
         created_at: new Date().toISOString(),
      };

      // Validate required fields
      const requiredFields = ["dryBulbTemp", "pressure", "stationId"];
      const missingFields = requiredFields.filter((field) => {
         if (field === "pressure") {
            return !newObservation.pressure?.station;
         }
         return !newObservation[field];
      });

      if (missingFields.length > 0) {
         return res.status(400).json({
            error: "Missing required fields",
            fields: missingFields,
         });
      }

      // Add to observations array
      observations.unshift(newObservation);

      // Keep only last 1000 observations to prevent memory issues
      if (observations.length > 1000) {
         observations = observations.slice(0, 1000);
      }

      console.log(`New observation saved: ${newObservation.id}`);
      res.status(201).json(newObservation);
   } catch (error) {
      console.error("Error creating observation:", error);
      res.status(500).json({ error: "Failed to create observation" });
   }
}

function updateObservation(req, res) {
   try {
      const { id } = req.query;
      const updateData = req.body;

      const observationIndex = observations.findIndex((obs) => obs.id === id);

      if (observationIndex === -1) {
         return res.status(404).json({ error: "Observation not found" });
      }

      // Update observation
      observations[observationIndex] = {
         ...observations[observationIndex],
         ...updateData,
         updated_at: new Date().toISOString(),
      };

      res.status(200).json(observations[observationIndex]);
   } catch (error) {
      console.error("Error updating observation:", error);
      res.status(500).json({ error: "Failed to update observation" });
   }
}

function deleteObservation(req, res) {
   try {
      const { id } = req.query;

      const observationIndex = observations.findIndex((obs) => obs.id === id);

      if (observationIndex === -1) {
         return res.status(404).json({ error: "Observation not found" });
      }

      // Remove observation
      const deletedObservation = observations.splice(observationIndex, 1)[0];

      res.status(200).json({
         message: "Observation deleted",
         observation: deletedObservation,
      });
   } catch (error) {
      console.error("Error deleting observation:", error);
      res.status(500).json({ error: "Failed to delete observation" });
   }
}
