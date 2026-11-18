import express from "express";
import cors from "cors";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

/*app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API funcionando correctamente" });
});*/

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use(errorHandler);

export default app;
