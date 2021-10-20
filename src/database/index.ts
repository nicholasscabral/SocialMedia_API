import { createConnection } from "typeorm";

if (process.env.NODE_ENV === "test") {
  createConnection("test").then(() => {
    console.log("TEST Database Connection established...");
  });
} else {
  createConnection().then(() => {
    console.log("Database Connection established...");
  });
}
