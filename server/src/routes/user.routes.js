const router = require("express").Router();
const authController = require("../entities/auth.controller");
const userController = require("../entities/user.controller");
const uploadController = require('../entities/upload.controller');
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp); // register
router.post("/login", authController.signIn); // login
router.get("/logout", authController.logout);  // logout

// user DB
router.get("/", userController.getAllUsers); // get all users
router.get("/:id", userController.getUser); // get user info
router.delete("/:id", userController.deleteUser); // delete user
router.patch("/follow/:id", userController.follow); // follow a user
router.patch("/unfollow/:id", userController.unfollow); // unfollow a user

// upload
router.post("/upload", uploadController.uploadProfil); // upload profil picture
router.post("/cover", uploadController.uploadCover);
module.exports = router; // export router
