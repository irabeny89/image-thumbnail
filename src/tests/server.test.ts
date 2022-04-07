import server from "../express";
import supertest from "supertest";
import { expect } from "chai";
import type { JsonType, PatchType } from "../../types";

describe("server test", function () {
  const testServer = supertest(server);

  let accessToken: string;

  it("request GET / with no body data; response ok with 2XX status.", async () => {
    const { status, text } = await testServer.get("/");

    expect(String(status)).to.match(/^2/);
  });

  describe("auth routes", () => {
    const route = "/api/login",
      headers = { "Content-Type": "application/json" };

    it(`requests POST ${route} with no data; response fails with 4XX status.`, async () => {
      const { text, status } = await testServer.post(route).set(headers);

      expect(String(status)).to.match(/^4/);
    });

    it(`requests POST ${route} with header & data; response ok with 2XX status & access token data.`, async () => {
      const data = { username: "tester" },
        { body, status } = await testServer.post(route).set(headers).send(data);
      // update accessToken variable to be used as closure asynchronously
      accessToken = body.accessToken;

      expect(String(status)).to.match(/^2/);
      expect(body).to.have.property("accessToken");
      expect(typeof body.accessToken).to.equal("string");
    });

    it(`requests POST ${route} with header & falsy data; response fails with 4XX status.`, async () => {
      const falsyData = { username: "" },
        { text, status } = await testServer
          .post(route)
          .set(headers)
          .send(falsyData);

      expect(String(status)).to.match(/^4/);
    });
  });

  describe("json patch routes", () => {
    const route = "/api/jsonpatch";

    let json: JsonType;
    beforeEach(
      () => (json = { biscuits: [{ name: "Digestive" }, { name: "Coaster" }] })
    );

    let headers: object;
    before(
      () =>
        (headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        })
    );

    it(`request PATCH ${route} with no headers and body data; response fails with 4XX status.`, async () => {
      const { status } = await testServer.patch(route);

      expect(String(status)).to.match(/^4/);
    });

    it(`request PATCH ${route} with body data & no header; response fails with 4XX status.`, async () => {
      const patch: PatchType = {
        op: "add",
        path: "",
        value: { sweets: [] },
      };
      const { status } = await testServer.patch(route).send({ json, patch });

      expect(String(status)).to.match(/^4/);
    });

    it(`request PATCH ${route} with headers & partial body data; response fails with 4XX status.`, async () => {
      const patch: PatchType = {
        op: "add",
        path: "",
        value: { sweets: [] },
      };
      const { status } = await testServer
          .patch(route)
          .set(headers)
          .send({ json }),
        { status: _status } = await testServer
          .patch(route)
          .set(headers)
          .send({ patch });

      expect(String(status)).to.match(/^4/);
      expect(String(_status)).to.match(/^4/);
    });

    it(`request PATCH ${route} with headers & body data to 'add' with patch data; response ok with 2XX status & modified json data.`, async () => {
      const index = 1;
      const patch: PatchType = {
        op: "add",
        path: `/biscuits/${index}`,
        value: { name: "Wafers" },
      };
      const {
        body: { biscuits },
        status,
      } = await testServer.patch(route).set(headers).send({ json, patch });

      expect(String(status)).to.match(/^2/);
      expect(biscuits.length).to.be.equal(json.biscuits.length + 1);
      expect(biscuits[index]).to.be.deep.equal(patch.value);
    });

    it(`request PATCH ${route} with headers & body data to 'remove' with patch data; response ok with 2XX status & modified json data.`, async () => {
      const patch: PatchType = {
        op: "remove",
        path: "/biscuits/1",
      };
      const {
        body: { biscuits },
        status,
      } = await testServer.patch(route).set(headers).send({ json, patch });

      expect(String(status)).to.match(/^2/);
      expect(biscuits.length).to.be.equal(json.biscuits.length - 1);
    });

    it(`request PATCH ${route} with headers & body data to 'copy' with patch data; response ok with 2XX status & modified json data.`, async () => {
      const index = 1,
        to = 2;
      const patch: PatchType = {
        op: "copy",
        path: `/biscuits/${to}`,
        from: `/biscuits/${index}`,
      };
      const {
        body: { biscuits },
        status,
      } = await testServer.patch(route).set(headers).send({ json, patch });

      expect(String(status)).to.match(/^2/);
      expect(biscuits.length).to.be.equal(json.biscuits.length + 1);
      expect(biscuits[to]).to.be.deep.equal(json.biscuits[index]);
    });

    it(`request PATCH ${route} with headers & body data to 'move' with patch data; response ok with 2XX status & modified json data.`, async () => {
      const from = "/biscuits",
        to = "/box";
      const patch: PatchType = {
        op: "move",
        from,
        path: to,
      };
      const {
        body: { biscuits, box },
        status,
      } = await testServer.patch(route).set(headers).send({ json, patch });

      expect(String(status)).to.match(/^2/);
      expect(biscuits).to.be.equal(undefined);
      expect(box).to.be.deep.equal(json.biscuits);
    });

    it(`request PATCH ${route} with headers & body data to 'replace' with patch data; response ok with 2XX status & modified json data.`, async () => {
      const replacement: any[] = [];
      const patch: PatchType = {
        op: "replace",
        path: "/biscuits",
        value: replacement,
      };
      const {
        body: { biscuits },
        status,
      } = await testServer.patch(route).set(headers).send({ json, patch });

      expect(String(status)).to.match(/^2/);
      expect(biscuits).to.be.deep.equal(replacement);
    });

    it(`request PATCH ${route} with headers & body data to 'test' with patch data; response ok with 2XX status & un-modified json data.`, async () => {
      const index = 0;
      const patch: PatchType = {
        op: "test",
        path: `/biscuits/${index}`,
        value: json.biscuits[index],
      };
      const { status, body } = await testServer
        .patch(route)
        .set(headers)
        .send({ json, patch });

      expect(String(status)).match(/^2/);
      expect(body).to.be.deep.equal(json);
    });
  });

  describe("thumbnail routes", () => {
    const route = "/api/thumbnail",
      data = { src: "https://unsplash.com/s/photos/software-engineer" };

    let headers: object;
    before(
      () =>
        (headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        })
    );

    it(`request POST ${route} with no header and/or body data; response fails with 4XX status.`, async () => {
      // no header and body data
      const { status } = await testServer.post(route);
      // headers but no body data
      const { status: _status } = await testServer.post(route).set(headers);
      // no headers but body data
      const { status: __status } = await testServer.post(route).send(data);

      expect(String(status)).to.match(/^4/);
      expect(String(_status)).to.match(/^4/);
      expect(String(__status)).to.match(/^4/);
    });
  });
});
