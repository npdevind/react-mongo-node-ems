const utils = require("../utils");
const authModal = require("../features/auth/model/authModal");
const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  // getting the bear token header
  const authHeader = req.headers["authorization"];
  // getting the actual token
  const token = (authHeader && authHeader.split(" ")[1]) || "";
  // check the token is present or not
  if (token === null) return res.status(401).json({ message: "Token not found" });
  jwt.verify(token, utils.JWT_TOKEN_SECRET, async (err, data) => {
    if (err) return res.status(403).json({ message: "Unauthenticated" });
    // find the user and check the user is exist or not
    try {
      const user = await authModal.getUser({ username: data.username });
      if (user) {
        req.user = {
          id: user.id,
          username: user.username,
        };
        return next();
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = jwtMiddleware;
