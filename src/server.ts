import "reflect-metadata";
import { app } from "./app";
import "./database";

app.listen(5000, () => console.log("Server running..."));
