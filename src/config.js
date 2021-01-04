module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  API_TOKEN: process.env.API_TOKEN,
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://chey@localhost/stable-software",
};
