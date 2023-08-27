const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  // console.log(users);
  res.render("directory", { title: "Directory of Pokemon", users });
};

const createUser = async (req, res) => {
    res.render('Create', {title: 'Create a User'})
};

const postCreateUser = async (req, res) => {
    let { firstName, lastName, email, username, password } = req.body;
    console.log(firstName, lastName, email, username, password);
    try {
      let hashPassword = await bcrypt.hash(password, saltRounds);
  
      console.log("original Password: ", password);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        username,
        password: hashPassword,
      });
      console.log("New user's auto-generated ID", newUser.id);
      res.send("User created");
      res.redirect("/login")
    } catch (error) {
      console.log(error);
    }
  };

const getUserByID = (req, res) => {
    // console.log(req.params);
    // const id = req.params.id;
  
    const { firstName, lastName, email, image, id} = req.user;
    console.log(firstName, lastName, email, image, id);
    // console.log(firstName, lastName, email);
  
    res.render('profile', {
      title: 'User Profile',
      firstName,
      lastName,
      email,
      image,
      id,
    });
  };

const editUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email } = await User.findByPk(id);
  console.log(firstName, lastName, email, id);
  res.render("edit", { title: "Edit User", id, firstName, lastName, email });
};

const userEdited = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email } = req.body;
  User.update({ firstName, lastName, email }, { where: { id: id } });
  res.send("post request edit user");
};

const userDeleted = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email } = req.body;
  await User.destroy({ where: { id: id } });
  res.send("User has been deleted!");
};

const userLogin = async (req, res) => {
  res.render("login", { title: "Login to our App" });
};

const userLoggedin = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  // find a single user in database using username
  const user = await User.findOne({ where: { username } });
  //= if user is null, show error, redirect to login
  if (user == null) {
    res.render("login", { title: "Login", error: "User not found" });
  } else {
    // compare plainttext password from form to hashed password from batabase
    // user.password is our hashed password
    console.log(password, user.password);
    const hashPassword = user.password;
    await bcrypt.compare(password, hashPassword, function (err, result) {
      console.log(result);

      if (result) {
        const token = jwt.sign({foo: 'bar'}, 'superSecretPrivateKey', {expiresIn: '1h'});
        console.log(token);
        res.cookie("token", token);
        res.redirect("/");
      } else res.render("login", {
          title: "login",
          error: "Passwords do not match",});
      });
    }
};

module.exports = {
  getAllUsers,
  createUser,
  postCreateUser,
  getUserByID,
  editUser,
  userEdited,
  userDeleted,
  userLogin,
  userLoggedin
};
