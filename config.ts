import dotenv from "dotenv";

dotenv.config();

const config = {
  generalErrorMessage: "Something went wrong.",
  inputErrorMessage: "Invalid inputs to a protected route. Validate headers and body of request then try again.",
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  secret: process.env.JWT_SECRET!
};

export default config;
