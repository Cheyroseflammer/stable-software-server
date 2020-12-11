module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  API_TOKEN: process.env.API_TOKEN,
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://chey@localhost/stable-software",
};
// DATABASE_URL="postgres://zjlpymhttcyudd:cc34ddbee67fae7674499a7b37567a31467be2a2913d28e1d064bd0b86dd2ca6@ec2-3-213-106-122.compute-1.amazonaws.com:5432/d5rsulsk8o8kbr"

// API_TOKEN="cf476a5e-bb90-485b-af1a-69a471ed1f67"
