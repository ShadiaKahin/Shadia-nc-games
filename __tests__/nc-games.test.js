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

describe('GET api/reviews', () => {

  test("returns an array of reviews object with all properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toEqual([
          {
            review_id: 1,
            title: 'Agricola',
            category: 'euro game',
            designer: 'Uwe Rosenberg',
            owner: 'mallionaire',
            review_body: 'Farmyard fun!',
            review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            created_at: '2021-01-18T10:00:20.514Z',
            votes: 1,
            comment_count: '0'
          },
          {
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
          },
          {
            review_id: 3,
            title: 'Ultimate Werewolf',
            category: 'social deduction',
            designer: 'Akihisa Okui',
            owner: 'bainesface',
            review_body: "We couldn't find the werewolf!",
            review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 5,
            comment_count: '3'
          },
          {
            review_id: 4,
            title: 'Dolor reprehenderit',
            category: 'social deduction',
            designer: 'Gamey McGameface',
            owner: 'mallionaire',
            review_body: 'Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod',
            review_img_url: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            created_at: '2021-01-22T11:35:50.936Z',
            votes: 7,
            comment_count: '0'
          },
          {
            review_id: 5,
            title: 'Proident tempor et.',
            category: 'social deduction',
            designer: 'Seymour Buttz',
            owner: 'mallionaire',
            review_body: 'Labore occaecat sunt qui commodo anim anim aliqua adipisicing aliquip fugiat. Ad in ipsum incididunt esse amet deserunt aliqua exercitation occaecat nostrud irure labore ipsum. Culpa tempor non voluptate reprehenderit deserunt pariatur cupidatat aliqua adipisicing. Nostrud labore dolor fugiat sint consequat excepteur dolore irure eu. Anim ex adipisicing magna deserunt enim fugiat do nulla officia sint. Ex tempor ut aliquip exercitation eiusmod. Excepteur deserunt officia voluptate sunt aliqua esse deserunt velit. In id non proident veniam ipsum id in consequat duis ipsum et incididunt. Qui cupidatat ea deserunt magna proident nisi nulla eiusmod aliquip magna deserunt fugiat fugiat incididunt. Laboris nisi velit mollit ullamco deserunt eiusmod deserunt ea dolore veniam.',
            review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            created_at: '2021-01-07T09:06:08.077Z',
            votes: 5,
            comment_count: '0'
          },
          {
            review_id: 6,
            title: 'Occaecat consequat officia in quis commodo.',
            category: 'social deduction',
            designer: 'Ollie Tabooger',
            owner: 'mallionaire',
            review_body: 'Fugiat fugiat enim officia laborum quis. Aliquip laboris non nulla nostrud magna exercitation in ullamco aute laborum cillum nisi sint. Culpa excepteur aute cillum minim magna fugiat culpa adipisicing eiusmod laborum ipsum fugiat quis. Mollit consectetur amet sunt ex amet tempor magna consequat dolore cillum adipisicing. Proident est sunt amet ipsum magna proident fugiat deserunt mollit officia magna ea pariatur. Ullamco proident in nostrud pariatur. Minim consequat pariatur id pariatur adipisicing.',
            review_img_url: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            created_at: '2020-09-13T14:19:28.077Z',
            votes: 8,
            comment_count: '0'
          },
          {
            review_id: 7,
            title: 'Mollit elit qui incididunt veniam occaecat cupidatat',
            category: 'social deduction',
            designer: 'Avery Wunzboogerz',
            owner: 'mallionaire',
            review_body: 'Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.',
            review_img_url: 'https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            created_at: '2021-01-25T11:16:54.963Z',
            votes: 9,
            comment_count: '0'
          },
          {
            review_id: 8,
            title: 'One Night Ultimate Werewolf',
            category: 'social deduction',
            designer: 'Akihisa Okui',
            owner: 'mallionaire',
            review_body: "We couldn't find the werewolf!",
            review_img_url: 'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 5,
            comment_count: '0'
          },
          {
            review_id: 9,
            title: 'A truly Quacking Game; Quacks of Quedlinburg',
            category: 'social deduction',
            designer: 'Wolfgang Warsch',
            owner: 'mallionaire',
            review_body: "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
            review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 10,
            comment_count: '0'
          },
          {
            review_id: 10,
            title: 'Build you own tour de Yorkshire',
            category: 'social deduction',
            designer: 'Asger Harding Granerud',
            owner: 'mallionaire',
            review_body: 'Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ',
            review_img_url: 'https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 10,
            comment_count: '0'
          },
          {
            review_id: 11,
            title: "That's just what an evil person would say!",
            category: 'social deduction',
            designer: 'Fiona Lohoar',
            owner: 'mallionaire',
            review_body: "If you've ever wanted to accuse your siblings, cousins or friends of being part of a plot to murder everyone whilst secretly choosing which one of them should get the chop next - this is the boardgame for you. Buyer beware: once you gain a reputation for being able to lie with a stone face about being the secret killer you may never lose it.",
            review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            created_at: '2021-01-18T10:01:41.251Z',
            votes: 8,
            comment_count: '0'
          },
          {
            review_id: 12,
            title: "Scythe; you're gonna need a bigger table!",
            category: 'social deduction',
            designer: 'Jamey Stegmaier',
            owner: 'mallionaire',
            review_body: 'Spend 30 minutes just setting up all of the boards (!) meeple and decks, just to forget how to play. Scythe can be a lengthy game but really packs a punch if you put the time in. With beautiful artwork, countless scenarios and clever game mechanics, this board game is a must for any board game fanatic; just make sure you explain ALL the rules before you start playing with first timers or you may find they bring it up again and again.',
            review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            created_at: '2021-01-22T10:37:04.839Z',
            votes: 100,
            comment_count: '0'
          },
          {
            review_id: 13,
            title: "Settlers of Catan: Don't Settle For Less",
            category: 'social deduction',
            designer: 'Klaus Teuber',
            owner: 'mallionaire',
            review_body: 'You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.',
            review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            created_at: '1970-01-10T02:08:38.400Z',
            votes: 16,
            comment_count: '0'
          }
        ])
      })
  })
    
    test("returns a review object with properties when review_id is passed", () => {
        return request(app) 
        .get("/api/reviews/?review_id=2")
            .expect(200)
            .then((res) => {
                expect(res.body.reviews).toEqual([
                  {
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
                    }
                ])
            });
    })
  
    test("returns a review object with properties when category is passed", () => {
      return request(app) 
      .get("/api/reviews/?category='dexterity'")
          .expect(200)
          .then((res) => {
              expect(res.body.reviews).toEqual([
                {
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
                  }
              ])
          });
  })
  
    test("Returns an error if the item does not exist", () => {
        return request(app)
            .get("/api/reviews/?review_id=909090900900")
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('not found');
            });
    })

    // test("Returns an error if given an invalid id", () => {
    //     return request(app)
    //         .get("/api/reviews/?review_id=inValidId")
    //         .expect(400)
    //         .then((res) => {
    //             expect(res.body.message).toBe('bad request - invalid id');
    //         });
    // })
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

    test("returns an error if the item doesn't have any comments", () => {
        return request(app)
            .get("/api/reviews/1/comments")
            .expect(404)
            .then((res) => {
              expect(res.body.message).toBe('not found');
            })
    });

    test("returns an error if the review id doesn't exist", () => {
        return request(app)
            .get("/api/reviews/10923740235/comments")
            .expect(404)
            .then((res) => {
              expect(res.body.message).toBe('not found');
            })
    });

})

