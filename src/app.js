import express from "express";
import config from "./config"; //aqui importamos todo el modulo config

import turnosRoutes from "./routers/turnos.routers.js";
import cors from "cors";

const app = express();

// Configuración de CORS para permitir peticiones desde la URL específica
//cambiar la url por la qque sea que vaya a hacer peticiones a la api
//por ejemplo http://127.0.0.1:5500 que es donde se ejjecuta live server

const corsOptions = {
  origin: [
    "https://ps0gbnft-5500.brs.devtunnels.ms/",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:550/carga_alumno.html",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

//settings(configuramos el puerto)
app.set("port", config.port);

//middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(turnosRoutes);

export default app;
