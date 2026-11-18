import { Router } from "express";
import * as controller from "../controllers/categoriaController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(controller.listar));
router.get("/:id", asyncHandler(controller.obtenerPorId));
router.post("/", asyncHandler(controller.crear));
router.put("/:id", asyncHandler(controller.actualizar));
router.delete("/:id", asyncHandler(controller.eliminar));

export default router;