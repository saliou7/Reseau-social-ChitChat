const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp); // register
router.post("/login", authController.signIn); // login
router.get("/logout", authController.logout);  // logout

// user DB
router.get("/", userController.getAllUsers); // get all users
router.get("/:id", userController.userInfo); // get user info
router.put("/:id", userController.updateUser); // update user info
router.delete("/:id", userController.deleteUser); // delete user
router.patch("/follow/:id", userController.follow); // follow a user
router.patch("/unfollow/:id", userController.unfollow); // unfollow a user

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil); // upload profil picture

module.exports = router; // export router
