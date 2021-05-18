const userCtrl = require("../controllers/user");
const routerUser = require("express").Router();
const auth = require("../middleware/auth");

routerUser.post("/login", userCtrl.login);
routerUser.post("/register", userCtrl.register);
routerUser.get("/:id", auth, userCtrl.getUserById);

module.exports = routerUser;
