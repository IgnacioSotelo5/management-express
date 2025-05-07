import express from "express";
import helmet from "helmet";
import { authRouter } from "./modules/auth/auth.routes";
import { PORT } from "./config/config";
import { corsMiddleware } from "./shared/middlewares/cors";
import { ingredientRouter } from "./modules/ingredients/ingredient.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();
const port = PORT;


app.use(helmet())
app.use(express.json());
app.use(corsMiddleware())

app.use("/auth", authRouter);
app.use("/ingredient", ingredientRouter);
app.get("/test", (req,res) => {res.send("Hello world")})
// Middleware de manejo de errores
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
