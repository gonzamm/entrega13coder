const express = require("express");
const path = require("path");
const session = require('express-session');
const passport = require("passport");
const parseArgs = require('minimist');
const cluster = require('cluster');



const app = express();

//Minimist - Configuracion puerto y modo servidor
const optMinimist = {default: {PORT:8080, MODO:'FORK'}}
const args = parseArgs(process.argv.slice(2),optMinimist)
const PORT = args.PORT;
const MODO = args.MODO;

//Sesiones
app.use(session({
  cookie: { maxAge: 600000 },
  secret:"misecreto",
  resave:false,
  saveUninitialized:false,
  rolling:true
}))

//Midelware
app.use(express.static(__dirname + '/public'));
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


//Routes
const chatRoute = require("./src/routes/chat")
app.use("/api/chat", chatRoute);
const ptosTest = require("./src/routes/ptosTest")
app.use("/api/productos-test", ptosTest);
const login = require("./src/routes/login")
app.use("/api/login", login)
const logout = require("./src/routes/logout")
app.use("/api/logout", logout)
const register = require("./src/routes/register")
app.use("/api/register", register)
const infoRoute = require("./src/routes/info")
app.use("/info", infoRoute)
const randoms = require("./src/routes/randoms")
app.use("/api/randoms", randoms)

//Servidor HTTP
const http = require("http");
const server = http.createServer(app);

//Servidor de Socket
const { Server } = require("socket.io");
const { Code } = require("mongodb");
const io = new Server(server);

io.on("connection", (socket)=> {
  socket.emit("render", "")
  socket.on("actualizacion", ()=>{
    io.sockets.emit("render", "")
  })
})

//Modulo cluster
const numCPUs= require('os').cpus().length;

//Evaluacion de MODO(variable asiganada con el inicio del servidor, si es cluster se crea un unico proceso, sino crea multiples procesos)
if (MODO == 'CLUSTER'){
  //Comienzo de un UNICO servidor
  server.listen(PORT, () => {
    console.log(`Server is run on port ${server.address().port} in proces ${process.pid}`)
  })
  server.on('error', error => console.log(`Error en servidor ${error}`))
} else { 
  //Evaluacion para saber si es el proceso principal, si es asi crea workers
  if(cluster.isMaster){
    //Creo forks
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, Code, signal)=>{
      console.log(`worker ${worker.process.pid} finalizo`)
    })
  
  } else {
    //Comienzo Servidores Fork
    server.listen(PORT, () => {
      console.log(`Server is run on port ${server.address().port} in proces ${process.pid}`)
    })
    server.on('error', error => console.log(`Error en servidor ${error}`))
  }
}



