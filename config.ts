import dotenv from "dotenv";

dotenv.config();

const config = {
  generalErrorMessage: "Something went wrong.",
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  secret: process.env.JWT_SECRET!
};

export default config;
