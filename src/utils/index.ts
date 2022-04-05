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

export const validateInputs = async (
  authorization: string | undefined,
  logicCheckBodyProps: boolean
) =>
  !!authorization &&
  !!(await confirmAuth(authorization)) &&
  logicCheckBodyProps;
