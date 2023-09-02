const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
 
  if (!token) {
    return res.status(401).json({ message: "Token not present" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId=decoded.userId;
    req.body.email=decoded.email;
    req.body.adminDiscount=decoded.adminDiscount;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
