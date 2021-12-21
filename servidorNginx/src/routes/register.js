const express = require("express");

const app = express();
const { Router } = express;
const router = new Router();
const passportConfig = require("../passport/passportConfig")

//GET REGISTER
router.get("/", async (req, res) => {
/*     if (req.session.user){
      res.send({user: req.session.user})
    }else{
      res.send(false);
    } */
});

//POST REGISTER LOCALSIGNUP
router.post("/", passportConfig.authenticate("local-signup",{
  successRedirect:"/login.html",
  failureRedirect:"/registerError.html"
}))

//EXPORT MODULO ROUTER
module.exports = router;
