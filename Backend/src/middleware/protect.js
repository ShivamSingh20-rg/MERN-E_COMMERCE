const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.userId;

      next(); 
    }catch (error) {
  console.error("🔥 AUTH MIDDLEWARE ERROR:", error.message); // 💻 Now you will see it!
  return res.status(500).json({ message: "Invalid token structure", error: error.message });
}
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = protect;