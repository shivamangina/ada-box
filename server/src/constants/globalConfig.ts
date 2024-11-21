const environment = process.env.ENVIRONMENT;
const isDevelopmentMachine = environment === "local-development";

const productionDB = {
  userName: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  host: process.env.MONGODB_HOST_WITH_PORT,
  database: process.env.MONGODB_DATABASE,
  extraConfig: process.env.MONGODB_EXTRA_CONFIG,
};

const config = {
  mongodb: {
    productionConnection: `mongodb+srv://${productionDB.userName}:${productionDB.password}@${productionDB.host}/${productionDB.database}${productionDB.extraConfig}`,
  },
  isDevelopmentMachine,
  environment,
  debug: true,
  throwError: true,
};

export default config;
