let express = require("express");
let router = express.Router();
const { User } = require("../models");
const userController = require("../controllers/users");
// const { where } = require("sequelize");
const findUser = require("../middleware/findUser");
const bcrypt = require("bcrypt");
const { use } = require(".");
const authCheck = require("../middleware/authCheck");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
// const myPlaintextPassword = 'hashComplex34';

// router.get('/', userController.getAllUsers);

/* GET users listing. */
// router.get('/', userController.getAllUsers);
// get create hard coded user

router.get('/', authCheck, userController.getAllUsers);

// router.get("/directory", async (req, res) => {
//   const id = req.params.id;
//   const { firstName, lastName, email } = await User.findByPk(id);
//   console.log(firstName, lastName, email);
//   res.render("directory", {
//     title: "Directory",
//     id,
//     firstName,
//     lastName,
//     email,
//   });
// });

router.get('/create', userController.createUser);

// router.get("/create", userController.createUser);

router.post('/create', userController.postCreateUser);

// get user by id

router.get('/profile/:id', findUser, userController.getUserByID);


router.get('/edit/:id', userController.editUser);

// put or patch edit a user

router.post('/edit/:id', userController.userEdited);

// delete user by id

router.get('/delete/:id', userController.userDeleted);

// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

{
  /* <a href="/users/edit/<%= id %>">Edit</a>
const host = req.get('host');
You would put this in the router.get for the profile */
}

// await jane.destroy();

// Find the entry using pk or whatever
// Then on that use the destroy method

// Const Jane = User.findByPk(1);
// Jane.destroy()
// wait Post.destroy({
//   where: {
//     id: 1
//   }
// });
// UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = 1

// To hash a password:
// Technique 1 (generate a salt and hash on separate function calls):

router.get("/login", userController.userLogin);

router.post("/login", userController.userLoggedin);
// Load hash from your password DB.

module.exports = router;
