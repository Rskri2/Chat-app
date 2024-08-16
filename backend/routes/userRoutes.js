const express = require("express");
const router = express.Router();
const userController = require("../controller/userCtrl");

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);
router.use(userController.protect);
router.get("/", userController.fetchUser)
router.get("/me", userController.myAccount)
router.post("/updateMe", userController.updateMe);

router
  .route("/:id")
  .get(userController.fetchUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
