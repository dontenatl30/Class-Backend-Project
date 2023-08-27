// const { User } = ('../models');
// console.log(User)
// const findUser = async (req, res, next) => {
// console.log("find single user by pk in db");
// const id = req.params.id;
// console.log(id);
// req.user = await User.findByPk(id);
// // console.log(req.user);
// next();
// };



// module.exports = findUser;

const { User } = require('../models');

const findUser = async (req, res, next) => {
  console.log('Find single user by pk in database');
  const id = req.params.id;
  req.user = await User.findByPk(id);
  // console.log(req.user);
  next();
};

module.exports = findUser;


