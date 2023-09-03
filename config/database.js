const path = require("path");

module.exports = ({ env }) => {
  let defaultClient;
  if (env("NODE_ENV", "development") == "production") {
    defaultClient = "postgres";
  } else {
    defaultClient = "sqlite";
  }
  const client = env("DATABASE_CLIENT", defaultClient);

  const connections = {
    postgres: {
      connection: {
        socketPath: env("DATABASE_SOCKET_PATH", "/var/run/postgresql"),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "postgres"),
        // password: env("DATABASE_PASSWORD", "postgres"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
