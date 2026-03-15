const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controller/profileController"); 

router.post("/register", userRegister);
router.post("/login", userLogin);


router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile); 

module.exports = router;