const db = require("../helpers/dbHelper");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function create(user) {
  let answer = { error: null, message: null };
  let newUser = new User(user);
  try {
    let result = await newUser.save();
    console.log(result);
    answer.message = "User added successfully!";
    answer.error = null;
  }
  catch(err) {
    answer.error = err;
    answer.message = "Something went wrong :(";
  }
  return answer;
}

async function authenticate(userData) {

  let answer = { error: null, message: null };
  const user = await User.findOne({ username: userData.username }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        
        if (bcrypt.compareSync(userData.password, userInfo.password)) {

          answer.message = "User logged in!";
        
        } else {

          answer.error = "Wrong password!";
          
        }
      }
    });

    return answer;
  }
  
  function validateUsername(req, res) {
    User.findOne({ username: req.body.username }, function(err, userInfo) {
      if (err) {
        console.log(err);
      } else {
        if (!userInfo) {
          res.status(200).send({});
          return;
        }
  
        res.status(409).send({
          status: "error",
          message: "is already in use",
          data: null
        });
      }
    });
  }

module.exports = {
  create,
  authenticate,
  validateUsername
};