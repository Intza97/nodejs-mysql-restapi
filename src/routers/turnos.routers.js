//aqui vamos a guardar las rutas para llamarlas desde otro documento
import { Router } from "express";

import {
  createNewTurnos,
  getTurnos,
  getTotalTurnos,
  getTurnosById,
  deleteTurnosById,
  updateTurnosById,
} from "../controllers/turnos.controller.js";

const router = Router();

router.get("/turnos", getTurnos);

router.post("/turnos", createNewTurnos); //para crear Turnos

router.get("/turnos/count", getTotalTurnos);

router.get("/turnos/:id", getTurnosById); //para obtener por id

router.delete("/turnos/:id", deleteTurnosById); //para eliminar

router.put("/turnos/:id", updateTurnosById); //para actualizar

export default router;
