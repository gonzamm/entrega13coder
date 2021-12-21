const express = require("express");
const {fork} = require("child_process")

const app = express();
const { Router } = express;
const router = new Router();

//GET RANDOM
router.get("/", (req, res) => {
    let cant = 100000000
    if (req.query.cant){cant = req.query.cant};

    let calc = fork("./src/calculoFork/calculo.js")
    calc.send(cant)
    calc.on("message", (objRepeat)=>{
        res.send({objRepeat})
    })
});

//EXPORT MODULO ROUTER
module.exports = router;
