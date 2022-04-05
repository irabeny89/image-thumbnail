import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  transform: { "^.+\\.tsx?$": "ts-jest" }
};

export default config