import dotenv from "dotenv";
import "reflect-metadata";
import { app } from "./app";
import createConnection from "./database";

dotenv.config({ path: "./.env" });

createConnection().then(() => console.log("Database connection established"));

app.listen(5000, () => console.log("Server running..."));
