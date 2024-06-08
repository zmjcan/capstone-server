const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");

router
  .route("/users")
  .get(userController.getAllUsers)
//   .get(authController.loginUser);

router
.route("/users/register")
.post(authController.postUser);

router
.route("/users/login")
.post(authController.loginUser)

router
.route("/users/:userId")
.patch(authController.updateUser);


module.exports = router;
