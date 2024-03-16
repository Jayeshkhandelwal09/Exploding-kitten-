const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    console.log("no authorization header");
    return res.status(401).json({ error: "Authorization token not present" });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.currUserId = id;
    console.log("curr user is - ", req.currUserId);
    next();
  } catch (err) {
    res.status(401).json({ error: "Token not verified" });
  }
};

module.exports = { checkAuth };
