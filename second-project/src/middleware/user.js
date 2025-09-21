
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "Access denied" });

  try {
    const decoded = jwt.verify(token, "87878787");
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports  =  {
    auth
}