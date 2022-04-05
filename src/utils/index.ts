import config from "../../config";

export const confirmAuth = async (authorization: string) => {
  try {
    return (await import("jsonwebtoken")).verify(
      authorization?.replace("Bearer ", ""),
      config.secret
    );
  } catch (error) {
    throw error;
  }
};
