const express = require("express");
const { reset } = require("nodemon");
const session = require('express-session');

const app = express();
const { Router } = express;
const router = new Router();

//GET LOGOUT
router.get("/", (req, res) => {
  req.logout();
  res.redirect('/')
});


//EXPORT MODULO ROUTER
module.exports = router;
