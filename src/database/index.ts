import { Connection, createConnection, getConnection } from "typeorm";

let connection: any;

if (process.env.NODE_ENV === "test") {
  connection = {
    async create() {
      await createConnection();
    },

    async close() {
      await getConnection().close();
    },

    async clear() {
      const connection = getConnection();
      const entities = connection.entityMetadatas;

      entities.forEach(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      });
    },
  };
} else {
  createConnection().then((connect) => {
    connection = connect;
    console.log("Database connection established");
  });
}

export { connection };
