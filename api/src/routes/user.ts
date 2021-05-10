const userCtrl = require("../controllers/user");
const routerUser = require("express").Router();

routerUser.post("/login", userCtrl.login);
routerUser.post("/register", userCtrl.register);
//routerUser.get("/:id/:token", userCtrl.getUserById);
//routerUser.get("/:email", userCtrl.getUser);
//routerUser.get("/", userCtrl.getAllUsers);

module.exports = routerUser;
