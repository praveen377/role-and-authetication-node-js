const router = require("express").Router();

//bring to the user registration function
const { userRegister,userLogin } = require("../utils/auth");

//users registration route
router.post("/register-user" , async(req,res) => {
    await userRegister(req.body , "user" , res);
});

//admin registration route
router.post("/register-admin" , async(req,res) => {
    await userRegister(req.body , "admin" , res);
});

//super admin registration route
router.post("/register-super-admin" , async(req,res) => {
    await userRegister(req.body , "superadmin" , res);
});

//users login route
router.post("/login-user" , async(req,res) => {
    await userLogin(req.body,"user",res);
});

//admin login route
router.post("/login-admin" , async(req,res) => {
    await userLogin(req.body,"admin",res);
});

//super admin login route
router.post("/login-super-admin" , async(req,res) => {
    await userLogin(req.body,"superadmin",res);
});

//profile route
router.get("profile" , async(req,res)=> {})

//users protected  route
router.post("/user-protected" , async(req,res) => {});
//admin protected  route
router.post("/admin-protected" , async(req,res) => {});
//super admin Protected route
router.post("/super-admin-protected" , async(req,res) => {});

module.exports = router;