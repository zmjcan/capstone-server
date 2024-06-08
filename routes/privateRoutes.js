const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");

router
  .route("/users")
  // .get(userController.getAllUsers)
  .get(authController.loginUser);

router.route("/users/register").post(authController.postUser);

router.route("/users/:userId").get(userController.getOneUser);

module.exports = router;
