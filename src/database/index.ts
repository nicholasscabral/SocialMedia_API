import { Connection, createConnection } from "typeorm";

let connection: Connection;

if (process.env.NODE_ENV === "test") {
  createConnection("test").then((connect) => {
    connection = connect;
    console.log("TEST Database Connection established...");
  });
} else {
  createConnection().then((connect) => {
    connection = connect;
    console.log("Database Connection established...");
  });
}

export { connection };
