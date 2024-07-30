const express = require("express");
const router = express.Router();
const userController = require("../controller/userCtrl");

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);
router.use(userController.protect);
router.route("/logout").get(userController.logout);
router.post("/updateMe", userController.updateMe);

router.use(userController.restrictTo("Admin"));
router
  .route("/")
  .post(userController.registerUser)
router.route("/")
  .get(userController.fetchUser);

router
  .route("/:id")
  .get(userController.fetchUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
