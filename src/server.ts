import "reflect-metadata";
import { app } from "./app";
import createConnection from "./database";

createConnection().then((connection) => {
  console.log(connection.options);
  connection.runMigrations();
});

app.listen(5000, () => console.log("Server running..."));
