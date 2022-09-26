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
        .get("/api/reviews/2")
            .expect(200)
            .then((res) => {
                expect(res.body.review).toEqual(
                    expect.objectContaining({
                        review_id: 2,
                        title: 'Jenga',
                        category: 'dexterity',
                        designer: 'Leslie Scott',
                        owner: 'philippaclaire9',
                        review_body: 'Fiddly fun for all the family',
                        review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                        created_at: '2021-01-18T10:01:41.251Z',
                        votes: 5,
                        comment_count: '3'
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
    test("Returns an error if given an invalid id", () => {
        return request(app)
            .get("/api/reviews/inValidId")
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('bad request - invalid id');
            });
    })
})

describe('GET /api/users', () => {
    test('returns an array of objects with the properties of username, name and avatar_url', () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then((res) => {
                expect(res.body.users).toBeInstanceOf(Array);
                expect(res.body.users).toHaveLength(4)
                res.body.users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String)
                        })
                    )
                })
            });
    })
})

describe('GET /api/reviews/:review_id/comments', () => {
    test('returns an array of comments associated with a review', () => {
        return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeInstanceOf(Array);
              expect(res.body.comments).toHaveLength(3)
              expect(res.body.comments).toEqual([
                  {
                    comment_id: 1,
                    body: 'I loved this game too!',
                    review_id: 2,
                    author: 'bainesface',
                    votes: 16,
                    created_at: '2017-11-22T12:43:33.389Z'
                  },
                  {
                    comment_id: 4,
                    body: 'EPIC board game!',
                    review_id: 2,
                    author: 'bainesface',
                    votes: 16,
                    created_at: '2017-11-22T12:36:03.389Z'
                  },
                  {
                    comment_id: 5,
                    body: 'Now this is a story all about how, board games turned my life upside down',
                    review_id: 2,
                    author: 'mallionaire',
                    votes: 13,
                    created_at: '2021-01-18T10:24:05.410Z'
                  }
               ])
            })
    });
})

describe('POST /api/reviews/:review_id/comment', () => {
    test.only('creates a new comment and returns it', () => {
        return request(app)
            .post("/api/reviews/2/comment")
            .send({
                author: "Shadrack and the Mandem",
                body: 'Best on the block!'
              })
            .expect(201)
            .then((res) => {
                console.log('testttt', res)
                expect(typeof res.body).toBe('object');
                // expect(res.body.users).toHaveLength(4)
                // res.body.users.forEach((user) => {
                //     expect(user).toEqual(
                //         expect.objectContaining({
                //             username: expect.any(String),
                //             name: expect.any(String),
                //             avatar_url: expect.any(String)
                //         })
                //     )
                // })
            });
    })
})