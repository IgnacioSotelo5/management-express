import express from "express";
import helmet from "helmet";
import { authRouter } from "./modules/auth/auth.routes";
import { PORT } from "./config/config";
import { corsMiddleware } from "./shared/middlewares/cors";
import { ingredientRouter } from "./modules/ingredients/ingredient.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { authMiddleware } from "./shared/middlewares/authMiddleware";
import { categoryRouter } from "./modules/category/category.routes";
import { supplierRouter } from "./modules/suppliers/supplier.routes";
import { bakeryRouter } from "./modules/bakery/bakery.routes";

const app = express();
const port = PORT;


app.use(helmet())
app.use(express.json());
app.use(corsMiddleware())

app.use("/auth", authRouter);
app.use(authMiddleware)
app.use("/ingredient", ingredientRouter);
app.use("/category", categoryRouter);
app.use("/supplier", supplierRouter);
app.use("/bakery", bakeryRouter)
app.get("/test", (req,res) => {res.send("Hello world")})
// Middleware de manejo de errores
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
