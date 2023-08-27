const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  let token = req.cookies.token;

  console.log("Auth check middleware has fired", token);
  // now that token has been made it needs to be verified. verify jwt
  // if jwt is valid then next()
  // if jwt is not valid then show error
  let decoded = null;
  try {
    decoded = jwt.verify(token, 'superSecretPrivateKey'); 
    console.log("decoded JWT:", decoded);
  } catch (error) {
    console.log(error);
  }
  if (decoded) {
    next();
  } else {
    res.render('directory', {
    title: 'Pokemon Directory',
    error: 'You must be logged in to view this page',
});
  }
};

module.exports = authCheck;
