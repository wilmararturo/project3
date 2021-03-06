const router = require("express").Router();
const userController = require("../../controllers/userController");
// Requiring passport as we've configured it
const passport = require("../../utils/passport");

// Matches with "/api/user/login"
router
  .route("/login")
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  .post(passport.authenticate("local"), userController.login);

// Matches with "/api/user/signup"
router.route("/signup").post(userController.signup);

// Matches with "/api/user/logout"
router
  .route("/logout")
  // Route for logging user out
  .get(userController.logout);

// Matches with "/api/user/authenticate"
router
  .route("/authenticate")
  // Route for getting some data about our user to be used client side
  .post(userController.authenticate);

// App specific CRUD "/api/user/"
router.route("/:id").get(userController.findByName);
router.route("/group/:id").get(userController.findByGroupId);
router.route("/addgroup/:id").post(userController.addGroup);
router.route("/removegroup/:id").post(userController.removeGroup);

module.exports = router;
