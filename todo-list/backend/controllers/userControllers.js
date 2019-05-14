const userService = require("../services/userService");

async function create(user) {
  let answer = await userService.create(user);
  console.log(answer.message);
  console.log(answer.error);
  return answer;
}

async function authenticate(userData) {
  let answer = await userService.authenticate(userData);
  return answer;
}

function logout(req, res) {
  res.clearCookie("x-access-token");
  res.clearCookie("token");
  res.status(204).send();
}

function validateUsername(req, res) {
    userService.validateUsername(req, res);
  }
  

module.exports = {
  create,
  authenticate,
  logout,
  validateUsername
};