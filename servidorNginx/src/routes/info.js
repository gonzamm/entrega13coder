const express = require("express");

const app = express();
const { Router } = express;
const router = new Router();

//GET INFO
router.get("/", (req, res) => {
    const args  = process.argv.slice(2)
    const infoProceso = {
        Arguemntos: args,
        NombrePlataforma: process.platform,
        VersionNode: process.version,
        MemoriaTotalReservada: process.memoryUsage().rss,
        PathEjecucion: process.argv[0],
        ProccesID: process.pid,
        CarpetaProyecto: process.cwd()
    }
    res.send(infoProceso)
});

//EXPORT MODULO ROUTER
module.exports = router;
