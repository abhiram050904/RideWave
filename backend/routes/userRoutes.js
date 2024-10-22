// routes/userRoutes.js
const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controller/usercontroller");

const router = require("express").Router();

// Adjusted routes
router.post("/login", login);
router.post("/register", register);
router.get("/auth/allusers/:id", getAllUsers);
router.post("/auth/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
