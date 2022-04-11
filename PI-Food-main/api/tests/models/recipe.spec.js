const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({ title: null })
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Recipe.create({ title: "Milanesa a la napolitana" });
      });
    });
    describe("summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({ summary: null })
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should work when its a valid summary", () => {
        Recipe.create({
          summary:
            "Una milanesa recubierta con salsa de tomate y queso mozzarella.",
        });
      });
    });
    describe("spoonacularScore", () => {
      it("should throw an error if spoonacularScore is null", (done) => {
        Recipe.create({ spoonacularScore: null })
          .then(() => done(new Error("It requires a valid score")))
          .catch(() => done());
      });
      it("should work when its a valid score", () => {
        Recipe.create({ spoonacularScore: 95 });
      });
    });
    describe("healthScore", () => {
      it("should throw an error if healthScore is null", (done) => {
        Recipe.create({ healthScore: null })
          .then(() => done(new Error("It requires a valid health score")))
          .catch(() => done());
      });
      it("should work when its a valid health score", () => {
        Recipe.create({ healthScore: 75 });
      });
    });
    describe("steps", () => {
      it("should throw an error if steps is null", (done) => {
        Recipe.create({ steps: null })
          .then(() => done(new Error("It requires valid step")))
          .catch(() => done());
      });
      it("should work when its a valid step", () => {
        Recipe.create({ steps: [{ number: 1, step: "Preparar la carne." }] });
      });
    });
    describe("image (optional)", () => {
      // it("should throw an error if steps is null", (done) => {
      //   Recipe.create({ steps: null })
      //     .then(() => done(new Error("It requires valid step")))
      //     .catch(() => done());
      // });
      it("should work when image is null", () => {
        Recipe.create({ image: null });
      });
    });
  });
});
