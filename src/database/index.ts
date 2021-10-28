import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "social_media_api_test"
          : defaultOptions.database,
      // synchronize: process.env.NODE_ENV === "test" ? false : true,
    })
  );
};
