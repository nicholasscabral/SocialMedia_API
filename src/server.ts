import dotenv from "dotenv";
import "reflect-metadata";
import { app } from "./app";
import createConnection from "./database";

dotenv.config({ path: "./.env" });

createConnection().then((connection) => {
  console.log("Database connection established:", connection.isConnected);
});

app.listen(5000, () => console.log("Server running..."));
