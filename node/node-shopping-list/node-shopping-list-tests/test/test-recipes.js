const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

// this lets us use *expect* style syntax in our tests
// so we can do things like `expect(1 + 1).to.equal(2);`
// http://chaijs.com/api/bdd/
const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);


describe("Recipes", function() {
  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the that promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer();
  });

  // although we only have one test module at the moment, we'll
  // close our server at the end of these tests. Otherwise,
  // if we add another test module that also has a `before` block
  // that starts our server, it will cause an error because the
  // server would still be running from the previous tests.
  after(function() {
    return closeServer();
  });

  // test strategy:
  //   1. make request to `/recipes`
  //   2. inspect response object and prove has right code and have
  //   right keys in response object.
  it("should list recipes on GET", function() {
    // for Mocha tests, when we're dealing with asynchronous operations,
    // we must either return a Promise object or else call a `done` callback
    // at the end of the test. The `chai.request(server).get...` call is asynchronous
    // and returns a Promise, so we just return it.
    return chai
      .request(app)
      .get("/recipes")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");

        // because we create two recipes on app load
        expect(res.body.length).to.be.at.least(1);
        // each recipe should be an object with key/value pairs
        // for `id`, `name` and `ingredients`.
        const expectedKeys = ["id", "name", "ingredients"];
        res.body.forEach(function(recipe) {
          expect(recipe).to.be.a("object");
          expect(recipe).to.include.keys(expectedKeys);
        });
      });
  });

  // test strategy:
  //  1. make a POST request with data for a new recipe
  //  2. inspect response object and prove it has right
  //  status code and that the returned object has an `id`
  it("should add a recipe on POST", function() {
    const newRecipe = { name: 'frappe', ingredients: ['ice', 'coffee', 'blender', 'caramel', 'milk'] };
    return chai
      .request(app)
      .post("/recipes")
      .send(newRecipe)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys("id", "name", "ingredients");
        expect(res.body.id).to.not.equal(null);
        // response should be deep equal to `newRecipe` from above if we assign
        // `id` to it from `res.body.id`
        expect(res.body).to.deep.equal(
          Object.assign(newRecipe, { id: res.body.id })
        );
      });
  });

  // test strategy:
  //  1. initialize some update data (we won't have an `id` yet)
  //  2. make a GET request so we can get a recipe to update
  //  3. add the `id` to `updateData`
  //  4. Make a PUT request with `updateData`
  //  5. Inspect the response object to ensure it
  //  has right status code and that we get back an updated
  //  recipe with the right data in it.
  it("should update recipes on PUT", function() {
    // we initialize our updateData here and then after the initial
    // request to the app, we update it with an `id` property so
    // we can make a second, PUT call to the app.
    const updateData = {
      name: "frappuccino",
      ingredients: ['ice', 'coffee', 'blender', 'caramel', 'cream']
    };

    return (
      chai
        .request(app)
        // first have to get so we have an idea of object to update
        .get("/recipes")
        .then(function(res) {
          updateData.id = res.body[0].id;
          // this will return a promise whose value will be the response
          // object, which we can inspect in the next `then` block. Note
          // that we could have used a nested callback here instead of
          // returning a promise and chaining with `then`, but we find
          // this approach cleaner and easier to read and reason about.
          return chai
            .request(app)
            .put(`/recipes/${updateData.id}`)
            .send(updateData);
        })
        // prove that the PUT request has right status code
        // and returns updated recipe
        .then(function(res) {
          expect(res).to.have.status(204);
          expect(res.body).to.be.a("object");
          expect(res.body).to.deep.equal({});
        })
    );
  });

  // test strategy:
  //  1. GET recipes so we can get ID of one to delete
  //  2. DELETE an item and ensure we get back a status 204
  it("should delete recipes on DELETE", function() {
    return (
      chai
        .request(app)
        // first have to get so we have an `id` of recipe
        // to delete
        .get("/recipes")
        .then(function(res) {
          return chai.request(app).delete(`/recipes/${res.body[0].id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
        })
    );
  });
});