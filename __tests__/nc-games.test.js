const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe('GET api/categories', () => {
    test("200: returns an array of category objects", () => {
        return request(app)
            .get("/api/categories").expect(200);
    });
    test("returns an array of categories with properties of slug and description", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then(( res ) => {
                expect(res.body.categories).toBeInstanceOf(Array);
                expect(res.body.categories).toHaveLength(4)
                res.body.categories.forEach((category) => {
                    expect(category).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)
                        })
                    )
                })
            });
    });
    // test("404: ")
})