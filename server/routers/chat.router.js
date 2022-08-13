const  express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const {testRoute} = require("../controllers/chat.controller")

router.get("/auth" , auth , testRoute)
module.exports  = router