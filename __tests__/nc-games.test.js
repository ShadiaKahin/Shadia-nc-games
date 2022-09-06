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
    test("returns an array of categories with properties of slug and description", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then((res) => {
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
})

describe.only('GET api/reviews/:review_id', () => {
    test("returns a review object with properties", () => {
        return request(app) 
        .get("/api/reviews/1")
            .expect(200)
            .then((res) => {
                    expect(res.body.review[0]).toEqual(
                        expect.objectContaining({
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            review_body: expect.any(String),
                            designer: expect.any(String),
                            review_img_url: expect.any(String),
                            votes: expect.any(Number),
                            category: expect.any(String),
                            owner: expect.any(String),
                            created_at: expect.any(String)
                        })
                    )
            });
    })
    test("Returns an error if the item does not exist", () => {
        return request(app)
            .get("/api/reviews/909090900900")
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('not found');
            });
    })
})
