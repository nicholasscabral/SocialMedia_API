import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "social_media_api_test"
          : defaultOptions.database,
      entities:
        process.env.NODE_ENV === "prod"
          ? ["dist/models/**/*.ts"]
          : defaultOptions.entities,
      migrations:
        process.env.NODE_ENV === "prod"
          ? ["dist/database/migrations/**/*.ts"]
          : defaultOptions.migrations,
    })
  );
};
