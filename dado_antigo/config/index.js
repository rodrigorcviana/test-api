const dotenv = require('dotenv');

dotenv.config();

export default {
  port: process.env.PORT,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseName: process.env.DATABASE_NAME,
  databaseUsername: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,
};
