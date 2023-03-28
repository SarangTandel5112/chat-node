export = {
   type: process.env.DB_DIALECT,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   charset: 'utf8mb4',
   collation: 'utf8mb4_unicode_ci',
   synchronize: true,
   logging: false,
   connectTimeout: 60 * 60 * 1000,
   acquireTimeout: 60 * 60 * 1000,
   timeout: 60 * 60 * 1000,
   entities: [__dirname + '/entities/*{.js,.ts}'],
   migrations: [__dirname + '/migrations/*{.js,.ts}'],
   subscribers: [__dirname + '/subscribers/*{.js,.ts}']
};
