const db = require("../models/index");
const Login = db.login;

// Create and Save a new Login
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.userName || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Login
  const login = new Login({
    user_name: req.body.userName,
    password: req.body.password,
  });

  // Save Login in the database
  login
    .save(login)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LOGIN."
      });
    });
};

// Retrieve all LOGINs from the database.
exports.findAll = (req, res) => {
  const user_name = req.query.user_name;
  console.log(user_name);
  var condition = user_name ? { user_name: { $regex: new RegExp(user_name), $options: "i" } } : {};
  console.log(condition);
  Login.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving logins."
      });
    });
};

// Find a single Login with an id
exports.findOne = (req, res) => {
  const id = req.params.userName;

  Login.find(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Login with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Login with id=" + id });
    });
};

// Update a Login by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Login.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Login with id=${id}. Maybe Login was not found!`
        });
      } else res.send({ message: "Login was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Login with id=" + id
      });
    });
};

// Delete a Login with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Login.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Login with id=${id}. Maybe Login was not found!`
        });
      } else {
        res.send({
          message: "Login was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Login with id=" + id
      });
    });
};

// Delete all Logins from the database.
exports.deleteAll = (req, res) => {
  Login.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Logins were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Logins."
      });
    });
};

