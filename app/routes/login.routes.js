module.exports = app => {
  const login = require("../controllers/login.controller");

  var router = require("express").Router();

  // Create a new Login
  router.post("/", login.create);

  // Retrieve all login
  router.get("/", login.findAll);

  // Retrieve a single Login with id
  router.get("/:id", login.findOne);

  // Update a Login with id
  router.put("/:id", login.update);

  // Delete a Login with id
  router.delete("/:id", login.delete);

  // Delete all login
  router.delete("/", login.deleteAll);

  app.use('/api/login', router);
};