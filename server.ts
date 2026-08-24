import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client if API key is present
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "AI Port Congestion System", timestamp: new Date().toISOString() });
});

// AI Predictive Port Congestion & Rescheduling Endpoint
app.post("/api/ai/forecast", async (req, res) => {
  const { shipName, imo, cargoTeu, scheduledEta, reportedDelayMinutes, weatherCondition, availableLabour, availableVehicles, availableBerths } = req.body;

  try {
    const ai = getGeminiClient();
    if (ai) {
      const prompt = `You are the Lead Port Operations AI Controller for "AI Port Congestion".
Analyze the incoming ship arrival and terminal constraints:
- Ship: ${shipName} (IMO: ${imo})
- Cargo Volume: ${cargoTeu} TEUs
- Scheduled ETA: ${scheduledEta}
- Current Delay: ${reportedDelayMinutes} minutes
- Weather State: ${weatherCondition || "Moderate sea swell, 18kt crosswinds"}
- Available Resources:
  * Labour force: ${availableLabour} workers
  * Vehicles (lorries/AGVs): ${availableVehicles} units
  * Free Berths: ${availableBerths}

Please provide:
1. Overall Congestion Risk Rating (Low, Medium, High, or Critical).
2. Predicted Port Bottleneck Analysis (Labour bottleneck, berth clash, vehicle queue, or warehouse saturation).
3. Recommended Automated Action Plan (exact crane count, gang shift adjustments, lorry re-dispatch times, and re-allocated storage bay).
4. Estimated cost savings from pre-scheduling vs waiting for arrival.

Return response formatted as clean JSON with keys:
{
  "riskRating": "High" | "Medium" | "Low",
  "congestionScore": number (0-100),
  "predictedDelayVariance": string,
  "bottleneckSummary": string,
  "actionPlan": {
    "craneAllocation": number,
    "labourGangCount": number,
    "rescheduledStartTime": string,
    "recommendedBerth": string,
    "vehicleDispatchInstruction": string,
    "warehouseBayZone": string
  },
  "estimatedSavingsUSD": number,
  "aiRationale": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return res.json({ success: true, forecast: parsed });
    }
  } catch (error) {
    console.warn("AI Generation failed, falling back to rule-based engine:", error);
  }

  // Resilient fallback rule-based algorithmic model
  const delayHours = (reportedDelayMinutes || 0) / 60;
  const cargo = cargoTeu || 3200;
  const neededLabour = Math.ceil(cargo / 80);
  const neededVehicles = Math.ceil(cargo / 120);

  let risk: "Low" | "Medium" | "High" = "Low";
  let score = 25;

  if (delayHours > 3 || (availableLabour && availableLabour < neededLabour) || (availableBerths && availableBerths < 1)) {
    risk = "High";
    score = Math.min(95, 65 + delayHours * 6);
  } else if (delayHours > 1 || (availableVehicles && availableVehicles < neededVehicles)) {
    risk = "Medium";
    score = 52;
  }

  const fallbackForecast = {
    riskRating: risk,
    congestionScore: score,
    predictedDelayVariance: delayHours > 0 ? `+${Math.floor(delayHours)}h ${reportedDelayMinutes % 60}m` : "On Schedule (0m variance)",
    bottleneckSummary: risk === "High" 
      ? "Imminent quay congestion risk: delayed arrival clashes with peak outbound feeder traffic. High crane idling risk avoided via preemptive shift rescheduling."
      : risk === "Medium"
      ? "Moderate vehicle transit congestion detected at Gate 4. Pre-dispatch buffering active."
      : "Optimal terminal throughput. Resources synchronized for instant offloading upon mooring.",
    actionPlan: {
      craneAllocation: Math.min(5, Math.max(2, Math.ceil(cargo / 900))),
      labourGangCount: Math.ceil(neededLabour / 8),
      rescheduledStartTime: delayHours > 0 ? `T + ${reportedDelayMinutes} mins from base ETA` : "Immediate Upon Tie-up",
      recommendedBerth: availableBerths > 0 ? "Berth B-03 (Deep Quay)" : "Berth A-07 (Outer Basin)",
      vehicleDispatchInstruction: delayHours > 0 
        ? `Hold fleet of ${neededVehicles} lorries at Staging Zone 2 until 30m before new ETA.` 
        : `Deploy ${neededVehicles} haulage vehicles to Gantry Line 3.`,
      warehouseBayZone: cargo > 2500 ? "Bay C-North & Dry Yard 4" : "Bay A-West Standard"
    },
    estimatedSavingsUSD: Math.round(cargo * (delayHours > 0 ? 34.5 : 18.2)),
    aiRationale: `AI Port Congestion predictive algorithms synchronized ${cargo} TEU handling across 4 shore gantry cranes and ${neededLabour} operators, mitigating ${delayHours > 0 ? delayHours.toFixed(1) + ' hours of quay deadlock' : 'early bottleneck formation'}.`
  };

  return res.json({ success: true, forecast: fallbackForecast, mode: "predictive-rule-engine" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Port Congestion Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
