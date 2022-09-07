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

describe('GET api/reviews/:review_id', () => {
    test("returns a review object with properties", () => {
        return request(app) 
        .get("/api/reviews/1")
            .expect(200)
            .then((res) => {
                console.log(res.body.review)
                expect(res.body.review).toEqual(
                    expect.objectContaining({
                        review_id: 1,
                        title: 'Agricola',
                        category: 'euro game',
                        designer: 'Uwe Rosenberg',
                        owner: 'mallionaire',
                        review_body: 'Farmyard fun!',
                        review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                        created_at: '2021-01-18T10:00:20.514Z',
                        votes: 1
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
    test("Returns an error if gien an invalid id", () => {
        return request(app)
            .get("/api/reviews/inValidId")
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('bad request - invalid id');
            });
    })
})
