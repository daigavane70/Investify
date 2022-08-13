const router = require("express").Router();
const auth = require("../middleware/auth");
const {Login , GetLoggedInUser , Register} = require("../controllers/user.controller")
require("dotenv").config()

router.post("/" ,  Register);
router.post("/login" , Login);
router.get("/auth" , auth , GetLoggedInUser);



module.exports = router