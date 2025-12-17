import cors from "cors"; // libreria para manejar solicitudes entre diferentes dominios (cross-origin)
import { errorMiddleware } from "./middlewares/error.middleware.js";
import express from "express";
import morgan from "morgan"; // libreria para registro de solicitudes http
import routes from "./routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // importante sin esto el req.body siempre es undefined

app.get("/health", (req, res) => {
    res.status(200).send({ status: "OK" });
});

app.use("/api", routes);

// manejo de errores al final siempre best preactice
app.use(errorMiddleware);
export default app;
