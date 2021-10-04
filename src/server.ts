import { app } from "./app";
import "reflect-metadata";
import "./database";

app.listen(5000, () => console.log("API running in port 5000..."));
