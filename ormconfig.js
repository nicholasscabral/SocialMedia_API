console.log("process.env.DATABASE_URL :>> ", process.env.DATABASE_URL);
console.log("process.env.DATABASE :>> ", process.env.DATABASE);
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE,

  entities: ["src/models/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/models/",
    migrationsDir: "src/database/migrations/",
  },
};
