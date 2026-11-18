import "dotenv/config";
import app from "./app.js";
import pool from "./config/database.js";

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});