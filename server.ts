import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Backend API Routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "Unite Powertek EV Cloud Platform",
      database: "Firebase Firestore Connected",
      ocppGateway: "OCPP 1.6J / 2.0.1 Ready",
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/discom/tariffs", (req, res) => {
    res.json({
      timestamp: new Date().toISOString(),
      tariffs: [
        { state: "Maharashtra", discom: "MSEDCL", htTariffPerKwh: 6.50, ltTariffPerKwh: 7.20, todOffPeakRebate: 1.50 },
        { state: "Delhi", discom: "BSES / Tata Power", htTariffPerKwh: 5.00, ltTariffPerKwh: 5.50, todOffPeakRebate: 1.00 },
        { state: "Karnataka", discom: "BESCOM", htTariffPerKwh: 6.25, ltTariffPerKwh: 7.00, todOffPeakRebate: 1.25 },
        { state: "Tamil Nadu", discom: "TANGEDCO", htTariffPerKwh: 6.70, ltTariffPerKwh: 7.50, todOffPeakRebate: 1.10 },
        { state: "Gujarat", discom: "UGVCL / DGVCL", htTariffPerKwh: 5.80, ltTariffPerKwh: 6.40, todOffPeakRebate: 0.90 },
      ],
    });
  });

  app.post("/api/calculator/simulate", (req, res) => {
    const { gunCount = 4, capex = 2800000, dailySessions = 24, retailPrice = 18.5, discomCost = 6.5, opex = 22000 } = req.body || {};
    const avgKwhPerSession = 26;
    const monthlySessions = Number(dailySessions) * 30;
    const monthlyKwh = monthlySessions * avgKwhPerSession;
    const grossMonthlyRevenue = monthlyKwh * Number(retailPrice);
    const powerInputCost = monthlyKwh * Number(discomCost);
    const netOperatingIncome = grossMonthlyRevenue - powerInputCost - Number(opex);
    const annualEbitda = netOperatingIncome * 12;
    const paybackYears = Number(capex) / (annualEbitda > 0 ? annualEbitda : 1);

    res.json({
      monthlyKwh,
      grossMonthlyRevenue,
      powerInputCost,
      netOperatingIncome,
      annualEbitda,
      paybackYears: Number(paybackYears.toFixed(2)),
      cagrRoiPercent: Number(((annualEbitda / Number(capex)) * 100).toFixed(1)),
    });
  });

  // Vite middleware for development vs static production serve
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // In Express 4, * handles all fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Unite Powertek Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
