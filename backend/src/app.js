import express from "express";
import cors from "cors";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

const origenesPermitidos = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: origenesPermitidos
}));

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use(errorHandler);

export default app;
