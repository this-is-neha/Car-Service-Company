const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    console.log("user Id ",req.userId)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = authMiddleware;
