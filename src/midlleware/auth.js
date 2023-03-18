const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json("Unauthorized");
  }
  const secretKey = process.env.JWT_SECRET;
  console.log({ secretKey });
  const token = req.headers.authorization.split(" ")[1];
  // console.log("token on middleware", token);

  try {
    const credential = jwt.verify(token, secretKey);
    // console.log("CREDENTIAL", credential);

    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
    return res.status(400).json("token invalid");
  } catch (error) {
    return res.send(error);
  }
};
