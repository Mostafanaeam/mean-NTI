const jwt = require("jsonwebtoken");
const Util = require("util");

exports.auth = async function (req, res, next) {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization) {
    return res.status(404).json({ message: "you must login first" });
  }
  try {
    let decoded = await Util.promisify(jwt.verify)(
      authorization,
      process.env.SECRET
    );
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.statues(401).json({ message: "you are not authenticated,try again" });
  }
};
///////////////////////////////////////////////////////////////////////////////////
exports.restictTo = function (...role) {
  return function (req, res, next) {
    if (!role.includes(req.role)) {
      return res
        .statues(403)
        .json({ message: "you are not allowed to do this action" });
    }
    next();
  };
};
