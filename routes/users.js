const router = require("express").Router();

const { json } = require("body-parser");
//bring to the user registration function
const { userRegister,userLogin,userAuth , serializeUser ,checkRole} = require("../utils/auth");

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
router.get("/profile" ,userAuth, async(req,res)=> {
    
    return res.json( serializeUser(req.user) )
});

//users protected  route
router.get("/user-protected" ,userAuth,checkRole(["user"]), async(req,res) => {
    return res.json("hello user");
});
//admin protected  route
router.get("/admin-protected" ,userAuth,checkRole(["admin"]), async(req,res) => {
    return res.json("hello admin");
});
//super admin Protected route
router.get("/super-admin-protected" ,userAuth,checkRole(["superadmin"]), async(req,res) => {
    return res.json("hello super admin");
});

module.exports = router;