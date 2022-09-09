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

describe('PATCH /api/reviews/:review_id', () => {
    test('returns the updated review which has incremented vote', () => {
        const review_id = 2;
        const incVote = { inc_votes: 10 }

        return request(app)
            .patch(`/api/reviews/${review_id}`)
            .send(incVote)
            .expect(200)
            .then((res) => {
                expect(res.body.review).toHaveProperty("votes", 15);
                expect(res.body.review).toHaveProperty("review_id", 2)
            })
    })

test('400: the sent object is empty', () => {
    const inputObj = {}

    return request(app)
        .patch(`/api/reviews/2`)
        .send(inputObj)
        .expect(400).then((res) => {
            expect(res.body.message).toBe('bad request')
        })
})
})

test('404: review id not found', () => {
    const incVote = { inc_votes: 10 }

    return request(app)
        .patch(`/api/reviews/345345345`)
        .send(incVote)
        .expect(404).then((res) => {
            expect(res.body.message).toBe('not found')
        })
})


test('400: id not an integer', () => {
    
    const incVote = { inc_votes: 10 }
    const review_id = "two";

    return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(incVote)
        .expect(400).then((res) => {
            expect(res.body.message).toBe('bad request')
        })
})


test('400: inc_votes not an integer', () => {
    
    const incVote = { inc_votes: "ten" }
    const review_id = 2;

    return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(incVote)
        .expect(400).then((res) => {
            expect(res.body.message).toBe('bad request')
        })
})



// string UpdateCmd = "update dx set chronic = @p1 where (trim(lower(cdesc)), trim(cicd9)) = (@p2);";





// return db.query(`INSERT INTO treasures (treasure_name,
//     colour, age, cost_at_auction, shop_id
//     ) VALUES ($1, $2, $3, $4, $5);`,
//     [newTreasure.treasure_name, newTreasure.colour, newTreasure.age, newTreasure.cost_at_auction, newTreasure.shop_id])
//     .then(() => {
//         return db.query(`SELECT * FROM treasures WHERE treasure_name = 'crown';`)
//     })
//     .catch((err) => {
//        return Promise.reject({status: 400, msg: 'invalid treasure object'});
// })