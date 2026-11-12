import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "API funcionando correctamente"
  });
});

if (process.env.NODE_ENV === "development") {
  app.get("/api/db-health", async (req, res) => {
    try {
      const resultado = await pool.query(
        "SELECT COUNT(*)::integer AS total FROM productos"
      );

      res.json({
        ok: true,
        message: "PostgreSQL conectado correctamente",
        total_productos: resultado.rows[0].total
      });

    } catch (error) {
      console.error("Error PostgreSQL:", error.message);

      res.status(500).json({
        ok: false,
        message: "Error de conexión con PostgreSQL"
      });
    }
  });
}

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});