const express = require('express');
const { registerController, 
  loginController, 
  forgotPasswordController,
   testController } = require('../controllers/authController.js');
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware.js');


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



module.exports=router;