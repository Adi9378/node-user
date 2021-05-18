const jwt = require("jsonwebtoken");

module.exports = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    const userId = parseInt(decodedToken.userId, 10);
    const paramId = parseInt(req.params.id, 10);

    if (paramId !== userId) {
      throw "Invalid user ID";
    } else {
      console.log("sapass");
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
