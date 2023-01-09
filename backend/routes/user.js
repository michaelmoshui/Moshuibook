const express = require("express");
const {
  register,
  activate,
  login,
  sendVerification,
  findUser,
  resetPasswordCode,
  verifyCode,
  changePassword,
} = require("../controllers/user");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activate);
router.post("/login", login);
router.post("/sendVerification", authUser, sendVerification);
router.post("/findUser", findUser);
router.post("/resetPasswordCode", resetPasswordCode);
router.post("/verifyCode", verifyCode);
router.post("/changePassword", changePassword);

module.exports = router;
