const jwt = require("jsonwebtoken");

function validateUser(req, res, next) {
  const token = req.cookies["token"] ||
                req.body.token ||
                req.query.token ||
                req.headers['x-access-token'];

  console.log("welcome " + req.cookies["token"]);

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  }
  else {
    jwt.verify(token, "mysupersecretjwt", function(err, decoded) {
        if (err) {
            console.log("aaa1");
            console.log(token); 
            console.log(err); 
            res.status(401).send({ status: 401, message: "Unauthorized: Verification failed", data: null });
        } else {
            console.log(`User with id ${decoded.id} passed validation`);
            next();
        }
    });
  }
}

module.exports = {
    validateUser
}