import { expect } from "chai";
import { confirmAuth, validateInputs } from "../utils";
import config from "../../config";

describe("utils tests", () => {
  let payload: string, accessToken: string;
  before(async () => {
    payload = "test payload";
    accessToken = (await import("jsonwebtoken")).sign(payload, config.secret);
  });
  describe("confirmAuth function", function () {
    it("returns auth payload", async function () {
      const verifiedPayload = await confirmAuth("Bearer " + accessToken);
      expect(verifiedPayload).to.be.equal(payload);
    });
  });
  describe("validateInputs function", async function () {
    it("validates inputs & returns true", async () => {
      expect(await validateInputs("Bearer " + accessToken, true)).to.be.true;
      expect(await validateInputs("Bearer " + accessToken, false)).to.be.false;
    });
  });
});
